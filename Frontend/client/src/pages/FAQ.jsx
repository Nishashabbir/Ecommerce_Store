import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  HelpCircle,
  Package,
  CreditCard,
  Truck,
  RotateCcw,
  MessageCircle,
} from "lucide-react";
import { motion } from "framer-motion";

const faqData = [
  {
    category: "Orders & Shipping",
    icon: Package,
    items: [
      {
        q: "How long does shipping take?",
        a: "Standard shipping takes 5-7 business days within the US. Express shipping is available for 2-3 business days. International shipping typically takes 10-14 business days depending on the destination.",
      },
      {
        q: "Do you ship internationally?",
        a: "Yes! We ship to over 40 countries worldwide. Shipping rates and delivery times vary by location. You can see the exact shipping cost at checkout before placing your order.",
      },
      {
        q: "Can I track my order?",
        a: "Absolutely! Once your order ships, you will receive a confirmation email with a tracking number. You can use this number on our website or the carrier's site to track your package in real time.",
      },
      {
        q: "What is your shipping cost?",
        a: "Shipping is free on orders over $100. For orders under $100, standard shipping is $10 within the US. International shipping rates are calculated at checkout based on your location.",
      },
    ],
  },
  {
    category: "Returns & Exchanges",
    icon: RotateCcw,
    items: [
      {
        q: "What is your return policy?",
        a: "We accept returns within 30 days of delivery. Items must be unused and in their original condition. Custom and personalized items are non-returnable unless defective.",
      },
      {
        q: "How do I start a return?",
        a: "Simply email us at returns@artisancrochet.com with your order number and reason for return. We will provide a prepaid return label and guide you through the process.",
      },
      {
        q: "How long do refunds take?",
        a: "Once we receive and inspect your return, refunds are processed within 5-7 business days. The refund will be issued to your original payment method.",
      },
    ],
  },
  {
    category: "Products & Materials",
    icon: HelpCircle,
    items: [
      {
        q: "What materials do you use?",
        a: "We use premium quality yarns including cotton, wool, bamboo, and eco-friendly blends. All materials are carefully selected for durability, softness, and sustainability.",
      },
      {
        q: "Are your products handmade?",
        a: "Yes! Every item in our collection is carefully handcrafted by skilled artisans. This means each piece is unique and may have slight variations that add to its character.",
      },
      {
        q: "How do I care for my crochet items?",
        a: "Most of our items can be hand-washed in cold water and laid flat to dry. Specific care instructions are included with each product. We recommend gentle handling to preserve the quality.",
      },
    ],
  },
  {
    category: "Payment & Pricing",
    icon: CreditCard,
    items: [
      {
        q: "What payment methods do you accept?",
        a: "We accept Visa, Mastercard, American Express, Discover, PayPal, and Bank Transfers. All payments are processed securely through encrypted connections.",
      },
      {
        q: "Do you offer discounts or promo codes?",
        a: "Yes! Sign up for our newsletter to receive 10% off your first order. We also run seasonal sales and special promotions throughout the year.",
      },
      {
        q: "Is my payment information secure?",
        a: "Absolutely. We use industry-standard SSL encryption to protect your personal and payment information. We never store your full credit card details on our servers.",
      },
    ],
  },
  {
    category: "Customer Support",
    icon: MessageCircle,
    items: [
      {
        q: "How can I contact customer support?",
        a: "You can reach us via email at hello@artisancrochet.com, phone at +1 (555) 123-4567, or through our contact form. We aim to respond within 24 hours during business days.",
      },
      {
        q: "Do you take custom orders?",
        a: "Yes, we love creating custom pieces! Contact us with your ideas, and our artisans will work with you to create a unique item tailored to your preferences.",
      },
      {
        q: "What is your quality guarantee?",
        a: "We stand behind the quality of every piece we create. If you are not completely satisfied with your purchase, we will make it right with a replacement or full refund.",
      },
    ],
  },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6 },
  }),
};

export default function FAQ() {
  return (
    <>
      <main className="bg-[#F5EFE8]">
        <section className="py-20 md:py-28">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <motion.div
                className="text-center mb-12"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: { staggerChildren: 0.15 },
                  },
                }}
              >
                <motion.span
                  variants={fadeInUp}
                  className="text-[#D4878E] tracking-[0.2em] uppercase text-sm font-semibold"
                >
                  FAQ
                </motion.span>
                <motion.h2
                  variants={fadeInUp}
                  className="text-4xl md:text-5xl font-bold text-[#5C4A47] mt-3 mb-4"
                >
                  Frequently Asked Questions
                </motion.h2>
                <motion.p
                  variants={fadeInUp}
                  className="text-lg text-[#B08A9E]"
                >
                  Everything you need to know about our products, shipping, and
                  more
                </motion.p>
              </motion.div>

              <div className="space-y-8">
                {faqData.map((section, si) => (
                  <motion.div
                    key={si}
                    className="card-boutique"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: si * 0.1 }}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-[#D4878E]/10 rounded-lg flex items-center justify-center">
                        <section.icon className="text-[#D4878E]" size={20} />
                      </div>
                      <h3 className="text-xl font-bold text-[#5C4A47]">
                        {section.category}
                      </h3>
                    </div>
                    <Accordion type="single" collapsible className="w-full">
                      {section.items.map((item, ii) => (
                        <AccordionItem key={ii} value={`${si}-${ii}`}>
                          <AccordionTrigger className="text-[#5C4A47] font-medium text-base hover:text-[#D4878E] transition-colors">
                            {item.q}
                          </AccordionTrigger>
                          <AccordionContent className="text-[#B08A9E] leading-relaxed">
                            {item.a}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
