'use client';

import { Instagram, Facebook, Send } from 'lucide-react';
import { useStore } from '@/store/use-store';

const footerLinks = {
  shop: [
    { label: 'T-Shirts', page: 'shop' as const, cat: 'tshirts' },
    { label: 'Hoodies', page: 'shop' as const, cat: 'hoodies' },
    { label: 'Jeans', page: 'shop' as const, cat: 'jeans' },
    { label: 'Shoes', page: 'shop' as const, cat: 'shoes' },
  ],
  info: [
    { label: 'About Us', page: 'contact' as const },
    { label: 'Contact', page: 'contact' as const },
    { label: 'Shipping & Returns', page: 'contact' as const },
    { label: 'FAQ', page: 'contact' as const },
  ],
};

export function Footer() {
  const { setCurrentPage, setFilter, setSelectedProductId } = useStore();

  const handleLink = (page: string, category?: string) => {
    setCurrentPage(page as 'home' | 'shop' | 'contact');
    if (page === 'shop' && category) {
      setFilter('category', category as 'tshirts' | 'hoodies' | 'jeans' | 'shoes');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-black border-t border-neutral-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main footer */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 py-12 lg:py-16">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <h3 className="text-xl font-bold tracking-[0.2em] text-white mb-3">TENUE STYLE</h3>
            <p className="text-neutral-400 text-sm leading-relaxed mb-6">
              Style That Defines You. Premium streetwear crafted for those who dare to stand out.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-neutral-700 flex items-center justify-center text-neutral-400 hover:text-white hover:border-white transition-colors"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-neutral-700 flex items-center justify-center text-neutral-400 hover:text-white hover:border-white transition-colors"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-neutral-700 flex items-center justify-center text-neutral-400 hover:text-white hover:border-white transition-colors"
              >
                <Send className="h-4 w-4 rotate-[-30deg]" />
              </a>
            </div>
          </div>

          {/* Shop links */}
          <div>
            <h4 className="text-xs font-semibold tracking-[0.2em] text-white uppercase mb-5">Shop</h4>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => handleLink(link.page, link.cat)}
                    className="text-sm text-neutral-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Info links */}
          <div>
            <h4 className="text-xs font-semibold tracking-[0.2em] text-white uppercase mb-5">Info</h4>
            <ul className="space-y-3">
              {footerLinks.info.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => handleLink(link.page)}
                    className="text-sm text-neutral-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-semibold tracking-[0.2em] text-white uppercase mb-5">Contact</h4>
            <ul className="space-y-3 text-sm text-neutral-400">
              <li>Casablanca, Morocco</li>
              <li>contact@tenuestyle.ma</li>
              <li>+212 600 000 000</li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-neutral-800 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-neutral-500">
            &copy; {new Date().getFullYear()} Tenue Style. All rights reserved.
          </p>
          <p className="text-xs text-neutral-600">
            Premium Streetwear — Made with passion
          </p>
        </div>
      </div>
    </footer>
  );
}
