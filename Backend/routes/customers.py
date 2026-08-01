from flask import Blueprint, jsonify
from database import db
from middleware.auth import admin_required

customers_bp = Blueprint("customers", __name__)


@customers_bp.route("/api/admin/customers", methods=["GET"])
@admin_required
def get_customers():
    customers = list(db.customers.find())
    for customer in customers:
        customer["id"] = str(customer.pop("_id"))
    return jsonify({"success": True, "customers": customers})
