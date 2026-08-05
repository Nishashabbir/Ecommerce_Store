import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { AdminLayout } from "./AdminDashboard";
import { categories } from "../data/products";
import {
  getProducts,
  adminCreateProduct,
  adminUpdateProduct,
  adminDeleteProduct,
} from "../api";
import { useProductsRefresh } from "../contexts/ProductsContext";
import "./admin.css";

const emptyForm = {
  name: "",
  slug: "",
  subtitle: "",
  category: "bags",
  price: "",
  stock: "",
  image: "",
  description: "",
  care: "",
  featured: false,
};

export function AdminProducts() {
  const [, setLocation] = useLocation();
  const refreshProducts = useProductsRefresh();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const { response, data } = await getProducts();
      if (response?.status === 401) return setLocation("/admin/login");
      if (data.success) {
        setProducts(Array.isArray(data.products) ? data.products : []);
      } else {
        setError(data.message || "Failed to load products.");
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
    load();
  }, []);

  const startCreate = () => {
    setEditing(null);
    setForm(emptyForm);
    setShowForm(true);
  };

  const startEdit = product => {
    setEditing(product.mongoId || product.id);
    setForm({
      name: product.name || "",
      slug: product.slug || product.id || "",
      subtitle: product.subtitle || "",
      category: product.category || "bags",
      price: product.price,
      stock: product.stock ?? "",
      image: product.image || "",
      description: product.description || "",
      care: product.care || "",
      featured: !!product.featured,
    });
    setShowForm(true);
  };

  const handleFieldChange = (event, field) => {
    const value = field === "featured" ? event.target.checked : event.target.value;
    setForm(current => ({ ...current, [field]: value }));
  };

  const handleSubmit = async event => {
    event.preventDefault();
    setSaving(true);
    setError("");
    const payload = {
      ...form,
      price: Number(form.price),
      stock: Number(form.stock || 0),
    };
    if (!payload.slug) {
      payload.slug = payload.name.toLowerCase().replace(/\s+/g, "-");
    }
    const result = editing
      ? await adminUpdateProduct(editing, payload)
      : await adminCreateProduct(payload);
    if (result.response?.status === 401) return setLocation("/admin/login");
    if (!result.data.success) {
      setError(result.data.message || "Something went wrong.");
      setSaving(false);
      return;
    }
    setSaving(false);
    setShowForm(false);
    refreshProducts();
    load();
  };

  const handleDelete = async product => {
    if (
      !window.confirm(`Delete "${product.name}"? This cannot be undone.`)
    )
      return;
    const { response, data } = await adminDeleteProduct(
      product.mongoId || product.id
    );
    if (response.status === 401) return setLocation("/admin/login");
    if (!data.success) {
      setError(data.message || "Failed to delete product.");
      return;
    }
    refreshProducts();
    load();
  };

  return (
    <AdminLayout currentPath="/admin/products">
      <div className="admin-head">
        <div>
          <p className="admin-eyebrow">Catalog</p>
          <h1>Products</h1>
        </div>
        <button className="admin-button" type="button" onClick={startCreate}>
          Add product
        </button>
      </div>

      {error && (
        <p className="admin-error">
          {error}
          <button className="admin-error-retry" type="button" onClick={load}>
            Retry
          </button>
        </p>
      )}

      {showForm && (
        <form className="admin-card admin-form" onSubmit={handleSubmit}>
          <h2>{editing ? "Edit product" : "New product"}</h2>
          <div className="admin-form-grid">
            <label>
              Name
              <input
                type="text"
                required
                value={form.name}
                onChange={event => handleFieldChange(event, "name")}
              />
            </label>
            <label>
              Slug
              <input
                type="text"
                value={form.slug}
                onChange={event => handleFieldChange(event, "slug")}
                placeholder="auto-generated from name"
              />
            </label>
            <label>
              Subtitle
              <input
                type="text"
                value={form.subtitle}
                onChange={event => handleFieldChange(event, "subtitle")}
              />
            </label>
            <label>
              Category
              <select
                value={form.category}
                onChange={event => handleFieldChange(event, "category")}
              >
                {Object.entries(categories).map(([id, name]) =>
                  id === "all" ? null : (
                    <option key={id} value={id}>
                      {name}
                    </option>
                  )
                )}
              </select>
            </label>
            <label>
              Price ($)
              <input
                type="number"
                min="0"
                step="0.01"
                required
                value={form.price}
                onChange={event => handleFieldChange(event, "price")}
              />
            </label>
            <label>
              Stock
              <input
                type="number"
                min="0"
                step="1"
                required
                value={form.stock}
                onChange={event => handleFieldChange(event, "stock")}
              />
            </label>
            <label className="admin-form-full">
              Image URL
              <input
                type="text"
                value={form.image}
                onChange={event => handleFieldChange(event, "image")}
              />
            </label>
            <label className="admin-form-full">
              Description
              <textarea
                rows="3"
                value={form.description}
                onChange={event => handleFieldChange(event, "description")}
              />
            </label>
            <label className="admin-form-full">
              Care instructions
              <textarea
                rows="2"
                value={form.care}
                onChange={event => handleFieldChange(event, "care")}
              />
            </label>
            <label className="admin-check">
              <input
                type="checkbox"
                checked={form.featured}
                onChange={event => handleFieldChange(event, "featured")}
              />
              Featured on home page
            </label>
          </div>
          <div className="admin-form-actions">
            <button
              className="admin-button ghost"
              type="button"
              onClick={() => setShowForm(false)}
            >
              Cancel
            </button>
            <button className="admin-button" type="submit" disabled={saving}>
              {saving
                ? "Saving..."
                : editing
                  ? "Save changes"
                  : "Create product"}
            </button>
          </div>
        </form>
      )}

      {loading ? (
        <p className="admin-note">Loading products...</p>
      ) : products.length === 0 ? (
        <p className="admin-note">No products yet. Add your first piece.</p>
      ) : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Featured</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product.id}>
                  <td>
                    <div className="admin-cell-product">
                      {product.image && <img src={product.image} alt="" />}
                      <div>
                        <strong>{product.name}</strong>
                        {product.subtitle && <span>{product.subtitle}</span>}
                      </div>
                    </div>
                  </td>
                  <td>{categories[product.category] || product.category}</td>
                  <td>${Number(product.price || 0).toFixed(2)}</td>
                  <td
                    className={
                      Number(product.stock || 0) === 0 ? "admin-low" : ""
                    }
                  >
                    {product.stock ?? 0}
                  </td>
                  <td>{product.featured ? "Yes" : "—"}</td>
                  <td>
                    <div className="admin-row-actions">
                      <button
                        className="admin-link-button"
                        type="button"
                        onClick={() => startEdit(product)}
                      >
                        Edit
                      </button>
                      <button
                        className="admin-link-button danger"
                        type="button"
                        onClick={() => handleDelete(product)}
                      >
                        Delete
                      </button>
                    </div>
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
