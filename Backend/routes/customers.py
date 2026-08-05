from flask import Blueprint, jsonify
from bson.objectid import ObjectId
from database import db
from middleware.auth import admin_required

customers_bp = Blueprint("customers", __name__)


@customers_bp.route("/api/admin/customers", methods=["GET"])
@admin_required
def get_customers():
    customers = list(db.customers.find().sort("createdAt", -1))
    for customer in customers:
        customer["id"] = str(customer.pop("_id"))
        customer["orderCount"] = db.orders.count_documents({"customerId": customer["id"]})
        spent = db.orders.aggregate(
            [
                {"$match": {"customerId": customer["id"]}},
                {"$group": {"_id": None, "total": {"$sum": "$total"}}},
            ]
        )
        customer["totalSpent"] = round(next(spent, {"total": 0})["total"], 2)
    return jsonify({"success": True, "customers": customers})


@customers_bp.route("/api/admin/customers/<customer_id>", methods=["GET"])
@admin_required
def get_customer(customer_id):
    try:
        customer = db.customers.find_one({"_id": ObjectId(customer_id)})
    except Exception:
        return jsonify({"success": False, "message": "Invalid customer ID"}), 400

    if not customer:
        return jsonify({"success": False, "message": "Customer not found"}), 404

    customer["id"] = str(customer.pop("_id"))
    customer["orders"] = list(
        db.orders.find({"customerId": customer["id"]}).sort("createdAt", -1)
    )
    for order in customer["orders"]:
        order["id"] = str(order.pop("_id"))
    return jsonify({"success": True, "customer": customer})
