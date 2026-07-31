import { useEffect, useState } from "react";
import { products } from "../data/products";
import { Footer, Link, ProductCard, useReveal } from "../components";
import { Header } from "../navigation";

const heroChapters = [
  [
    "A slower kind of beautiful",
    <>
      One thread.
      <br />
      <em>A whole world.</em>
    </>,
    "Handmade objects for soft living — each loop holding a little more care than the last.",
  ],
  [
    "Hands remember",
    <>
      A rhythm
      <br />
      <em>of care.</em>
    </>,
    "A patient process of pulling, looping and turning. Nothing rushed. Nothing quite the same.",
  ],
  [
    "Made to bloom",
    <>
      A little joy,
      <br />
      <em>in every stitch.</em>
    </>,
    "Colour finds its way in. Petals take shape. The ordinary becomes something you want to hold onto.",
  ],
  [
    "For the life around you",
    <>
      Made slowly.
      <br />
      <em>Loved dearly.</em>
    </>,
    "A soft companion for market mornings, sunlit rooms and all the in-between moments.",
  ],
];

function Hero() {
  const [state, setState] = useState([1, 0]);
  useEffect(() => {
    const update = () => {
      const story = document.querySelector(".story");
      if (!story) return;
      const p = Math.max(
        0,
        Math.min(
          1,
          -story.getBoundingClientRect().top /
            (story.offsetHeight - innerHeight)
        )
      );
      setState([Math.floor(p * 56) + 1, Math.min(3, Math.floor(p * 4))]);
    };
    addEventListener("scroll", update, { passive: true });
    update();
    return () => removeEventListener("scroll", update);
  }, []);
  const [frame, chapter] = state;
  const copy = heroChapters[chapter];
  return (
    <section className="story">
      <div className="pinned">
        <img
          className="film"
          src={`/images/hero/frame_${String(frame).padStart(5, "0")}.png`}
          alt="A floral crochet bag being made"
        />
        <div className="veil" />
        <Header overlay />
        <div className="stage-copy" key={chapter}>
          <p className="eyebrow">{copy[0]}</p>
          <h1>{copy[1]}</h1>
          <p className="lede">{copy[2]}</p>
          <a href="#shop" className="circle-link">
            Shop the collection <b>↓</b>
          </a>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  useReveal();
  return (
    <>
      <main>
        <Hero />
        <section className="shop-intro" id="shop">
          <p className="eyebrow reveal">A little softness goes a long way</p>
          <div>
            <h2 className="reveal">
              Objects with
              <br />
              <em>good energy.</em>
            </h2>
            <p className="reveal">
              For sunlit mornings, thoughtful gifting and every lovely little
              moment in between. Each piece is crocheted by hand and made to be
              used, held and adored.
            </p>
          </div>
        </section>
        <section className="collections-wrap" id="collections">
          <div className="collection-heading">
            <p className="eyebrow reveal">Shop by collection</p>
            <h2 className="reveal">
              Something lovely
              <br />
              <em>for every mood.</em>
            </h2>
            <p className="reveal">
              Explore handmade bags, wearable pieces and tiny crochet treasures.
            </p>
          </div>
          <div className="categories">
            <Link
              className="category cat-one reveal reveal-left"
              to="/shop?category=bags"
            >
              <span>01 / Bags & totes</span>
              <h3>
                Made to
                <br />
                <em>take along.</em>
              </h3>
              <b>Shop bags ↗</b>
            </Link>
            <Link
              className="category cat-two reveal reveal-up"
              to="/shop?category=charms"
            >
              <span>02 / Charms & gifts</span>
              <h3>
                Small things,
                <br />
                <em>big smiles.</em>
              </h3>
              <b>Shop charms ↗</b>
            </Link>
            <Link
              className="category cat-three reveal reveal-right"
              to="/shop?category=home-decor"
            >
              <span>03 / Home decor</span>
              <h3>
                Make home
                <br />
                <em>softer.</em>
              </h3>
              <b>Shop home ↗</b>
            </Link>
          </div>
        </section>
        <section className="featured">
          <div className="section-head">
            <div className="reveal">
              <p className="eyebrow">The summer edit</p>
              <h2>
                Made to be
                <br />
                <em>noticed gently.</em>
              </h2>
            </div>
            <Link className="text-link reveal" to="/shop">
              Shop all pieces <span>→</span>
            </Link>
          </div>
          <div className="product-grid">
            {products.slice(0, 3).map(product => (
              <ProductCard product={product} key={product.id} />
            ))}
          </div>
        </section>
        <section className="promo" id="our-story">
          <div className="promo-image reveal" />
          <div className="promo-copy reveal">
            <p className="eyebrow">From our little studio</p>
            <h2>
              Loop by loop,
              <br />
              <em>we make room</em>
              <br />
              for joy.
            </h2>
            <p>
              Our pieces are designed in Lahore and crocheted with gentle hands,
              one careful stitch at a time.
            </p>
            <Link className="text-link light" to="/story">
              Our story <span>→</span>
            </Link>
          </div>
        </section>
        <section className="newsletter">
          <p className="eyebrow reveal">Letters from the studio</p>
          <h2 className="reveal">
            A little happy
            <br />
            <em>in your inbox.</em>
          </h2>
          <form className="reveal" onSubmit={e => e.preventDefault()}>
            <label className="sr-only" htmlFor="email">
              Email address
            </label>
            <input id="email" type="email" placeholder="Your email address" />
            <button>
              Sign me up <span>→</span>
            </button>
          </form>
          <p className="fine-print reveal">
            New collections, kind notes and 10% off your first order.
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}

