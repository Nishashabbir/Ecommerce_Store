from flask import Flask
from database import client
from flask_cors import CORS
from routes.auth import auth_bp
from routes.products import products_bp
from routes.orders import orders_bp
from routes.customers import customers_bp

app = Flask(__name__)
CORS(app)

# Register routes
app.register_blueprint(auth_bp)
app.register_blueprint(products_bp)
app.register_blueprint(orders_bp)
app.register_blueprint(customers_bp)

try:
    client.admin.command("ping")
    print("MongoDB Connected Successfully!")
except Exception as e:
    print("MongoDB Connection Failed!")
    print(e)


@app.route("/")
def home():
    return "Crochet Store Backend is Running!"


if __name__ == "__main__":
    app.run(debug=True)