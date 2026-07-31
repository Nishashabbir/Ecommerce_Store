import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, Heart } from 'lucide-react';
import { Link } from 'wouter';
import { motion } from 'framer-motion';

const stagger = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5 },
  }),
};

export default function Footer() {
  return (
    <footer className="bg-[#5C4A47] text-[#FDF9F5] mt-20">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
          <motion.div custom={0} variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <div className="flex items-center gap-2 mb-4">
              <svg width="28" height="28" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="18" cy="18" r="17" stroke="#D4878E" strokeWidth="1.5" fill="none"/>
                <path d="M18 8C14 8 11 11 11 15C11 19 14 22 18 22C22 22 25 19 25 15C25 11 22 8 18 8Z" stroke="#D4878E" strokeWidth="1.2" fill="none"/>
                <path d="M14 16C14 16 16 20 18 20C20 20 22 16 22 16" stroke="#D4878E" strokeWidth="1.2" strokeLinecap="round"/>
                <circle cx="15" cy="13" r="1" fill="#D4878E"/>
                <circle cx="21" cy="13" r="1" fill="#D4878E"/>
              </svg>
              <h3 className="font-bold text-lg text-[#D4878E]">Artisan Crochet</h3>
            </div>
            <p className="text-sm text-[#C9AFAE] leading-relaxed">
              Handcrafted with love, one stitch at a time. Every piece tells a story of dedication, artistry, and the timeless beauty of handmade craftsmanship.
            </p>
          </motion.div>

          <motion.div custom={1} variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h4 className="font-semibold text-sm uppercase tracking-widest mb-5 text-[#D4878E]">Quick Links</h4>
            <ul className="space-y-3 text-sm">
              {[
                { href: '/about', label: 'About Us' },
                { href: '/cart', label: 'Shop Collection' },
                { href: '/contact', label: 'Get in Touch' },
                { href: '/faq', label: 'Help Center' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>
                    <div className="text-[#C9AFAE] hover:text-[#D4878E] transition-colors duration-300 cursor-pointer">
                      {link.label}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div custom={2} variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h4 className="font-semibold text-sm uppercase tracking-widest mb-5 text-[#D4878E]">Contact</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-[#D4878E] flex-shrink-0" />
                <span className="text-[#C9AFAE]">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-[#D4878E] flex-shrink-0" />
                <span className="text-[#C9AFAE]">hello@artisancrochet.com</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-[#D4878E] flex-shrink-0 mt-1" />
                <span className="text-[#C9AFAE]">123 Craft Lane, Artisan City</span>
              </li>
            </ul>
          </motion.div>

          <motion.div custom={3} variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h4 className="font-semibold text-sm uppercase tracking-widest mb-5 text-[#D4878E]">Follow Us</h4>
            <div className="flex gap-3 mb-6">
              {[
                { icon: Facebook, label: 'Facebook' },
                { icon: Instagram, label: 'Instagram' },
                { icon: Twitter, label: 'Twitter' },
              ].map(({ icon: Icon, label }) => (
                <motion.a
                  key={label}
                  href="#"
                  className="w-10 h-10 rounded-full bg-[#C9AFAE]/20 flex items-center justify-center text-[#C9AFAE] hover:bg-[#D4878E] hover:text-[#FDF9F5] transition-all duration-300"
                  aria-label={label}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon size={18} />
                </motion.a>
              ))}
            </div>
            <p className="text-xs text-[#C9AFAE] leading-relaxed">
              Join our community of handmade lovers. Follow us for behind-the-scenes content and new arrivals.
            </p>
          </motion.div>
        </div>

        <motion.div
          className="border-t border-[#C9AFAE]/20 pt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-[#C9AFAE]">
              &copy; 2026 Artisan Crochet. All rights reserved.
            </p>
            <p className="text-sm text-[#C9AFAE] flex items-center gap-1">
              Made with <Heart size={14} className="text-[#D4878E]" /> by skilled artisans
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
