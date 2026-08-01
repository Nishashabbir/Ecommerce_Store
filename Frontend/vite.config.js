import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
    },
  },
  // The original storefront remains the app entry. client/ holds the
  // collaborator's pages, which are mounted as additional routes.
  publicDir: "assets",
  server: {
    port: 3000,
    strictPort: false,
    host: true,
    allowedHosts: ["localhost", "127.0.0.1"],
    proxy: {
      "/api": {
        target: "http://127.0.0.1:5000",
        changeOrigin: true,
      },
    },
  },
});
