const API_BASE_URL = "";

function getToken() {
  return typeof window !== "undefined"
    ? localStorage.getItem("adminToken")
    : null;
}

async function request(path, options = {}) {
  const headers = { ...(options.headers || {}) };
  if (options.body && typeof options.body === "string") {
    headers["Content-Type"] = "application/json";
  }
  const token = getToken();
  if (token) headers.Authorization = `Bearer ${token}`;
  try {
    const response = await fetch(`${API_BASE_URL}${path}`, {
      ...options,
      headers,
    });
    const data = await response.json().catch(() => ({}));
    return { response, data };
  } catch (error) {
    return {
      response: null,
      data: {
        success: false,
        message:
          "Could not reach the backend. Check that the Flask server is running on port 5000.",
      },
      error,
    };
  }
}

export function getProducts() {
  return request("/api/products");
}

export function createOrder(order) {
  return request("/api/orders", { method: "POST", body: JSON.stringify(order) });
}

export function getOrder(id) {
  return request(`/api/orders/${encodeURIComponent(id)}`);
}

export function adminGetOrders() {
  return request("/api/admin/orders");
}

export function adminGetOrder(id) {
  return request(`/api/admin/orders/${encodeURIComponent(id)}`);
}

export function adminUpdateOrderStatus(id, status) {
  return request(`/api/admin/orders/${encodeURIComponent(id)}/status`, {
    method: "PUT",
    body: JSON.stringify({ status }),
  });
}

export function adminCreateProduct(product) {
  return request("/api/admin/products", {
    method: "POST",
    body: JSON.stringify(product),
  });
}

export function adminUpdateProduct(id, product) {
  return request(`/api/admin/products/${encodeURIComponent(id)}`, {
    method: "PUT",
    body: JSON.stringify(product),
  });
}

export function adminDeleteProduct(id) {
  return request(`/api/admin/products/${encodeURIComponent(id)}`, {
    method: "DELETE",
  });
}

export function adminGetCustomers() {
  return request("/api/admin/customers");
}
