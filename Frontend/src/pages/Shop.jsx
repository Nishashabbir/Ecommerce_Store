import { useEffect, useState } from "react";
import { categories } from "../data/products";
import { useProducts } from "../contexts/ProductsContext";
import { CategoryFilters, Footer, ProductCard, useReveal } from "../components";
import { Header } from "../navigation";

export default function Shop() {
  useReveal();
  const products = useProducts();
  const queryFilter = new URLSearchParams(location.search).get("category");
  const [filter, setFilter] = useState(
    categories[queryFilter] ? queryFilter : "all"
  );
  const visible =
    filter === "all" ? products : products.filter(p => p.category === filter);
  useEffect(() => {
    const url = new URL(location);
    filter === "all"
      ? url.searchParams.delete("category")
      : url.searchParams.set("category", filter);
    history.replaceState({}, "", url);
  }, [filter]);
  return (
    <>
      <Header />
      <main>
        <section className="plp-head">
          <div className="plp-copy">
            <p className="eyebrow reveal">The loop collection</p>
            <h1 className="reveal">
              Good things,
              <br />
              <em>made slowly.</em>
            </h1>
            <p className="reveal">
              Hand-crocheted bags, headwear, home pieces, charms and giftable
              little treasures.
            </p>
          </div>
          <div className="plp-image reveal reveal-right">
            <img
              src="/images/shop-header.png"
              alt="Hand-crocheted floral bag and matching purse"
            />
          </div>
        </section>
        <section className="shop-tools reveal">
          <button type="button">
            Filter <span>+</span>
          </button>
          <div className="filter-links">
            <CategoryFilters value={filter} onChange={setFilter} />
          </div>
          <button type="button">
            Sort by <span>↕</span>
          </button>
        </section>
        <p className="filter-status reveal">
          {visible.length} {visible.length === 1 ? "piece" : "pieces"} —{" "}
          {categories[filter]}
        </p>
        <section className="catalog-grid">
          {visible.map(product => (
            <ProductCard product={product} tall key={product.id} />
          ))}
        </section>
      </main>
      <Footer />
    </>
  );
}

