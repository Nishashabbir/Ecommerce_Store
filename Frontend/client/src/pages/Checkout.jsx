import { useState } from "react";
import { Link } from "wouter";
import { ChevronRight, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { products } from "../../../src/data/products";

const slideIn = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.3 } },
  exit: { opacity: 0, x: 20, transition: { duration: 0.2 } },
};

export default function Checkout() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    postal: "",
    country: "United States",
    paymentMethod: "card",
  });

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNextStep = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };
  const handlePreviousStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const selectedProductId = new URLSearchParams(window.location.search).get(
    "product"
  );
  const selectedQuantity = Math.max(
    1,
    Number.parseInt(
      new URLSearchParams(window.location.search).get("quantity") ?? "1",
      10
    ) || 1
  );
  const selectedProduct = products.find(product => product.id === selectedProductId);
  const cartItems = selectedProduct
    ? [
        {
          id: selectedProduct.id,
          name: selectedProduct.name,
          price: Number(selectedProduct.price.replace(/[^0-9.]/g, "")),
          quantity: selectedQuantity,
        },
      ]
    : [];

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = subtotal === 0 || subtotal > 100 ? 0 : 10;
  const tax = (subtotal + shipping) * 0.1;
  const total = subtotal + shipping + tax;

  return (
    <>
      <main className="bg-[#F5EFE8] min-h-screen py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-[#5C4A47] mb-8">
              Checkout
            </h1>

            <div className="flex items-center justify-between max-w-2xl">
              {[1, 2, 3].map(step => (
                <div key={step} className="flex items-center flex-1">
                  <motion.div
                    className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${
                      step <= currentStep
                        ? "bg-[#D4878E] text-[#FDF9F5]"
                        : "bg-[#C9AFAE] text-[#5C4A47]"
                    }`}
                    animate={{ scale: step === currentStep ? [1, 1.1, 1] : 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {step < currentStep ? <Check size={24} /> : step}
                  </motion.div>
                  {step < 3 && (
                    <div
                      className={`flex-1 h-1 mx-2 transition-colors duration-300 ${step < currentStep ? "bg-[#D4878E]" : "bg-[#C9AFAE]"}`}
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between text-sm text-[#B08A9E] mt-4 max-w-2xl px-6">
              <span>Shipping</span>
              <span>Payment</span>
              <span>Review</span>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <AnimatePresence mode="wait">
                {currentStep === 1 && (
                  <motion.div
                    key="step1"
                    {...slideIn}
                    className="card-boutique space-y-6"
                  >
                    <h2 className="text-2xl font-bold text-[#5C4A47]">
                      Shipping Address
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input
                        type="text"
                        name="fullName"
                        placeholder="Full Name"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        className="input-boutique"
                      />
                      <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="input-boutique"
                      />
                    </div>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Phone Number"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="input-boutique w-full"
                    />
                    <input
                      type="text"
                      name="street"
                      placeholder="Street Address"
                      value={formData.street}
                      onChange={handleInputChange}
                      className="input-boutique w-full"
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input
                        type="text"
                        name="city"
                        placeholder="City"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="input-boutique"
                      />
                      <input
                        type="text"
                        name="state"
                        placeholder="Province/State"
                        value={formData.state}
                        onChange={handleInputChange}
                        className="input-boutique"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input
                        type="text"
                        name="postal"
                        placeholder="Postal Code"
                        value={formData.postal}
                        onChange={handleInputChange}
                        className="input-boutique"
                      />
                      <select
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        className="input-boutique"
                      >
                        <option>United States</option>
                        <option>Canada</option>
                        <option>United Kingdom</option>
                        <option>Australia</option>
                      </select>
                    </div>
                  </motion.div>
                )}

                {currentStep === 2 && (
                  <motion.div
                    key="step2"
                    {...slideIn}
                    className="card-boutique space-y-6"
                  >
                    <h2 className="text-2xl font-bold text-[#5C4A47]">
                      Payment Method
                    </h2>
                    <div className="space-y-3">
                      {[
                        {
                          id: "card",
                          label: "Credit / Debit Card",
                          desc: "Visa, Mastercard, Amex",
                        },
                        {
                          id: "cod",
                          label: "Cash on Delivery",
                          desc: "Pay when you receive",
                        },
                        {
                          id: "bank",
                          label: "Bank Transfer",
                          desc: "Direct bank transfer",
                        },
                      ].map(method => (
                        <label
                          key={method.id}
                          className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all duration-300 ${
                            formData.paymentMethod === method.id
                              ? "border-[#D4878E] bg-[#D4878E]/5"
                              : "border-[#C9AFAE] hover:bg-[#F5EFE8]"
                          }`}
                        >
                          <input
                            type="radio"
                            name="paymentMethod"
                            value={method.id}
                            checked={formData.paymentMethod === method.id}
                            onChange={handleInputChange}
                            className="w-4 h-4 accent-[#D4878E]"
                          />
                          <div className="ml-4">
                            <p className="font-semibold text-[#5C4A47]">
                              {method.label}
                            </p>
                            <p className="text-sm text-[#B08A9E]">
                              {method.desc}
                            </p>
                          </div>
                        </label>
                      ))}
                    </div>
                    {formData.paymentMethod === "card" && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="space-y-4 pt-4 border-t border-[#C9AFAE]/30"
                      >
                        <input
                          type="text"
                          placeholder="Card Number"
                          className="input-boutique w-full"
                        />
                        <div className="grid grid-cols-2 gap-4">
                          <input
                            type="text"
                            placeholder="MM/YY"
                            className="input-boutique"
                          />
                          <input
                            type="text"
                            placeholder="CVC"
                            className="input-boutique"
                          />
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                )}

                {currentStep === 3 && (
                  <motion.div
                    key="step3"
                    {...slideIn}
                    className="card-boutique"
                  >
                    <h2 className="text-2xl font-bold text-[#5C4A47] mb-6">
                      Order Review
                    </h2>
                    <div className="space-y-4 pb-6 border-b border-[#C9AFAE]/30">
                      <h3 className="font-semibold text-[#5C4A47]">
                        Shipping To:
                      </h3>
                      <p className="text-[#5C4A47]">
                        {formData.fullName}
                        <br />
                        {formData.street}
                        <br />
                        {formData.city}, {formData.state} {formData.postal}
                        <br />
                        {formData.country}
                      </p>
                    </div>
                    <div className="space-y-4 pb-6 border-b border-[#C9AFAE]/30 mt-6">
                      <h3 className="font-semibold text-[#5C4A47]">
                        Payment Method:
                      </h3>
                      <p className="text-[#5C4A47] capitalize">
                        {formData.paymentMethod === "card"
                          ? "Credit/Debit Card"
                          : formData.paymentMethod === "cod"
                            ? "Cash on Delivery"
                            : "Bank Transfer"}
                      </p>
                    </div>
                    <div className="space-y-4 mt-6">
                      <h3 className="font-semibold text-[#5C4A47]">
                        Order Items:
                      </h3>
                      {cartItems.map((item, index) => (
                        <div
                          key={index}
                          className="flex justify-between text-sm"
                        >
                          <span className="text-[#5C4A47]">
                            {item.name} x {item.quantity}
                          </span>
                          <span className="font-semibold text-[#5C4A47]">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="flex flex-wrap justify-center gap-4 mt-10 px-2">
                {currentStep > 1 && (
                  <motion.button
                    onClick={handlePreviousStep}
                    className="btn-secondary min-w-[140px]"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    Back
                  </motion.button>
                )}
                {currentStep < 3 && (
                  <motion.button
                    onClick={handleNextStep}
                    className="btn-primary min-w-[140px] flex items-center justify-center gap-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Next <ChevronRight size={20} />
                  </motion.button>
                )}
                {currentStep === 3 && (
                  <Link
                    href={`/order-confirmation/12345?product=${encodeURIComponent(selectedProductId ?? "")}&quantity=${selectedQuantity}`}
                    className="inline-block"
                  >
                    <motion.button
                      className="btn-primary min-w-[140px]"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Place Order
                    </motion.button>
                  </Link>
                )}
              </div>
            </div>

            <motion.div
              className="lg:col-span-1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="card-boutique sticky top-4 space-y-6">
                <h3 className="text-xl font-bold text-[#5C4A47]">
                  Order Summary
                </h3>
                <div className="space-y-3 pb-6 border-b border-[#C9AFAE]/30">
                  {cartItems.map((item, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span className="text-[#5C4A47]">
                        {item.name} × {item.quantity}
                      </span>
                      <span className="font-semibold text-[#5C4A47]">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-[#5C4A47]">Subtotal</span>
                    <span className="font-semibold text-[#5C4A47]">
                      ${subtotal.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#5C4A47]">Shipping</span>
                    <span className="font-semibold text-[#5C4A47]">
                      {shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#5C4A47]">Tax</span>
                    <span className="font-semibold text-[#5C4A47]">
                      ${tax.toFixed(2)}
                    </span>
                  </div>
                </div>
                <div className="pt-6 border-t border-[#C9AFAE]/30">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-[#5C4A47]">Total</span>
                    <span className="text-2xl font-bold text-[#D4878E]">
                      ${total.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </>
  );
}
