import { Footer, Link, useReveal } from "../components";
import { Header } from "../navigation";

export default function Story() {
  useReveal();
  return (
    <>
      <Header />
      <main className="story-page">
        <section className="story-hero">
          <div className="story-hero-copy">
            <p className="eyebrow reveal">Our story / Lahore, Pakistan</p>
            <h1 className="reveal">
              Made in the
              <br />
              <em>space between</em>
              <br />
              moments.
            </h1>
            <p className="reveal">
              Loop is a small celebration of patience, colour and the everyday
              objects that make a room—or a day—feel more like yours.
            </p>
          </div>
          <div className="story-hero-image reveal reveal-right">
            <img
              src="/images/story/studio-story.png"
              alt="A colourful crocheted piece in the Loop studio"
            />
          </div>
          <p className="story-side-note">
            Since 2026
            <br />
            Made by hand
          </p>
        </section>
        <section className="story-process">
          <div className="story-process-copy">
            <p className="eyebrow reveal">A softer way of making</p>
            <h2 className="reveal">
              There is beauty in
              <br />
              <em>taking your time.</em>
            </h2>
            <p className="reveal">
              Each piece begins with a little rhythm: pulling, looping and
              turning yarn into something made to be used and loved.
            </p>
          </div>
          <div className="story-process-video reveal reveal-right">
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-label="The Loop crochet-making process"
            >
              <source src="/videos/shop_process.mp4" type="video/mp4" />
              Your browser does not support embedded video.
            </video>
            <div className="process-video-note">
              <span>In the studio</span>
              <b>Made loop by loop</b>
            </div>
          </div>
        </section>
        <section className="story-image-pair">
          <figure className="reveal reveal-left">
            <img
              src="/images/products/bag2.png"
              alt="Hand-crocheted Loop bag"
            />
            <figcaption>Thoughtful colour, tactile detail.</figcaption>
          </figure>
          <figure className="reveal reveal-right">
            <img
              src="/images/products/chain3.png"
              alt="Crochet charm from the Loop collection"
            />
            <figcaption>Little objects, made to be kept close.</figcaption>
          </figure>
        </section>
        <section className="story-values">
          <p className="eyebrow reveal">What stays with us</p>
          <div className="story-values-grid">
            <article className="reveal">
              <span>01</span>
              <h3>Made by hand</h3>
              <p>
                Every loop is shaped with care, so no two pieces are ever quite
                alike.
              </p>
            </article>
            <article className="reveal">
              <span>02</span>
              <h3>Made to live with</h3>
              <p>
                We design for market mornings, quiet corners and the moments in
                between.
              </p>
            </article>
            <article className="reveal">
              <span>03</span>
              <h3>Made with feeling</h3>
              <p>
                Playful colour and soft texture are our way of making the
                everyday brighter.
              </p>
            </article>
          </div>
        </section>
        <section className="story-closing">
          <div className="reveal">
            <p className="eyebrow">A note from our studio</p>
            <h2>
              For the things you
              <br />
              <em>use, hold and love.</em>
            </h2>
            <p>
              Thank you for making room for handmade things. We hope each Loop
              piece brings a small, lasting kind of joy.
            </p>
            <Link className="text-link" to="/shop">
              Explore the collection <span>→</span>
            </Link>
          </div>
          <img
            className="reveal reveal-right"
            src="/images/products/seashellbag.png"
            alt="Crocheted bag from the Loop collection"
          />
        </section>
      </main>
      <Footer />
    </>
  );
}

