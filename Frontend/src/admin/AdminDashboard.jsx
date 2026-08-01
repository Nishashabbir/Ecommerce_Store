import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Link } from "../components";
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

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminEmail");
    setLocation("/admin/login");
  };

  return (
    <AdminLayout currentPath="/admin">
      <p className="admin-eyebrow">Admin area</p>
      <h1>Welcome Admin</h1>
      <p className="admin-message">You are logged in.</p>
      <button className="admin-logout" type="button" onClick={handleLogout}>
        Logout
      </button>
      <p className="admin-note">Authentication will be connected after the database is ready.</p>
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

export function AdminPlaceholder({ title }) {
  const [, setLocation] = useLocation();
  const token = localStorage.getItem("adminToken");

  useEffect(() => {
    if (!token) {
      setLocation("/admin/login");
    }
  }, [token, setLocation]);

  if (!token) {
    return null;
  }

  return (
    <AdminLayout currentPath={`/admin/${title.toLowerCase()}`}>
      <p className="admin-eyebrow">Admin area</p>
      <h1>{title}</h1>
      <p className="admin-message">Coming soon.</p>
    </AdminLayout>
  );
}
