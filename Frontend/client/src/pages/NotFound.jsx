import { Link } from 'wouter';
import { AlertCircle, Home, ShoppingBag } from 'lucide-react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="bg-[#F5EFE8] min-h-screen flex items-center justify-center py-20">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-lg mx-auto card-boutique text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="flex justify-center mb-6"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
            >
              <AlertCircle className="h-16 w-16 text-[#D4878E]" />
            </motion.div>

            <h1 className="text-8xl font-bold text-[#5C4A47] mb-2">404</h1>
            <h2 className="text-2xl font-bold text-[#5C4A47] mb-4">Page Not Found</h2>
            <p className="text-[#B08A9E] mb-8 leading-relaxed">
              Sorry, the page you are looking for doesn't exist.
              <br />
              It may have been moved or deleted.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/">
                <motion.button
                  className="btn-primary inline-flex items-center gap-2 px-6 py-3"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Home className="w-4 h-4" />
                  Go Home
                </motion.button>
              </Link>
              <Link href="/cart">
                <motion.button
                  className="btn-secondary inline-flex items-center gap-2 px-6 py-3"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <ShoppingBag className="w-4 h-4" />
                  Browse Shop
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
}
