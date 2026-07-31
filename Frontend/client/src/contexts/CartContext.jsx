import { createContext, useContext, useState } from 'react';

const CartContext = createContext(undefined);

export function CartProvider({ children }) {
  const [items, setItems] = useState([
    {
      id: '1',
      name: 'Artisan Crochet Cardigan',
      price: 89.99,
      quantity: 1,
      color: 'Dusty Rose',
      image: '/images/products/bag.png',
    },
    {
      id: '2',
      name: 'Handmade Crochet Sweater',
      price: 129.99,
      quantity: 1,
      size: 'M',
      color: 'Cream',
      image: '/images/products/bag4.png',
    },
  ]);
  const [couponDiscount, setCouponDiscount] = useState(0);

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.1;
  const shipping = subtotal > 100 ? 0 : 12.99;
  const total = subtotal + tax + shipping - couponDiscount;

  const addItem = (item) => {
    const existingItem = items.find((i) => i.id === item.id);
    if (existingItem) {
      setItems(
        items.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
        )
      );
    } else {
      setItems([...items, item]);
    }
  };

  const removeItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      removeItem(id);
    } else {
      setItems(
        items.map((item) => (item.id === id ? { ...item, quantity } : item))
      );
    }
  };

  const clearCart = () => {
    setItems([]);
    setCouponDiscount(0);
  };

  const applyCoupon = (discount) => {
    setCouponDiscount(discount);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        subtotal,
        tax,
        shipping,
        total,
        couponDiscount,
        applyCoupon,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
}
