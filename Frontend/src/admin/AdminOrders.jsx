import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { AdminLayout } from "./AdminDashboard";
import {
  adminGetOrders,
  adminGetOrder,
  adminUpdateOrderStatus,
} from "../api";
import "./admin.css";

const ORDER_STATUSES = ["pending", "processing", "shipped", "delivered", "cancelled"];

function formatDate(value) {
  return value
    ? new Date(value).toLocaleString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "—";
}

export function AdminOrders() {
  const [, setLocation] = useLocation();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);

  const loadOrders = async () => {
    setLoading(true);
    setError("");
    try {
      const { response, data } = await adminGetOrders();
      if (response?.status === 401) return setLocation("/admin/login");
      if (data.success) {
        setOrders(Array.isArray(data.orders) ? data.orders : []);
      } else {
        setError(data.message || "Failed to load orders.");
      }
    } catch {
      setError(
        "Could not reach the backend. Make sure the Flask server is running on port 5000."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const openDetails = async orderId => {
    setSelectedOrder(null);
    const { response, data } = await adminGetOrder(orderId);
    if (response?.status === 401) return setLocation("/admin/login");
    if (data.success) setSelectedOrder(data.order);
  };

  const changeStatus = async (orderId, status) => {
    setError("");
    const { response, data } = await adminUpdateOrderStatus(orderId, status);
    if (response?.status === 401) return setLocation("/admin/login");
    if (!data.success) {
      setError(data.message || "Failed to update status.");
      return;
    }
    setOrders(current =>
      current.map(order =>
        order.id === orderId ? { ...order, status: data.order.status } : order
      )
    );
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder(current => ({ ...current, status: data.order.status }));
    }
  };

  const itemCount = order =>
    (order.items || []).reduce(
      (count, item) => count + (item.quantity || 1),
      0
    );

  return (
    <AdminLayout currentPath="/admin/orders">
      <p className="admin-eyebrow">Sales</p>
      <h1>Orders</h1>

      {error && (
        <p className="admin-error">
          {error}
          <button
            className="admin-error-retry"
            type="button"
            onClick={loadOrders}
          >
            Retry
          </button>
        </p>
      )}

      {selectedOrder && (
        <section className="admin-card admin-order-detail">
          <div className="admin-order-detail-head">
            <div>
              <h2>{selectedOrder.orderNumber || selectedOrder.id}</h2>
              <p className="admin-note">
                Placed {formatDate(selectedOrder.createdAt)}
              </p>
            </div>
            <select
              className="admin-select"
              value={selectedOrder.status}
              onChange={event =>
                changeStatus(selectedOrder.id, event.target.value)
              }
            >
              {ORDER_STATUSES.map(status => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>

          <div className="admin-order-detail-grid">
            <div>
              <h3>Customer</h3>
              <p>{selectedOrder.customer?.name}</p>
              <p>{selectedOrder.customer?.email}</p>
              <p>{selectedOrder.customer?.phone}</p>
            </div>
            <div>
              <h3>Shipping address</h3>
              <p>
                {selectedOrder.shippingAddress?.fullName}
                <br />
                {selectedOrder.shippingAddress?.street}
                <br />
                {selectedOrder.shippingAddress?.city},{" "}
                {selectedOrder.shippingAddress?.state}{" "}
                {selectedOrder.shippingAddress?.postal}
                <br />
                {selectedOrder.shippingAddress?.country}
              </p>
            </div>
            <div>
              <h3>Payment</h3>
              <p className="capitalize">
                {selectedOrder.paymentMethod === "cod"
                  ? "Cash on Delivery"
                  : selectedOrder.paymentMethod === "bank"
                    ? "Bank Transfer"
                    : "Credit / Debit Card"}
              </p>
            </div>
            <div>
              <h3>Totals</h3>
              <p>
                Subtotal: ${Number(selectedOrder.subtotal || 0).toFixed(2)}
                <br />
                Shipping:{" "}
                {Number(selectedOrder.shippingFee || 0) === 0
                  ? "FREE"
                  : `$${Number(selectedOrder.shippingFee).toFixed(2)}`}
                <br />
                Tax: ${Number(selectedOrder.tax || 0).toFixed(2)}
                <br />
                <strong>
                  Total: ${Number(selectedOrder.total || 0).toFixed(2)}
                </strong>
              </p>
            </div>
          </div>

          <div className="admin-order-items">
            <h3>Items</h3>
            {(selectedOrder.items || []).map((item, index) => (
              <div className="admin-order-item" key={index}>
                {item.image && <img src={item.image} alt="" />}
                <span>
                  {item.name} × {item.quantity}
                </span>
                <strong>
                  ${Number(item.price * (item.quantity || 1)).toFixed(2)}
                </strong>
              </div>
            ))}
          </div>

          <button
            className="admin-button ghost"
            type="button"
            onClick={() => setSelectedOrder(null)}
          >
            Close details
          </button>
        </section>
      )}

      {loading ? (
        <p className="admin-note">Loading orders...</p>
      ) : orders.length === 0 ? (
        <p className="admin-note">
          No orders yet. They will appear here once customers check out.
        </p>
      ) : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Order</th>
                <th>Customer</th>
                <th>Items</th>
                <th>Total</th>
                <th>Status</th>
                <th>Placed</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order.id} onClick={() => openDetails(order.id)}>
                  <td>
                    <strong>{order.orderNumber || order.id}</strong>
                  </td>
                  <td>
                    {order.customer?.name}
                    <br />
                    <span className="admin-muted">
                      {order.customer?.email}
                    </span>
                  </td>
                  <td>{itemCount(order)}</td>
                  <td>${Number(order.total || 0).toFixed(2)}</td>
                  <td>
                    <span
                      className={`admin-status admin-status-${order.status}`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td>{formatDate(order.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </AdminLayout>
  );
}
