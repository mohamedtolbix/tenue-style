'use client';

import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useStore } from '@/store/use-store';
import { Navbar } from '@/components/tenue/Navbar';
import { Footer } from '@/components/tenue/Footer';
import { WhatsAppButton } from '@/components/tenue/WhatsAppButton';
import { HomePage } from '@/components/tenue/HomePage';
import { ShopPage } from '@/components/tenue/ShopPage';
import { ProductPage } from '@/components/tenue/ProductPage';
import { CartPage } from '@/components/tenue/CartPage';
import { ContactPage } from '@/components/tenue/ContactPage';

export default function TenueStyleApp() {
  const { currentPage } = useStore();

  useEffect(() => {
    // Update document title based on current page
    const titles: Record<string, string> = {
      home: 'Tenue Style — Style That Defines You',
      shop: 'Shop — Tenue Style',
      product: 'Product — Tenue Style',
      cart: 'Cart — Tenue Style',
      contact: 'Contact — Tenue Style',
    };
    document.title = titles[currentPage] || titles.home;
  }, [currentPage]);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'shop':
        return <ShopPage />;
      case 'product':
        return <ProductPage />;
      case 'cart':
        return <CartPage />;
      case 'contact':
        return <ContactPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-black">
      <Navbar />
      <AnimatePresence mode="wait">
        <motion.main
          key={currentPage}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3 }}
          className="flex-1"
        >
          {renderPage()}
        </motion.main>
      </AnimatePresence>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
