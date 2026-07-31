import { useState } from 'react';
import { Link } from 'wouter';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { PRODUCT_IMAGES } from '@/lib/embeddedImages';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

export default function Cart() {
  const [cartItems, setCartItems] = useState([
    { id: '1', name: 'Artisan Crochet Cardigan', price: 89.99, quantity: 1, color: 'Dusty Rose', image: PRODUCT_IMAGES.blanket },
    { id: '2', name: 'Handmade Crochet Sweater', price: 129.99, quantity: 1, color: 'Cream', size: 'M', image: PRODUCT_IMAGES.sweater },
  ]);

  const [couponCode, setCouponCode] = useState('');
  const [couponDiscount, setCouponDiscount] = useState(0);

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity > 0) {
      setCartItems(cartItems.map((item) => item.id === id ? { ...item, quantity: newQuantity } : item));
    }
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const applyCoupon = () => {
    if (couponCode.toUpperCase() === 'WELCOME10') {
      setCouponDiscount(subtotal * 0.1);
    } else {
      setCouponDiscount(0);
      alert('Invalid coupon code');
    }
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 100 ? 0 : 10;
  const tax = (subtotal - couponDiscount + shipping) * 0.1;
  const total = subtotal - couponDiscount + shipping + tax;

  return (
    <>
      <Header />
      <main className="bg-[#F5EFE8] min-h-screen py-16">
        <div className="container mx-auto px-4">
          <motion.div className="mb-8" initial="hidden" animate="visible" variants={fadeInUp}>
            <h1 className="text-4xl md:text-5xl font-bold text-[#5C4A47] mb-2">Shopping Cart</h1>
            <p className="text-[#B08A9E]">{cartItems.length} item(s) in your cart</p>
          </motion.div>

          {cartItems.length === 0 ? (
            <motion.div
              className="card-boutique text-center py-16"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <ShoppingBag size={64} className="mx-auto text-[#D4878E] mb-4 opacity-50" />
              <h2 className="text-2xl font-bold text-[#5C4A47] mb-4">Your cart is empty</h2>
              <p className="text-[#B08A9E] mb-6">Start shopping to add items to your cart</p>
              <Link href="/">
                <motion.button
                  className="btn-primary"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Continue Shopping
                </motion.button>
              </Link>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-4">
                {cartItems.map((item, i) => (
                  <motion.div
                    key={item.id}
                    className="card-boutique flex gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <motion.div
                      className="w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden"
                      whileHover={{ scale: 1.05 }}
                    >
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </motion.div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-[#5C4A47] mb-1">{item.name}</h3>
                      <p className="text-sm text-[#B08A9E] mb-2">
                        {item.color && `Color: ${item.color}`}
                        {item.size && ` \u2022 Size: ${item.size}`}
                      </p>
                      <p className="text-lg font-semibold text-[#D4878E]">${item.price.toFixed(2)}</p>
                      <div className="flex items-center gap-3 mt-3">
                        <motion.button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 hover:bg-[#F5EFE8] rounded transition-smooth"
                          whileTap={{ scale: 0.9 }}
                        >
                          <Minus size={16} className="text-[#5C4A47]" />
                        </motion.button>
                        <span className="w-8 text-center font-semibold text-[#5C4A47]">{item.quantity}</span>
                        <motion.button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 hover:bg-[#F5EFE8] rounded transition-smooth"
                          whileTap={{ scale: 0.9 }}
                        >
                          <Plus size={16} className="text-[#5C4A47]" />
                        </motion.button>
                        <motion.button
                          onClick={() => removeItem(item.id)}
                          className="ml-auto p-2 hover:bg-red-50 rounded transition-smooth text-red-500"
                          whileTap={{ scale: 0.9 }}
                        >
                          <Trash2 size={18} />
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div
                className="lg:col-span-1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="card-boutique sticky top-4 space-y-6">
                  <h2 className="text-2xl font-bold text-[#5C4A47]">Order Summary</h2>

                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-[#5C4A47]">Coupon Code</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        placeholder="Enter code"
                        className="input-boutique flex-1"
                      />
                      <motion.button
                        onClick={applyCoupon}
                        className="btn-secondary px-4"
                        whileTap={{ scale: 0.95 }}
                      >
                        Apply
                      </motion.button>
                    </div>
                    <p className="text-xs text-[#B08A9E] mt-1">Try: WELCOME10</p>
                  </div>

                  <div className="space-y-3 pb-6 border-b border-[#C9AFAE]/30">
                    <div className="flex justify-between text-sm">
                      <span className="text-[#5C4A47]">Subtotal</span>
                      <span className="font-semibold text-[#5C4A47]">${subtotal.toFixed(2)}</span>
                    </div>
                    {couponDiscount > 0 && (
                      <div className="flex justify-between text-sm">
                        <span className="text-[#D4878E]">Discount</span>
                        <span className="font-semibold text-[#D4878E]">-${couponDiscount.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-sm">
                      <span className="text-[#5C4A47]">Shipping</span>
                      <span className="font-semibold text-[#5C4A47]">{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-[#5C4A47]">Tax (10%)</span>
                      <span className="font-semibold text-[#5C4A47]">${tax.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center pt-4 border-t border-[#C9AFAE]/30">
                      <span className="text-lg font-bold text-[#5C4A47]">Total</span>
                      <span className="text-2xl font-bold text-[#D4878E]">${total.toFixed(2)}</span>
                    </div>

                    <Link href="/checkout">
                      <motion.button
                        className="btn-primary w-full text-center block py-2.5 text-sm"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Proceed to Checkout <ArrowRight size={16} className="inline" />
                      </motion.button>
                    </Link>
                    <Link href="/">
                      <motion.button
                        className="btn-secondary w-full text-center block py-2.5 text-sm"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Continue Shopping
                      </motion.button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
