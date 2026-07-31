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
  return (
    <AdminLayout currentPath="/admin">
      <p className="admin-eyebrow">Admin area</p>
      <h1>Welcome Admin</h1>
      <p className="admin-message">You are logged in.</p>
      <button className="admin-logout" type="button" disabled>
        Logout
      </button>
      <p className="admin-note">Authentication will be connected after the database is ready.</p>
    </AdminLayout>
  );
}

export function AdminLogin() {
  return (
    <main className="admin-login-page">
      <form className="admin-login-card" onSubmit={event => event.preventDefault()}>
        <p className="admin-eyebrow">Loop Studio</p>
        <h1>Admin Login</h1>
        <div className="admin-login-fields">
          <label htmlFor="admin-email">
            Email
            <input id="admin-email" name="email" type="email" autoComplete="email" />
          </label>
          <label htmlFor="admin-password">
            Password
            <input id="admin-password" name="password" type="password" autoComplete="current-password" />
          </label>
        </div>
        <button className="admin-login-button" type="submit">Login</button>
        <p className="admin-note">Login functionality will be added with the backend.</p>
      </form>
    </main>
  );
}

export function AdminPlaceholder({ title }) {
  return (
    <AdminLayout currentPath={`/admin/${title.toLowerCase()}`}>
      <p className="admin-eyebrow">Admin area</p>
      <h1>{title}</h1>
      <p className="admin-message">Coming soon.</p>
    </AdminLayout>
  );
}
