import { useState } from "react";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";
import { motion } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6 },
  }),
};

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = e => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    alert(
      "Thank you for your message! We will get back to you within 24 hours."
    );
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <>
      <main className="bg-[#F5EFE8]">
        <section className="py-20 md:py-28">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <motion.div
                className="card-boutique"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl font-bold text-[#5C4A47] mb-6">
                  Send Us a Message
                </h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-sm font-semibold text-[#5C4A47] mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Your name"
                      className="input-boutique w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#5C4A47] mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="your@email.com"
                      className="input-boutique w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#5C4A47] mb-1">
                      Subject
                    </label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="input-boutique w-full"
                    >
                      <option value="">Select a subject</option>
                      <option value="general">General Inquiry</option>
                      <option value="order">Order Question</option>
                      <option value="custom">Custom Order</option>
                      <option value="wholesale">Wholesale</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#5C4A47] mb-1">
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      placeholder="Tell us what's on your mind..."
                      className="input-boutique w-full resize-none"
                    />
                  </div>
                  <div className="pt-4 flex justify-end">
                    <motion.button
                      type="submit"
                      className="btn-primary inline-flex items-center gap-2 px-8 py-3"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <Send size={18} />
                      Send Message
                    </motion.button>
                  </div>
                </form>
              </motion.div>

              <div className="space-y-6">
                <motion.div
                  className="card-boutique"
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <h2 className="text-3xl font-bold text-[#5C4A47] mb-6">
                    Get in Touch
                  </h2>
                  <div className="space-y-6">
                    {[
                      {
                        icon: Mail,
                        title: "Email",
                        details: [
                          "hello@artisancrochet.com",
                          "support@artisancrochet.com",
                        ],
                      },
                      {
                        icon: Phone,
                        title: "Phone",
                        details: ["+1 (555) 123-4567", "+1 (555) 987-6543"],
                      },
                      {
                        icon: MapPin,
                        title: "Address",
                        details: [
                          "123 Craft Lane, Suite 100",
                          "Artisan City, AC 12345",
                        ],
                      },
                      {
                        icon: Clock,
                        title: "Business Hours",
                        details: [
                          "Mon-Fri: 9:00 AM - 6:00 PM",
                          "Sat: 10:00 AM - 4:00 PM",
                          "Sunday: Closed",
                        ],
                      },
                    ].map((item, i) => (
                      <motion.div
                        key={item.title}
                        className="flex items-start gap-4"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                      >
                        <div className="w-12 h-12 bg-[#D4878E]/10 rounded-full flex items-center justify-center flex-shrink-0">
                          <item.icon className="text-[#D4878E]" size={22} />
                        </div>
                        <div>
                          <h3 className="font-semibold text-[#5C4A47] mb-1">
                            {item.title}
                          </h3>
                          {item.details.map((d, j) => (
                            <p key={j} className="text-[#B08A9E]">
                              {d}
                            </p>
                          ))}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
