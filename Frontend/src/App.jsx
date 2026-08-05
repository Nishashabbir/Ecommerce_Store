import { useLocation } from "wouter";
import { useProducts } from "./contexts/ProductsContext";
import Home from "./pages/Home";
import Story from "./pages/Story";
import Shop from "./pages/Shop";
import Search from "./pages/Search";
import PolicyPage, { policyPages } from "./pages/PolicyPage";
import NotFound from "./pages/NotFound";
import Product from "./pages/Product";
import About from "../client/src/pages/About";
import Checkout from "../client/src/pages/Checkout";
import Contact from "../client/src/pages/Contact";
import FAQ from "../client/src/pages/FAQ";
import { CollaboratorLayout } from "./pages/CollaboratorLayout";
import OrderConfirmation from "../client/src/pages/OrderConfirmation";
import { AdminDashboard, AdminLogin } from "./admin/AdminDashboard";
import { AdminProducts } from "./admin/AdminProducts";
import { AdminOrders } from "./admin/AdminOrders";
import { AdminCustomers } from "./admin/AdminCustomers";

export default function App() {
  const [path] = useLocation();
  const products = useProducts();
  const token = typeof window !== "undefined" ? localStorage.getItem("adminToken") : null;
  const isAdminRoute = path.startsWith("/admin");

  if (isAdminRoute && path !== "/admin/login" && !token) {
    return <AdminLogin />;
  }
  if (path === "/admin/login") return <AdminLogin />;
  if (path === "/admin") return <AdminDashboard />;
  if (path === "/admin/products") return <AdminProducts />;
  if (path === "/admin/orders") return <AdminOrders />;
  if (path === "/admin/customers") return <AdminCustomers />;
  if (path === "/about") return <CollaboratorLayout><About /></CollaboratorLayout>;
  if (path === "/contact") return <CollaboratorLayout><Contact /></CollaboratorLayout>;
  if (path === "/faq") return <CollaboratorLayout><FAQ /></CollaboratorLayout>;
  if (path === "/checkout") return <CollaboratorLayout><Checkout /></CollaboratorLayout>;
  if (path.startsWith("/order-confirmation/")) return <CollaboratorLayout><OrderConfirmation /></CollaboratorLayout>;
  if (path.startsWith("/product/")) {
    const id = decodeURIComponent(path.slice(9));
    return products.some(product => product.id === id) ? <Product id={id} /> : <NotFound />;
  }
  if (policyPages[path]) return <PolicyPage policy={policyPages[path]} />;
  if (path === "/") return <Home />;
  if (path === "/shop") return <Shop />;
  if (path === "/search") return <Search />;
  if (path === "/story") return <Story />;
  return <NotFound />;
}
