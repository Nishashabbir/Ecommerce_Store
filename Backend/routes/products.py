from flask import Blueprint, request, jsonify
from bson.objectid import ObjectId
from database import db
from middleware.auth import admin_required
from datetime import datetime

products_bp = Blueprint("products", __name__)


@products_bp.route("/api/products", methods=["GET"])
def get_products():
    products = list(db.products.find())
    for product in products:
        product["mongoId"] = str(product["_id"])
        product["id"] = product.get("slug") or str(product["_id"])
        product.pop("_id", None)
    return jsonify({"success": True, "products": products})


@products_bp.route("/api/products/<product_id>", methods=["GET"])
def get_product(product_id):
    product = db.products.find_one({"slug": product_id})
    if not product:
        try:
            product = db.products.find_one({"_id": ObjectId(product_id)})
        except Exception:
            product = None

    if not product:
        return jsonify({"success": False, "message": "Product not found"}), 404

    product["mongoId"] = str(product["_id"])
    product["id"] = product.get("slug") or str(product["_id"])
    product.pop("_id", None)
    return jsonify({"success": True, "product": product})


@products_bp.route("/api/admin/products", methods=["POST"])
@admin_required
def create_product():
    data = request.get_json()
    required_fields = ["name", "description", "price", "category", "stock", "image"]
    if not data or not all(field in data for field in required_fields):
        return jsonify({"success": False, "message": "Missing required product fields"}), 400

    slug = data.get("slug") or data.get("id") or data["name"].lower().replace(" ", "-")
    product = {
        "slug": slug,
        "name": data["name"],
        "description": data["description"],
        "price": data["price"],
        "category": data["category"],
        "stock": data["stock"],
        "image": data["image"],
        "subtitle": data.get("subtitle", ""),
        "label": data.get("label", ""),
        "care": data.get("care", ""),
        "featured": data.get("featured", False),
        "createdAt": datetime.utcnow().isoformat() + "Z",
    }

    if db.products.find_one({"slug": slug}):
        return jsonify({"success": False, "message": "A product with this slug already exists"}), 409

    result = db.products.insert_one(product)
    product["id"] = str(product.pop("_id"))
    return jsonify({"success": True, "product": product}), 201


@products_bp.route("/api/admin/products/<product_id>", methods=["PUT"])
@admin_required
def update_product(product_id):
    data = request.get_json()
    if not data:
        return jsonify({"success": False, "message": "No update data provided"}), 400

    update_fields = {}
    for field in ["name", "description", "price", "category", "stock", "image", "featured", "subtitle", "label", "care", "slug"]:
        if field in data:
            update_fields[field] = data[field]

    if not update_fields:
        return jsonify({"success": False, "message": "No valid fields to update"}), 400

    try:
        result = db.products.update_one({"_id": ObjectId(product_id)}, {"$set": update_fields})
    except Exception:
        return jsonify({"success": False, "message": "Invalid product ID"}), 400

    if result.matched_count == 0:
        return jsonify({"success": False, "message": "Product not found"}), 404

    updated_product = db.products.find_one({"_id": ObjectId(product_id)})
    updated_product["id"] = str(updated_product.pop("_id"))
    return jsonify({"success": True, "product": updated_product})


@products_bp.route("/api/admin/products/<product_id>", methods=["DELETE"])
@admin_required
def delete_product(product_id):
    try:
        result = db.products.delete_one({"_id": ObjectId(product_id)})
    except Exception:
        return jsonify({"success": False, "message": "Invalid product ID"}), 400

    if result.deleted_count == 0:
        return jsonify({"success": False, "message": "Product not found"}), 404

    return jsonify({"success": True, "message": "Product deleted"})
