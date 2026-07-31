import { useEffect, useState } from "react";
import { categories } from "./data/products";

export function navigate(to) {
  window.history.pushState({}, "", to);
  window.dispatchEvent(new PopStateEvent("popstate"));
  requestAnimationFrame(() => {
    const target = new URL(to, window.location.origin).hash.slice(1);
    if (target)
      document.getElementById(target)?.scrollIntoView({ behavior: "smooth" });
    else window.scrollTo(0, 0);
  });
}
export function Link({ to, children, ...props }) {
  return (
    <a
      href={to}
      onClick={e => {
        if (!e.metaKey && !e.ctrlKey) {
          e.preventDefault();
          navigate(to);
        }
      }}
      {...props}
    >
      {children}
    </a>
  );
}
export function Header({ overlay = false }) {
  return (
    <header className={overlay ? "nav" : "shop-nav"}>
      <Link className="brand" to="/">
        loop<span>°</span>
      </Link>
      <nav aria-label="Main navigation">
        <Link className="home-link" to="/">
          Home
        </Link>
        <Link to="/shop">Shop</Link>
        <Link className="nav-category" to="/#collections">
          Categories
        </Link>
        <Link to="/story">Our story</Link>
      </nav>
      <div className="nav-actions">
        <Link to="/search">Search</Link>
        <a href="#bag">Bag (0)</a>
      </div>
    </header>
  );
}
export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div className="footer-intro">
          <Link className="brand" to="/">
            loop<span>°</span>
          </Link>
          <p>
            Small-batch crochet pieces made slowly in Lahore, for the moments
            you want to hold onto.
          </p>
          <a className="footer-email" href="mailto:hello@loopstudio.pk">
            hello@loopstudio.pk <span>↗</span>
          </a>
        </div>
        <nav className="footer-column" aria-label="Shop links">
          <p>Shop</p>
          <Link to="/shop">All pieces</Link>
          <Link to="/shop?category=bags">Bags & totes</Link>
          <Link to="/shop?category=headwear">Headwear</Link>
          <Link to="/shop?category=charms">Charms & gifts</Link>
        </nav>
        <nav className="footer-column" aria-label="Studio links">
          <p>Studio</p>
          <Link to="/story">Our story</Link>
          <Link to="/about">About us</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/faq">FAQ</Link>
          <Link to="/admin/login">Admin</Link>
        </nav>
        <div className="footer-signup">
          <p className="eyebrow">Letters from the studio</p>
          <h2>
            A little happy,
            <br />
            <em>occasionally.</em>
          </h2>
          <p>New pieces, kind notes and 10% off your first order.</p>
          <form onSubmit={event => event.preventDefault()}>
            <label className="sr-only" htmlFor="footer-email">
              Email address
            </label>
            <input
              id="footer-email"
              type="email"
              placeholder="Your email address"
            />
            <button type="submit" aria-label="Sign up for the newsletter">
              →
            </button>
          </form>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 Loop Studio</span>
        <div>
          <Link to="/policies/privacy">Privacy</Link>
          <Link to="/policies/returns">Returns</Link>
          <span>Made with patience</span>
        </div>
      </div>
    </footer>
  );
}
export function ProductCard({ product, tall = false }) {
  return (
    <article className="product-card">
      <Link
        className={`product-image${tall ? " tall" : ""}`}
        to={`/product/${product.id}`}
        style={{ backgroundImage: `url('${product.image}')` }}
      />
      <div className="product-meta">
        <div>
          <h3>{product.name}</h3>
          <p>{product.subtitle}</p>
        </div>
        <b>{product.price}</b>
      </div>
      <Link className="quick-add" to={`/product/${product.id}`}>
        View piece <span>↗</span>
      </Link>
    </article>
  );
}
export function Quantity({ value, onChange }) {
  const [internalQuantity, setInternalQuantity] = useState(1);
  const quantity = value ?? internalQuantity;
  const updateQuantity = nextQuantity => {
    const next = Math.max(1, nextQuantity);
    if (onChange) onChange(next);
    else setInternalQuantity(next);
  };
  return (
    <div className="quantity">
      <button
        onClick={() => updateQuantity(quantity - 1)}
        aria-label="Decrease quantity"
      >
        −
      </button>
      <span>{quantity}</span>
      <button
        onClick={() => updateQuantity(quantity + 1)}
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  );
}
export function CategoryFilters({ value, onChange }) {
  return Object.entries(categories).map(([id, name]) => (
    <a
      key={id}
      className={value === id ? "active" : ""}
      href={`?category=${id}`}
      onClick={e => {
        e.preventDefault();
        onChange(id);
      }}
    >
      {name}
    </a>
  ));
}
export function useReveal() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const observer = new IntersectionObserver(
      entries =>
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }),
      { threshold: 0.12 }
    );
    document.querySelectorAll(".reveal").forEach((el, index) => {
      el.style.setProperty(
        "--reveal-delay",
        `${Math.min((index % 3) * 90, 180)}ms`
      );
      observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);
}
