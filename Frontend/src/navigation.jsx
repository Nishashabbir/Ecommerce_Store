import { Link } from "./components";

// Main-site navigation with links to the pages supplied by the collaborator.
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
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </nav>
      <div className="nav-actions">
        <Link to="/search">Search</Link>
      </div>
    </header>
  );
}
