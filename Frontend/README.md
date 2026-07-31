# Loop crochet store (React)

This storefront has been converted from static HTML and browser scripts to a React + Vite app.

## Run it

```bash
npm install
npm run dev
```

Create a deployable production bundle with:

```bash
npm run build
```

## Routes

- `/` — homepage and scroll-driven hero
- `/shop` — product catalogue and category filters
- `/product/:id` — product detail page

## Project structure

```text
src/
  App.jsx                 Pages and client-side routing
  components.jsx          Shared UI components and small React hooks
  data/products.js        Product catalogue and category data
  styles.css              Loads the existing storefront styles
assets/
  images/                 Static product, story, and hero image files
```

Product content is now managed in `src/data/products.js`. The original static HTML and JavaScript files have been kept as reference material; the React application starts from `index.html`.
