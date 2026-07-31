import { useState } from "react";
import { categories, products } from "../data/products";
import { Footer, Link, ProductCard, Quantity, useReveal } from "../components";
import { Header } from "../navigation";

export default function Product({ id }) {
  const product = products.find(p => p.id === id);
  const [colour, setColour] = useState("oat");
  const [quantity, setQuantity] = useState(1);
  const recommendations = [
    ...products.filter(
      item => item.id !== product.id && item.category === product.category
    ),
    ...products.filter(
      item => item.id !== product.id && item.category !== product.category
    ),
  ].slice(0, 3);
  useReveal();
  return (
    <>
      <Header />
      <main className="pdp">
        <p className="crumb">
          <Link to="/shop">Shop all</Link> / Product details
        </p>
        <section className="detail-layout">
          <div className="detail-image-wrap">
            <img src={product.image} alt={product.name} />
          </div>
          <aside className="product-info">
            <p className="eyebrow">{categories[product.category]}</p>
            <h1>{product.name}</h1>
            <p className="price">{product.price}</p>
            <p className="description">{product.description}</p>
            <div className="variant">
              <span>Choose your colour</span>
              <div>
                {["oat", "pink", "sage"].map(name => (
                  <button
                    key={name}
                    onClick={() => setColour(name)}
                    className={`swatch ${name} ${colour === name ? "active" : ""}`}
                    aria-label={name}
                  />
                ))}
              </div>
            </div>
            <div className="purchase">
              <Quantity value={quantity} onChange={setQuantity} />
              <Link
                className="add"
                to={`/checkout?product=${encodeURIComponent(product.id)}&quantity=${quantity}`}
              >
                Checkout now <span>→</span>
              </Link>
            </div>
            <details open>
              <summary>
                Details & care <span>+</span>
              </summary>
              <p>{product.care}</p>
            </details>
            <details>
              <summary>
                Shipping & returns <span>+</span>
              </summary>
              <p>
                Each piece is made with care and dispatched within 7–10 working
                days. Returns are accepted within 14 days of delivery.
              </p>
            </details>
          </aside>
        </section>
        <section className="recommendations">
          <div className="recommendations-heading reveal">
            <div>
              <p className="eyebrow">Handpicked for you</p>
              <h2>
                You may also
                <br />
                <em>like these.</em>
              </h2>
            </div>
            <Link className="text-link" to="/shop">
              View all pieces <span>→</span>
            </Link>
          </div>
          <div className="product-grid recommendations-grid">
            {recommendations.map(item => (
              <ProductCard product={item} key={item.id} />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

