from flask import Blueprint, request, jsonify
from database import db
import bcrypt
import jwt
import os
from dotenv import load_dotenv
from datetime import datetime, timedelta

load_dotenv()
JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY")

auth_bp = Blueprint("auth", __name__)

def ensure_admin_exists():
    admin_user = db.users.find_one({"role": "admin"})
    if not admin_user:
        password = "Admin@123"
        hashed_password = bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt())
        admin = {
            "name": "Admin",
            "email": "admin@crochetstore.com",
            "password": hashed_password,
            "role": "admin",
            "createdAt": datetime.utcnow().isoformat() + "Z",
        }
        db.users.insert_one(admin)
        print("Default admin user created. Email: admin@crochetstore.com Password: Admin@123")

@auth_bp.before_app_request
def initialize_admin():
    ensure_admin_exists()

@auth_bp.route("/api/admin/login", methods=["POST"])
def login():
    data = request.get_json() or {}
    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"success": False, "message": "Email and password are required"}), 400

    admin = db.users.find_one({"email": email, "role": "admin"})
    if not admin:
        return jsonify({"success": False, "message": "Invalid email or password"}), 401

    if not bcrypt.checkpw(password.encode("utf-8"), admin["password"]):
        return jsonify({"success": False, "message": "Invalid email or password"}), 401

    payload = {
        "name": admin["name"],
        "email": admin["email"],
        "role": admin["role"],
        "exp": datetime.utcnow() + timedelta(hours=8),
    }
    token = jwt.encode(payload, JWT_SECRET_KEY, algorithm="HS256")

    return jsonify({
        "success": True,
        "token": token,
        "admin": {
            "name": admin["name"],
            "email": admin["email"],
            "role": admin["role"],
        },
    })