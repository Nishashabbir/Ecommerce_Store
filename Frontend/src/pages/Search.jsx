import { useState } from "react";
import { categories, products } from "../data/products";
import { Footer, Link, ProductCard, useReveal } from "../components";
import { Header } from "../navigation";

export default function Search() {
  useReveal();
  const initialQuery =
    new URLSearchParams(location.search).get("q")?.trim() || "";
  const [query, setQuery] = useState(initialQuery);
  const [activeQuery, setActiveQuery] = useState(initialQuery);
  const normalize = value =>
    String(value)
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, " ")
      .trim();
  const matchesText = (text, searchQuery) => {
    const normalizedQuery = normalize(searchQuery);
    const queryWords = normalizedQuery.split(" ").filter(Boolean);
    const normalizedText = normalize(text);
    const compactQuery = normalizedQuery.replaceAll(" ", "");
    const compactText = normalizedText.replaceAll(" ", "");
    const words = normalizedText.split(" ");
    return (
      compactText.includes(compactQuery) ||
      queryWords.every(queryWord =>
        words.some(
          word => word.startsWith(queryWord) || queryWord.startsWith(word)
        )
      )
    );
  };
  const primaryResults = activeQuery
    ? products.filter(product =>
        matchesText(
          [
            product.name,
            product.subtitle,
            product.category,
            categories[product.category],
          ].join(" "),
          activeQuery
        )
      )
    : [];
  const results = activeQuery
    ? primaryResults.length
      ? primaryResults
      : products.filter(product =>
          matchesText(product.description, activeQuery)
        )
    : [];
  const submitSearch = event => {
    event.preventDefault();
    const nextQuery = query.trim();
    setActiveQuery(nextQuery);
    const url = new URL(location);
    nextQuery
      ? url.searchParams.set("q", nextQuery)
      : url.searchParams.delete("q");
    history.replaceState({}, "", url);
  };
  return (
    <>
      <Header />
      <main>
        <section className="plp-head search-head">
          <div className="plp-copy">
            <p className="eyebrow reveal">Search results</p>
            <h1 className="reveal">
              Search the
              <br />
              <em>collection.</em>
            </h1>
            <form className="search-form reveal" onSubmit={submitSearch}>
              <label className="sr-only" htmlFor="site-search">
                Search products
              </label>
              <input
                id="site-search"
                value={query}
                onChange={event => setQuery(event.target.value)}
                placeholder="Search bags, charms, home decor..."
              />
              <button type="submit">
                Search <span>→</span>
              </button>
            </form>
          </div>
        </section>
        <section className="shop-tools reveal">
          <span className="browse-label">Browse by category</span>
          <div className="filter-links">
            {Object.entries(categories).map(([id, name]) => (
              <Link
                key={id}
                to={id === "all" ? "/shop" : `/shop?category=${id}`}
              >
                {name}
              </Link>
            ))}
          </div>
          <Link className="clear-search" to="/shop">
            Shop all <span>→</span>
          </Link>
        </section>
        <p className="filter-status reveal">
          {activeQuery
            ? `${results.length} ${results.length === 1 ? "piece" : "pieces"} for “${activeQuery}”`
            : "Enter a search term to find a piece"}
        </p>
        {activeQuery ? (
          results.length > 0 ? (
            <section className="catalog-grid">
              {results.map(product => (
                <ProductCard product={product} tall key={product.id} />
              ))}
            </section>
          ) : (
            <section className="empty-state">
              <p className="eyebrow">Ready to search</p>
              <h2>
                What are you
                <br />
                <em>looking for?</em>
              </h2>
              <p>
                Search by product name, collection, or a word from the
                description.
              </p>
              <Link className="text-link" to="/shop">
                Browse all pieces <span>→</span>
              </Link>
            </section>
          )
        ) : (
          <section className="empty-state">
            <p className="eyebrow">No matches</p>
            <h2>
              Nothing matched
              <br />
              <em>“{activeQuery}”.</em>
            </h2>
            <p>Try a different keyword, or browse the complete collection.</p>
            <Link className="text-link" to="/shop">
              Browse all pieces <span>→</span>
            </Link>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}

