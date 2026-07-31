import { useLocation } from "wouter";
import { products } from "./data/products";
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
import { AdminDashboard, AdminLogin, AdminPlaceholder } from "./admin/AdminDashboard";

export default function App() {
  const [path] = useLocation();

  if (path === "/admin/login") return <AdminLogin />;
  if (path === "/admin") return <AdminDashboard />;
  if (path === "/admin/products") return <AdminPlaceholder title="Products" />;
  if (path === "/admin/orders") return <AdminPlaceholder title="Orders" />;
  if (path === "/admin/customers") return <AdminPlaceholder title="Customers" />;
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
