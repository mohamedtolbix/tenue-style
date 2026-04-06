'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useStore } from '@/store/use-store';
import { products, categories } from '@/data/products';
import { ProductCard } from './ProductPage';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: 'easeOut' },
  }),
};

export function HomePage() {
  const { setCurrentPage, setSelectedProductId, setFilter } = useStore();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const featuredProducts = products.slice(0, 4);

  const handleShopNow = () => {
    setCurrentPage('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCategoryClick = (catId: string) => {
    setFilter('category', catId as 'tshirts' | 'hoodies' | 'jeans' | 'shoes');
    setCurrentPage('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen min-h-[600px] max-h-[900px] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/hero/hero-1.png"
            alt="Tenue Style - Premium Streetwear"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />
        </div>
        <div className="relative h-full flex items-center">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
            <div className="max-w-xl">
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-xs sm:text-sm tracking-[0.3em] text-neutral-300 uppercase mb-4"
              >
                New Collection 2025
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.1] mb-4"
              >
                Tenue Style
                <span className="block text-xl sm:text-2xl lg:text-3xl font-light text-neutral-300 mt-2 tracking-wide">
                  Discover Real Fashion
                </span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="text-neutral-400 text-sm sm:text-base mb-8 max-w-md leading-relaxed"
              >
                Premium streetwear crafted for those who dare to stand out. Elevate your style with our curated collection.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="flex items-center gap-4"
              >
                <Button
                  onClick={handleShopNow}
                  className="bg-white text-black hover:bg-neutral-200 px-8 py-6 text-sm tracking-[0.15em] uppercase rounded-none h-auto font-medium transition-all duration-300 group"
                >
                  Shop Now
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
                <Button
                  variant="outline"
                  onClick={handleShopNow}
                  className="border-white/30 text-white hover:bg-white/10 px-8 py-6 text-sm tracking-[0.15em] uppercase rounded-none h-auto font-medium"
                >
                  Explore
                </Button>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] tracking-[0.3em] text-neutral-500 uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-[1px] h-8 bg-gradient-to-b from-neutral-500 to-transparent"
          />
        </motion.div>
      </section>

      {/* Categories Section */}
      <section className="py-16 sm:py-24 bg-neutral-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="text-center mb-12"
          >
            <motion.p variants={fadeUp} custom={0} className="text-xs tracking-[0.3em] text-neutral-500 uppercase mb-3">
              Categories
            </motion.p>
            <motion.h2 variants={fadeUp} custom={1} className="text-3xl sm:text-4xl font-bold text-white">
              Shop by Category
            </motion.h2>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {categories.map((cat, i) => (
              <motion.button
                key={cat.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                variants={fadeUp}
                onClick={() => handleCategoryClick(cat.id)}
                className="group relative aspect-[3/4] overflow-hidden cursor-pointer"
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-300" />
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <h3 className="text-lg sm:text-xl font-bold text-white tracking-wider uppercase">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-neutral-300 mt-1 hidden sm:block">{cat.description}</p>
                  <span className="mt-3 flex items-center text-xs text-white tracking-wider uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Shop Now <ChevronRight className="ml-1 h-3 w-3" />
                  </span>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 sm:py-24 bg-black">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="flex items-end justify-between mb-12"
          >
            <div>
              <motion.p variants={fadeUp} custom={0} className="text-xs tracking-[0.3em] text-neutral-500 uppercase mb-3">
                Curated Selection
              </motion.p>
              <motion.h2 variants={fadeUp} custom={1} className="text-3xl sm:text-4xl font-bold text-white">
                Featured Products
              </motion.h2>
            </div>
            <motion.div variants={fadeUp} custom={2}>
              <Button
                variant="ghost"
                onClick={handleShopNow}
                className="text-neutral-400 hover:text-white text-sm tracking-wider uppercase group"
              >
                View All
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </motion.div>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {featuredProducts.map((product, i) => (
              <motion.div
                key={product.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                variants={fadeUp}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Statement */}
      <section className="py-16 sm:py-24 bg-neutral-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="text-center max-w-3xl mx-auto"
          >
            <motion.p variants={fadeUp} custom={0} className="text-xs tracking-[0.3em] text-neutral-500 uppercase mb-6">
              Our Philosophy
            </motion.p>
            <motion.blockquote variants={fadeUp} custom={1} className="text-2xl sm:text-3xl lg:text-4xl font-light text-white leading-relaxed italic">
              &ldquo;Style is not about wearing the most expensive things. It&apos;s about wearing things that define who you are.&rdquo;
            </motion.blockquote>
            <motion.div variants={fadeUp} custom={2} className="mt-8 flex items-center justify-center gap-3">
              <div className="w-8 h-[1px] bg-neutral-700" />
              <span className="text-xs tracking-[0.3em] text-neutral-500 uppercase">Tenue Style</span>
              <div className="w-8 h-[1px] bg-neutral-700" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 sm:py-24 bg-black">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="relative overflow-hidden rounded-none border border-neutral-800 p-8 sm:p-16 text-center"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 to-black" />
            <div className="relative">
              <motion.p variants={fadeUp} custom={0} className="text-xs tracking-[0.3em] text-neutral-500 uppercase mb-3">
                Stay Connected
              </motion.p>
              <motion.h2 variants={fadeUp} custom={1} className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3">
                Join the Movement
              </motion.h2>
              <motion.p variants={fadeUp} custom={2} className="text-neutral-400 text-sm sm:text-base mb-8 max-w-md mx-auto">
                Subscribe to get exclusive access to new drops, special offers, and style inspiration.
              </motion.p>

              {subscribed ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-green-400 font-medium"
                >
                  Thank you for subscribing! Welcome to the Tenue Style family.
                </motion.div>
              ) : (
                <motion.form
                  variants={fadeUp}
                  custom={3}
                  onSubmit={handleNewsletter}
                  className="flex flex-col sm:flex-row items-center gap-3 max-w-md mx-auto"
                >
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="flex-1 bg-neutral-900 border-neutral-700 text-white placeholder:text-neutral-600 rounded-none h-11 focus-visible:ring-white/20"
                  />
                  <Button
                    type="submit"
                    className="bg-white text-black hover:bg-neutral-200 px-6 h-11 rounded-none text-sm tracking-wider uppercase font-medium w-full sm:w-auto"
                  >
                    Subscribe
                  </Button>
                </motion.form>
              )}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
