import { Link, useRoute } from 'wouter';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/contexts/CartContext';

const navItems = [
  { href: '/about', label: 'About Us' },
  { href: '/contact', label: 'Contact' },
  { href: '/faq', label: 'FAQ' },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { items } = useCart();
  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#FDF9F5]/90 header-blur shadow-sm'
          : 'bg-[#FDF9F5]'
      }`}
    >
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/">
          <motion.div
            className="flex items-center gap-2 group cursor-pointer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="18" cy="18" r="17" stroke="#D4878E" strokeWidth="1.5" fill="#FDF9F5"/>
              <path d="M18 8C14 8 11 11 11 15C11 19 14 22 18 22C22 22 25 19 25 15C25 11 22 8 18 8Z" stroke="#D4878E" strokeWidth="1.2" fill="none"/>
              <path d="M14 16C14 16 16 20 18 20C20 20 22 16 22 16" stroke="#D4878E" strokeWidth="1.2" strokeLinecap="round"/>
              <path d="M11 18C11 18 9 20 9 22C9 24 11 26 13 26C15 26 17 24 17 22" stroke="#D4878E" strokeWidth="1.2" strokeLinecap="round"/>
              <path d="M25 18C25 18 27 20 27 22C27 24 25 26 23 26C21 26 19 24 19 22" stroke="#D4878E" strokeWidth="1.2" strokeLinecap="round"/>
              <circle cx="15" cy="13" r="1" fill="#D4878E"/>
              <circle cx="21" cy="13" r="1" fill="#D4878E"/>
            </svg>
            <span className="logo text-[#5C4A47] group-hover:text-[#D4878E] transition-colors duration-300">
              Artisan Crochet
            </span>
          </motion.div>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <NavLink key={item.href} href={item.href} label={item.label} />
          ))}
          <Link href="/cart">
            <motion.div
              className="relative p-2 text-[#5C4A47] hover:text-[#D4878E] transition-colors cursor-pointer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ShoppingBag size={22} />
              {cartCount > 0 && (
                <motion.span
                  key={cartCount}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 bg-[#D4878E] text-[#FDF9F5] text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
                >
                  {cartCount}
                </motion.span>
              )}
            </motion.div>
          </Link>
        </nav>

        <button
          className="md:hidden p-2 text-[#5C4A47] hover:text-[#D4878E] transition-colors"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#FDF9F5] border-t border-[#C9AFAE]/30 overflow-hidden"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href}>
                  <div
                    className="nav-label text-[#5C4A47] hover:text-[#D4878E] transition-colors block cursor-pointer"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </div>
                </Link>
              ))}
              <Link href="/cart">
                <div
                  className="nav-label text-[#5C4A47] hover:text-[#D4878E] transition-colors flex items-center gap-2 cursor-pointer"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <ShoppingBag size={20} />
                  Cart {cartCount > 0 && `(${cartCount})`}
                </div>
              </Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

function NavLink({ href, label }) {
  const [isActive] = useRoute(href);

  return (
    <Link href={href}>
      <div className="relative cursor-pointer group">
        <span
          className={`nav-label transition-colors duration-300 ${
            isActive ? 'text-[#D4878E]' : 'text-[#5C4A47] group-hover:text-[#D4878E]'
          }`}
        >
          {label}
        </span>
        <motion.div
          className="absolute -bottom-1 left-0 h-0.5 bg-[#D4878E] rounded-full"
          initial={false}
          animate={{ width: isActive ? '100%' : '0%' }}
          whileHover={{ width: '100%' }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </Link>
  );
}
