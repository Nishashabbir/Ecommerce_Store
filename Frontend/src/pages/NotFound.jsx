import { Footer, Link } from "../components";
import { Header } from "../navigation";

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="not-found">
        <p className="eyebrow">Error 404</p>
        <h1>
          This page has
          <br />
          <em>slipped a stitch.</em>
        </h1>
        <p>
          The page you are looking for cannot be found, but there are plenty of
          lovely things waiting at home.
        </p>
        <Link className="text-link" to="/">
          Back to home <span>→</span>
        </Link>
      </main>
      <Footer />
    </>
  );
}

