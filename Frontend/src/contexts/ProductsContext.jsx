import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { getProducts } from "../api";
import { products as fallbackProducts } from "../data/products";

const ProductsContext = createContext(undefined);

function normalizeProduct(product) {
  return {
    ...product,
    id: product.id || product.slug || product.mongoId,
    price:
      typeof product.price === "number" ? `$${product.price}` : product.price,
  };
}

export function ProductsProvider({ children }) {
  const [products, setProducts] = useState(fallbackProducts);
  const [loading, setLoading] = useState(true);

  const refreshProducts = useCallback(async () => {
    const { data } = await getProducts();
    if (Array.isArray(data.products)) {
      setProducts(data.products.map(normalizeProduct));
    }
  }, []);

  useEffect(() => {
    let active = true;
    getProducts()
      .then(({ data }) => {
        if (active && Array.isArray(data.products)) {
          setProducts(data.products.map(normalizeProduct));
        }
      })
      .catch(() => {})
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  return (
    <ProductsContext.Provider value={{ products, loading, refreshProducts }}>
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error("useProducts must be used within ProductsProvider");
  }
  return context.products;
}

export function useProductsRefresh() {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error("useProductsRefresh must be used within ProductsProvider");
  }
  return context.refreshProducts;
}
