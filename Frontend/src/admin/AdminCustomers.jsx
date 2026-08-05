import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { AdminLayout } from "./AdminDashboard";
import { adminGetCustomers } from "../api";
import "./admin.css";

export function AdminCustomers() {
  const [, setLocation] = useLocation();
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      setLoading(true);
      setError("");
      try {
        const { response, data } = await adminGetCustomers();
        if (response?.status === 401) return setLocation("/admin/login");
        if (data.success) {
          setCustomers(data.customers || []);
        } else {
          setError(data.message || "Failed to load customers.");
        }
      } catch {
        setError(
          "Could not reach the backend. Make sure the Flask server is running on port 5000."
        );
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <AdminLayout currentPath="/admin/customers">
      <p className="admin-eyebrow">People</p>
      <h1>Customers</h1>

      {error && (
        <p className="admin-error">
          {error}
          <button
            className="admin-error-retry"
            type="button"
            onClick={() => window.location.reload()}
          >
            Retry
          </button>
        </p>
      )}

      {loading ? (
        <p className="admin-note">Loading customers...</p>
      ) : customers.length === 0 ? (
        <p className="admin-note">
          No customers yet. They appear here automatically when an order is
          placed.
        </p>
      ) : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Orders</th>
                <th>Total spent</th>
                <th>First order</th>
              </tr>
            </thead>
            <tbody>
              {customers.map(customer => (
                <tr key={customer.id}>
                  <td>
                    <strong>{customer.name}</strong>
                  </td>
                  <td>{customer.email}</td>
                  <td>{customer.phone || "—"}</td>
                  <td>{customer.orderCount ?? 0}</td>
                  <td>${Number(customer.totalSpent || 0).toFixed(2)}</td>
                  <td className="admin-muted">
                    {customer.createdAt
                      ? new Date(customer.createdAt).toLocaleDateString()
                      : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </AdminLayout>
  );
}
