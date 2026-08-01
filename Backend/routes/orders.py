from flask import Blueprint, jsonify
from database import db
from middleware.auth import admin_required

orders_bp = Blueprint("orders", __name__)


@orders_bp.route("/api/admin/orders", methods=["GET"])
@admin_required
def get_orders():
    orders = list(db.orders.find())
    for order in orders:
        order["id"] = str(order.pop("_id"))
    return jsonify({"success": True, "orders": orders})
