'use client';

import { useState, useEffect } from 'react';
import { ShoppingBag, Menu, X, Search } from 'lucide-react';
import { useStore } from '@/store/use-store';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { label: 'Home', page: 'home' as const },
  { label: 'Shop', page: 'shop' as const },
  { label: 'Contact', page: 'contact' as const },
];

export function Navbar() {
  const { currentPage, setCurrentPage, getCartCount, setSelectedProductId } = useStore();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const cartCount = useStore((s) => s.cart.reduce((c, i) => c + i.quantity, 0));

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNav = (page: string) => {
    setCurrentPage(page as 'home' | 'shop' | 'contact');
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCartClick = () => {
    setCurrentPage('cart');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-black/95 backdrop-blur-md shadow-lg shadow-black/20'
          : 'bg-transparent'
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 sm:h-20 items-center justify-between">
          {/* Mobile menu */}
          <div className="flex lg:hidden">
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80 bg-black border-neutral-800 p-0">
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between p-6 border-b border-neutral-800">
                    <span className="text-xl font-bold tracking-[0.3em] text-white">TENUE STYLE</span>
                    <Button variant="ghost" size="icon" onClick={() => setMobileOpen(false)} className="text-white hover:bg-white/10">
                      <X className="h-5 w-5" />
                    </Button>
                  </div>
                  <nav className="flex-1 p-6">
                    {navLinks.map((link) => (
                      <button
                        key={link.page}
                        onClick={() => handleNav(link.page)}
                        className={cn(
                          'block w-full text-left py-4 text-lg tracking-wider transition-colors border-b border-neutral-800/50',
                          currentPage === link.page
                            ? 'text-white font-medium'
                            : 'text-neutral-400 hover:text-white'
                        )}
                      >
                        {link.label.toUpperCase()}
                      </button>
                    ))}
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Desktop nav left */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.page}
                onClick={() => handleNav(link.page)}
                className={cn(
                  'text-sm tracking-[0.15em] uppercase transition-all duration-200 relative py-1',
                  currentPage === link.page
                    ? 'text-white font-medium'
                    : 'text-neutral-400 hover:text-white'
                )}
              >
                {link.label}
                {currentPage === link.page && (
                  <motion.div
                    layoutId="nav-underline"
                    className="absolute -bottom-0.5 left-0 right-0 h-[1.5px] bg-white"
                    transition={{ duration: 0.3 }}
                  />
                )}
              </button>
            ))}
          </nav>

          {/* Logo center */}
          <button
            onClick={() => handleNav('home')}
            className="absolute left-1/2 -translate-x-1/2 tracking-[0.2em] sm:tracking-[0.3em] text-white font-bold text-sm sm:text-lg lg:text-xl"
          >
            TENUE STYLE
          </button>

          {/* Right icons */}
          <div className="flex items-center gap-2 sm:gap-3 ml-auto">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleNav('shop')}
              className="text-white hover:bg-white/10 hidden sm:flex"
            >
              <Search className="h-[18px] w-[18px]" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleCartClick}
              className="text-white hover:bg-white/10 relative"
            >
              <ShoppingBag className="h-[18px] w-[18px]" />
              <AnimatePresence>
                {cartCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-red-600 text-[10px] font-bold text-white flex items-center justify-center"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </Button>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
