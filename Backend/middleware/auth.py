from functools import wraps
from flask import request, jsonify
import jwt
import os
from dotenv import load_dotenv

load_dotenv()
JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY")


def admin_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        token = None

        auth_header = request.headers.get("Authorization")
        if auth_header and auth_header.startswith("Bearer "):
            token = auth_header.split(" ", 1)[1]

        if not token:
            return jsonify({"success": False, "message": "Token is missing"}), 401

        try:
            payload = jwt.decode(token, JWT_SECRET_KEY, algorithms=["HS256"])
            if payload.get("role") != "admin":
                return jsonify({"success": False, "message": "Admin access required"}), 403
            request.admin = {
                "name": payload.get("name"),
                "email": payload.get("email"),
                "role": payload.get("role"),
            }
        except jwt.ExpiredSignatureError:
            return jsonify({"success": False, "message": "Token has expired"}), 401
        except jwt.InvalidTokenError:
            return jsonify({"success": False, "message": "Invalid token"}), 401

        return f(*args, **kwargs)

    return decorated_function
