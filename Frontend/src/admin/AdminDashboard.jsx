import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { Link } from "../components";
import { getProducts, adminGetOrders, adminGetCustomers } from "../api";
import "./admin.css";

const adminLinks = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/products", label: "Products" },
  { href: "/admin/orders", label: "Orders" },
  { href: "/admin/customers", label: "Customers" },
];

export function AdminLayout({ children, currentPath }) {
  return (
    <main className="admin-shell">
      <aside className="admin-sidebar">
        <Link to="/admin" className="admin-brand">Loop Admin</Link>
        <nav className="admin-nav" aria-label="Admin navigation">
          {adminLinks.map(link => (
            <Link
              key={link.href}
              to={link.href}
              className={currentPath === link.href ? "is-active" : ""}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </aside>
      <section className="admin-content">{children}</section>
    </main>
  );
}

export function AdminDashboard() {
  const [, setLocation] = useLocation();
  const [stats, setStats] = useState(null);
  const [recentOrders, setRecentOrders] = useState([]);
  const [lowStock, setLowStock] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      setError("");
      try {
        const [productsRes, ordersRes, customersRes] = await Promise.all([
          getProducts(),
          adminGetOrders(),
          adminGetCustomers(),
        ]);

        if (ordersRes.response?.status === 401) {
          return setLocation("/admin/login");
        }

        if (
          !productsRes.response ||
          !productsRes.data?.success ||
          !ordersRes.response ||
          !ordersRes.data?.success ||
          !customersRes.response ||
          !customersRes.data?.success
        ) {
          throw new Error(
            productsRes.data?.message ||
              ordersRes.data?.message ||
              customersRes.data?.message ||
              "Failed to load admin dashboard data."
          );
        }

        const products = productsRes.data.products || [];
        const orders = ordersRes.data.orders || [];
        const customers = customersRes.data.customers || [];

        const revenue = orders.reduce(
          (sum, order) => sum + Number(order.total || 0),
          0
        );
        const pending = orders.filter(order => order.status === "pending").length;
        const processing = orders.filter(order => order.status === "processing").length;
        const lowStockProducts = products.filter(
          product => Number(product.stock ?? 0) <= 5
        );

        setStats({
          revenue,
          orderCount: orders.length,
          pending,
          processing,
          productCount: products.length,
          lowStockCount: lowStockProducts.length,
          customerCount: customers.length,
        });
        setRecentOrders(orders.slice(0, 5));
        setLowStock(lowStockProducts.slice(0, 5));
      } catch (err) {
        setError(
          "Could not reach the backend. Make sure the Flask server is running on port 5000."
        );
      }
    };
    load();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminEmail");
    setLocation("/admin/login");
  };

  const statCards = stats
    ? [
        { label: "Total revenue", value: `$${stats.revenue.toFixed(2)}`, accent: true },
        { label: "Orders", value: stats.orderCount, to: "/admin/orders" },
        { label: "Pending orders", value: stats.pending, to: "/admin/orders" },
        { label: "Processing", value: stats.processing, to: "/admin/orders" },
        { label: "Products", value: stats.productCount, to: "/admin/products" },
        {
          label: "Low stock",
          value: stats.lowStockCount,
          to: "/admin/products",
          warn: stats.lowStockCount > 0,
        },
        { label: "Customers", value: stats.customerCount, to: "/admin/customers" },
      ]
    : [];

  return (
    <AdminLayout currentPath="/admin">
      <div className="admin-head">
        <div>
          <p className="admin-eyebrow">Admin area</p>
          <h1>Dashboard</h1>
        </div>
        <button className="admin-button ghost" type="button" onClick={handleLogout}>
          Logout
        </button>
      </div>

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

      {!stats && !error && (
        <p className="admin-note">Loading dashboard...</p>
      )}

      {stats && (
        <>
          <section className="admin-stats">
            {statCards.map((card, index) => {
              const inner = (
                <>
                  <span>{card.label}</span>
                  <strong className={card.warn ? "admin-low" : ""}>
                    {card.value}
                  </strong>
                </>
              );
              return card.to ? (
                <Link key={index} to={card.to} className="admin-stat-card">
                  {inner}
                </Link>
              ) : (
                <div key={index} className="admin-stat-card">
                  {inner}
                </div>
              );
            })}
          </section>

          <div className="admin-dashboard-grid">
            <section className="admin-card">
              <div className="admin-card-head">
                <h2>Recent orders</h2>
                <Link to="/admin/orders" className="admin-link-button">
                  View all
                </Link>
              </div>
              {recentOrders.length === 0 ? (
                <p className="admin-note">
                  No orders yet. They appear here as soon as customers check out.
                </p>
              ) : (
                <div className="admin-table-wrap">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Order</th>
                        <th>Customer</th>
                        <th>Total</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentOrders.map(order => (
                        <tr key={order.id}>
                          <td>
                            <Link
                              to="/admin/orders"
                              className="admin-link-button"
                            >
                              {order.orderNumber || order.id}
                            </Link>
                          </td>
                          <td>{order.customer?.name || "—"}</td>
                          <td>${Number(order.total || 0).toFixed(2)}</td>
                          <td>
                            <span
                              className={`admin-status admin-status-${order.status}`}
                            >
                              {order.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>

            <section className="admin-card">
              <div className="admin-card-head">
                <h2>Low stock</h2>
                <Link to="/admin/products" className="admin-link-button">
                  Manage products
                </Link>
              </div>
              {lowStock.length === 0 ? (
                <p className="admin-note">All products are well stocked.</p>
              ) : (
                <ul className="admin-stock-list">
                  {lowStock.map(product => (
                    <li key={product.id}>
                      <span>{product.name}</span>
                      <strong
                        className={
                          Number(product.stock ?? 0) === 0 ? "admin-low" : ""
                        }
                      >
                        {product.stock ?? 0} left
                      </strong>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          </div>

          <section className="admin-card">
            <h2>Quick actions</h2>
            <div className="admin-quick-actions">
              <Link to="/admin/products" className="admin-button">
                Add a product
              </Link>
              <Link to="/admin/orders" className="admin-button ghost">
                Review orders
              </Link>
              <Link to="/admin/customers" className="admin-button ghost">
                View customers
              </Link>
              <Link to="/shop" className="admin-button ghost">
                View storefront
              </Link>
            </div>
          </section>
        </>
      )}
    </AdminLayout>
  );
}

export function AdminLogin() {
  const [, setLocation] = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async event => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:5000/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const result = await response.json();

      if (!response.ok || !result.success) {
        setError(result.message || "Invalid email or password");
        setLoading(false);
        return;
      }

      localStorage.setItem("adminToken", result.token);
      localStorage.setItem("adminEmail", result.admin.email);
      setLocation("/admin");
    } catch (err) {
      setError("Unable to connect to the backend. Try again later.");
      setLoading(false);
    }
  };

  return (
    <main className="admin-login-page">
      <form className="admin-login-card" onSubmit={handleSubmit}>
        <p className="admin-eyebrow">Loop Studio</p>
        <h1>Admin Login</h1>
        <div className="admin-login-fields">
          <label htmlFor="admin-email">
            Email
            <input
              id="admin-email"
              name="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={event => setEmail(event.target.value)}
            />
          </label>
          <label htmlFor="admin-password">
            Password
            <input
              id="admin-password"
              name="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={event => setPassword(event.target.value)}
            />
          </label>
        </div>
        {error && <p className="admin-error">{error}</p>}
        <button className="admin-login-button" type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
        <p className="admin-note">Enter your admin credentials to access the dashboard.</p>
      </form>
    </main>
  );
}
