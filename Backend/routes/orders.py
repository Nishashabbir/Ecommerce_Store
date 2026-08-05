from flask import Blueprint, request, jsonify
from bson.objectid import ObjectId
from pymongo import ReturnDocument
from database import db
from middleware.auth import admin_required
from datetime import datetime

orders_bp = Blueprint("orders", __name__)

ORDER_STATUSES = ["pending", "processing", "shipped", "delivered", "cancelled"]
SHIPPING_THRESHOLD = 100
SHIPPING_FEE = 10
TAX_RATE = 0.1


def generate_order_number():
    seq = db.counters.find_one_and_update(
        {"_id": "orderNumber"},
        {"$inc": {"value": 1}},
        upsert=True,
        return_document=ReturnDocument.AFTER,
    )
    return f"LOOP-{1000 + seq['value']}"


def find_or_create_customer(customer_data, shipping_address):
    now = datetime.utcnow().isoformat() + "Z"
    email = customer_data.get("email")
    customer = db.customers.find_one({"email": email})

    if not customer:
        customer = {
            "name": customer_data.get("fullName"),
            "email": email,
            "phone": customer_data.get("phone"),
            "address": shipping_address,
            "createdAt": now,
        }
        result = db.customers.insert_one(customer)
        customer["_id"] = result.inserted_id
    else:
        db.customers.update_one(
            {"_id": customer["_id"]},
            {
                "$set": {
                    "name": customer_data.get("fullName"),
                    "phone": customer_data.get("phone"),
                    "address": shipping_address,
                    "lastOrderAt": now,
                }
            },
        )

    return str(customer["_id"])


def apply_stock_deductions(items):
    for item in items:
        slug = item.get("slug") or item.get("id")
        if not slug:
            continue
        product = db.products.find_one({"slug": slug})
        if not product:
            continue
        quantity = int(item.get("quantity") or 1)
        stock = int(product.get("stock") or 0)
        if stock < quantity:
            return {
                "ok": False,
                "message": f"'{product['name']}' only has {stock} in stock.",
            }
        db.products.update_one(
            {"_id": product["_id"]},
            {"$set": {"stock": stock - quantity}},
        )
    return {"ok": True}


@orders_bp.route("/api/orders", methods=["POST"])
def create_order():
    data = request.get_json() or {}
    items = data.get("items")
    customer_data = data.get("customer") or {}
    shipping_address = data.get("shippingAddress") or {}
    payment_method = data.get("paymentMethod") or "card"

    if not isinstance(items, list) or len(items) == 0:
        return jsonify({"success": False, "message": "Order must contain at least one item"}), 400

    for item in items:
        if not item.get("name") or not item.get("price"):
            return jsonify({"success": False, "message": "Every item needs a name and price"}), 400

    if not customer_data.get("fullName") or not customer_data.get("email") or not customer_data.get("phone"):
        return jsonify({"success": False, "message": "Customer name, email and phone are required"}), 400

    missing_address = [
        field
        for field in ["street", "city", "postal", "country"]
        if not shipping_address.get(field)
    ]
    if missing_address:
        return jsonify({
            "success": False,
            "message": "Complete shipping address is required",
        }), 400

    stock_result = apply_stock_deductions(items)
    if not stock_result["ok"]:
        return jsonify({"success": False, "message": stock_result["message"]}), 409

    customer_id = find_or_create_customer(customer_data, shipping_address)

    subtotal = round(
        sum(float(item["price"]) * int(item.get("quantity") or 1) for item in items),
        2,
    )
    shipping_fee = 0 if subtotal >= SHIPPING_THRESHOLD else SHIPPING_FEE
    tax = round((subtotal + shipping_fee) * TAX_RATE, 2)
    total = round(subtotal + shipping_fee + tax, 2)

    order = {
        "orderNumber": generate_order_number(),
        "items": [
            {
                "slug": item.get("slug") or item.get("id"),
                "name": item["name"],
                "price": float(item["price"]),
                "quantity": int(item.get("quantity") or 1),
                "image": item.get("image"),
            }
            for item in items
        ],
        "customer": {
            "name": customer_data.get("fullName"),
            "email": customer_data.get("email"),
            "phone": customer_data.get("phone"),
        },
        "customerId": customer_id,
        "shippingAddress": {
            "fullName": customer_data.get("fullName"),
            "phone": customer_data.get("phone"),
            "street": shipping_address.get("street"),
            "city": shipping_address.get("city"),
            "state": shipping_address.get("state", ""),
            "postal": shipping_address.get("postal"),
            "country": shipping_address.get("country"),
        },
        "paymentMethod": payment_method,
        "subtotal": subtotal,
        "shippingFee": shipping_fee,
        "tax": tax,
        "total": total,
        "status": "pending",
        "createdAt": datetime.utcnow().isoformat() + "Z",
    }

    result = db.orders.insert_one(order)
    order["id"] = str(order.pop("_id"))
    return jsonify({"success": True, "order": order}), 201


@orders_bp.route("/api/orders/<order_id>", methods=["GET"])
def get_order(order_id):
    try:
        order = db.orders.find_one({"_id": ObjectId(order_id)})
    except Exception:
        return jsonify({"success": False, "message": "Invalid order ID"}), 400

    if not order:
        return jsonify({"success": False, "message": "Order not found"}), 404

    order["id"] = str(order.pop("_id"))
    return jsonify({"success": True, "order": order})


@orders_bp.route("/api/admin/orders", methods=["GET"])
@admin_required
def get_orders():
    orders = list(db.orders.find().sort("createdAt", -1))
    for order in orders:
        order["id"] = str(order.pop("_id"))
    return jsonify({"success": True, "orders": orders})


@orders_bp.route("/api/admin/orders/<order_id>", methods=["GET"])
@admin_required
def get_order_details(order_id):
    try:
        order = db.orders.find_one({"_id": ObjectId(order_id)})
    except Exception:
        return jsonify({"success": False, "message": "Invalid order ID"}), 400

    if not order:
        return jsonify({"success": False, "message": "Order not found"}), 404

    order["id"] = str(order.pop("_id"))
    return jsonify({"success": True, "order": order})


@orders_bp.route("/api/admin/orders/<order_id>/status", methods=["PUT"])
@admin_required
def update_order_status(order_id):
    data = request.get_json() or {}
    status = data.get("status")

    if status not in ORDER_STATUSES:
        return jsonify({"success": False, "message": f"Invalid status. Allowed: {', '.join(ORDER_STATUSES)}"}), 400

    try:
        result = db.orders.update_one(
            {"_id": ObjectId(order_id)},
            {"$set": {"status": status, "updatedAt": datetime.utcnow().isoformat() + "Z"}},
        )
    except Exception:
        return jsonify({"success": False, "message": "Invalid order ID"}), 400

    if result.matched_count == 0:
        return jsonify({"success": False, "message": "Order not found"}), 404

    order = db.orders.find_one({"_id": ObjectId(order_id)})
    order["id"] = str(order.pop("_id"))
    return jsonify({"success": True, "order": order})
