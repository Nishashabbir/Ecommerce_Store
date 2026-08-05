import { useEffect, useState } from "react";
import { useParams } from "wouter";
import { Link } from "wouter";
import { CheckCircle, Package, Truck, MapPin, CreditCard } from "lucide-react";
import { motion } from "framer-motion";
import { getOrder } from "../../../src/api";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.5 },
  }),
};

const ORDER_STATUS_INDEX = {
  pending: 0,
  processing: 1,
  shipped: 2,
  delivered: 3,
  cancelled: 0,
};

function formatPrice(value) {
  return `$${Number(value || 0).toFixed(2)}`;
}

export default function OrderConfirmation() {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    getOrder(orderId)
      .then(({ response, data }) => {
        if (!cancelled && response.ok && data.success) setOrder(data.order);
      })
      .catch(() => {})
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [orderId]);

  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + 7);

  const items = order?.items || [];
  const subtotal = order?.subtotal ?? 0;
  const shipping = order?.shippingFee ?? 0;
  const tax = order?.tax ?? 0;
  const total = order?.total ?? 0;
  const status = order?.status || "pending";
  const activeStatus = ORDER_STATUS_INDEX[status] ?? 0;
  const shippingAddress = order?.shippingAddress || {};
  const customer = order?.customer || {};

  const statusSteps = [
    {
      icon: CheckCircle,
      title: "Order Confirmed",
      desc: "Your order has been received",
    },
    {
      icon: Package,
      title: "Processing",
      desc: "Your items are being prepared",
    },
    {
      icon: Truck,
      title: "Shipped",
      desc: `Estimated delivery: ${deliveryDate.toLocaleDateString()}`,
    },
    {
      icon: MapPin,
      title: "Delivered",
      desc: "Track your package",
    },
  ];

  return (
    <>
      <main className="bg-[#F5EFE8] min-h-screen py-16">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
          >
            <div className="flex justify-center mb-6">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
              >
                <CheckCircle size={80} className="text-[#D4878E]" />
              </motion.div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-[#5C4A47] mb-4">
              Thank You for Your Order!
            </h1>
            <p className="text-xl text-[#B08A9E] mb-2">
              Your handmade crochet items are being carefully prepared
            </p>
            <p className="text-[#B08A9E]">
              Order:{" "}
              <span className="font-semibold">
                {order?.orderNumber || orderId}
              </span>
            </p>
            {loading && (
              <p className="mt-4 text-[#B08A9E]">Loading order details...</p>
            )}
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <motion.div
                className="card-boutique"
                custom={1}
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <h2 className="text-2xl font-bold text-[#5C4A47] mb-6">
                  Order Status
                </h2>
                <div className="space-y-6">
                  {statusSteps.map((step, index) => (
                    <motion.div
                      key={index}
                      className="flex gap-4"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 * index }}
                    >
                      <div className="flex flex-col items-center">
                        <div
                          className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                            index <= activeStatus
                              ? "bg-[#D4878E] text-[#FDF9F5]"
                              : "bg-[#C9AFAE] text-[#5C4A47]"
                          }`}
                        >
                          <step.icon size={24} />
                        </div>
                        {index < 3 && (
                          <div
                            className={`w-1 h-8 mt-2 transition-all duration-300 ${index < activeStatus ? "bg-[#D4878E]" : "bg-[#C9AFAE]"}`}
                          />
                        )}
                      </div>
                      <div className="pt-2">
                        <h3 className="font-bold text-[#5C4A47]">
                          {step.title}
                        </h3>
                        <p className="text-sm text-[#B08A9E]">{step.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                className="card-boutique"
                custom={2}
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <h2 className="text-2xl font-bold text-[#5C4A47] mb-6">
                  Order Details
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm text-[#B08A9E] mb-1">Order</p>
                    <p className="text-lg font-bold text-[#5C4A47]">
                      {order?.orderNumber || orderId}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-[#B08A9E] mb-1">
                      Estimated Delivery
                    </p>
                    <p className="text-lg font-bold text-[#5C4A47]">
                      {deliveryDate.toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="card-boutique"
                custom={3}
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <h3 className="text-xl font-bold text-[#5C4A47] mb-4">
                  Shipping Address
                </h3>
                <p className="text-sm text-[#5C4A47] leading-relaxed">
                  {shippingAddress.fullName || customer.name}
                  <br />
                  {shippingAddress.street}
                  <br />
                  {shippingAddress.city}, {shippingAddress.state}{" "}
                  {shippingAddress.postal}
                  <br />
                  {shippingAddress.country}
                </p>
              </motion.div>

              <motion.div
                className="card-boutique"
                custom={4}
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <h3 className="text-xl font-bold text-[#5C4A47] mb-4">
                  Ordered Products
                </h3>
                {items.length === 0 ? (
                  <p className="text-sm text-[#B08A9E]">
                    {loading
                      ? "Loading your items..."
                      : "No items were recorded for this order."}
                  </p>
                ) : (
                  <div className="space-y-4">
                    {items.map((item, index) => (
                      <motion.div
                        key={`${item.slug || item.name}-${index}`}
                        className="flex gap-4 pb-4 border-b border-[#C9AFAE]/30 last:border-0 last:pb-0"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                      >
                        {item.image && (
                          <motion.img
                            src={item.image}
                            alt={item.name}
                            className="w-16 h-16 object-cover rounded-lg"
                            whileHover={{ scale: 1.1 }}
                          />
                        )}
                        <div className="flex-1">
                          <h4 className="font-semibold text-[#5C4A47]">
                            {item.name}
                          </h4>
                          <p className="text-sm text-[#B08A9E]">
                            Quantity: {item.quantity}
                          </p>
                          <p className="font-bold text-[#D4878E]">
                            {formatPrice(item.price * (item.quantity || 1))}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>
            </div>

            <div className="lg:col-span-1 space-y-6">
              <motion.div
                className="card-boutique sticky top-4 overflow-hidden"
                custom={5}
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <div className="bg-gradient-to-r from-[#D4878E]/10 to-[#B08A9E]/10 -mx-6 -mt-6 px-6 pt-6 pb-4 mb-6 border-b border-[#C9AFAE]/20">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#D4878E]/20 flex items-center justify-center">
                      <CreditCard size={20} className="text-[#D4878E]" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-[#5C4A47]">
                        Payment Summary
                      </h3>
                      <p className="text-xs text-[#B08A9E]">
                        Order total breakdown
                      </p>
                    </div>
                  </div>
                </div>
                <div className="space-y-3 mb-6 pb-6 border-b border-[#C9AFAE]/30">
                  <div className="flex justify-between text-sm">
                    <span className="text-[#5C4A47]">Subtotal</span>
                    <span className="font-semibold text-[#5C4A47]">
                      {formatPrice(subtotal)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#5C4A47]">Shipping</span>
                    <span className="font-semibold text-[#5C4A47]">
                      {shipping === 0 ? "FREE" : formatPrice(shipping)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#5C4A47]">Tax (10%)</span>
                    <span className="font-semibold text-[#5C4A47]">
                      {formatPrice(tax)}
                    </span>
                  </div>
                </div>
                <div className="mb-6">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-[#5C4A47] text-lg">
                      Total
                    </span>
                    <span className="text-2xl font-bold text-[#D4878E]">
                      {formatPrice(total)}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link href="/shop" className="flex-1">
                    <motion.button
                      className="btn-primary w-full text-center block"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Continue Shopping
                    </motion.button>
                  </Link>
                  <Link href="/" className="flex-1">
                    <motion.button
                      className="btn-secondary w-full text-center block"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Back to home
                    </motion.button>
                  </Link>
                </div>
              </motion.div>

              <motion.div
                className="card-boutique"
                custom={6}
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <h3 className="font-bold text-[#5C4A47] mb-3">Need Help?</h3>
                <p className="text-sm text-[#B08A9E] mb-4">
                  A confirmation email has been sent to your email address. You
                  can track your order status anytime.
                </p>
                <Link href="/contact">
                  <button className="btn-outline w-full text-sm">
                    Contact Support
                  </button>
                </Link>
              </motion.div>
            </div>
          </div>

          <motion.div
            className="mt-12 card-boutique text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <p className="text-[#B08A9E] mb-4">
              Thank you for supporting handmade artisan craftsmanship!
            </p>
            <p className="text-sm text-[#B08A9E]">
              Each stitch is made with love and care by our skilled artisans.
            </p>
          </motion.div>
        </div>
      </main>
    </>
  );
}
