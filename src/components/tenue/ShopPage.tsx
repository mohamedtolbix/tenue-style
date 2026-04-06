'use client';

import { motion } from 'framer-motion';
import { ShoppingBag, SlidersHorizontal, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { useStore } from '@/store/use-store';
import { products } from '@/data/products';
import { ProductCard } from './ProductPage';
import { Category, FilterState, Size } from '@/types';
import { useState } from 'react';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';

const categoryOptions: { value: Category | 'all'; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'tshirts', label: 'T-Shirts' },
  { value: 'hoodies', label: 'Hoodies' },
  { value: 'jeans', label: 'Jeans' },
  { value: 'shoes', label: 'Shoes' },
];

const sizeOptions: { value: Size | 'all'; label: string }[] = [
  { value: 'all', label: 'All Sizes' },
  { value: 'S', label: 'S' },
  { value: 'M', label: 'M' },
  { value: 'L', label: 'L' },
  { value: 'XL', label: 'XL' },
];

const sortOptions: { value: FilterState['sortBy']; label: string }[] = [
  { value: 'default', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'name', label: 'Name A-Z' },
];

function FiltersContent() {
  const { filters, setFilter, resetFilters } = useStore();

  const activeFiltersCount =
    (filters.category !== 'all' ? 1 : 0) +
    (filters.size !== 'all' ? 1 : 0) +
    (filters.priceRange[0] > 0 || filters.priceRange[1] < 500 ? 1 : 0);

  return (
    <div className="space-y-6">
      {/* Category */}
      <div>
        <h4 className="text-xs font-semibold tracking-[0.2em] text-white uppercase mb-3">Category</h4>
        <div className="flex flex-wrap gap-2">
          {categoryOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setFilter('category', opt.value)}
              className={`px-3 py-1.5 text-xs tracking-wider uppercase border transition-colors ${
                filters.category === opt.value
                  ? 'bg-white text-black border-white'
                  : 'border-neutral-700 text-neutral-400 hover:text-white hover:border-neutral-500'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Size */}
      <div>
        <h4 className="text-xs font-semibold tracking-[0.2em] text-white uppercase mb-3">Size</h4>
        <div className="flex flex-wrap gap-2">
          {sizeOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setFilter('size', opt.value)}
              className={`px-3 py-1.5 text-xs tracking-wider uppercase border transition-colors ${
                filters.size === opt.value
                  ? 'bg-white text-black border-white'
                  : 'border-neutral-700 text-neutral-400 hover:text-white hover:border-neutral-500'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h4 className="text-xs font-semibold tracking-[0.2em] text-white uppercase mb-3">
          Price Range: {filters.priceRange[0]} - {filters.priceRange[1]} MAD
        </h4>
        <Slider
          value={filters.priceRange}
          onValueChange={(value) => setFilter('priceRange', value as [number, number])}
          min={0}
          max={500}
          step={10}
          className="py-4"
        />
      </div>

      {/* Sort */}
      <div>
        <h4 className="text-xs font-semibold tracking-[0.2em] text-white uppercase mb-3">Sort By</h4>
        <div className="flex flex-wrap gap-2">
          {sortOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setFilter('sortBy', opt.value)}
              className={`px-3 py-1.5 text-xs tracking-wider uppercase border transition-colors ${
                filters.sortBy === opt.value
                  ? 'bg-white text-black border-white'
                  : 'border-neutral-700 text-neutral-400 hover:text-white hover:border-neutral-500'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {activeFiltersCount > 0 && (
        <Button
          variant="ghost"
          onClick={resetFilters}
          className="text-neutral-400 hover:text-white text-xs tracking-wider uppercase w-full"
        >
          <X className="mr-2 h-3 w-3" />
          Clear All Filters ({activeFiltersCount})
        </Button>
      )}
    </div>
  );
}

export function ShopPage() {
  const { filters } = useStore();
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const filteredProducts = products
    .filter((p) => filters.category === 'all' || p.category === filters.category)
    .filter((p) => filters.size === 'all' || p.sizes.includes(filters.size as Size))
    .filter((p) => p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1])
    .sort((a, b) => {
      switch (filters.sortBy) {
        case 'price-asc': return a.price - b.price;
        case 'price-desc': return b.price - a.price;
        case 'name': return a.name.localeCompare(b.name);
        default: return 0;
      }
    });

  const activeFiltersCount =
    (filters.category !== 'all' ? 1 : 0) +
    (filters.size !== 'all' ? 1 : 0) +
    (filters.priceRange[0] > 0 || filters.priceRange[1] < 500 ? 1 : 0);

  return (
    <div className="min-h-screen pt-24 sm:pt-28 pb-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <p className="text-xs tracking-[0.3em] text-neutral-500 uppercase mb-2">Collection</p>
          <div className="flex items-center justify-between">
            <h1 className="text-3xl sm:text-4xl font-bold text-white">Shop All</h1>
            <div className="flex items-center gap-3">
              <span className="text-sm text-neutral-400">{filteredProducts.length} products</span>
              {/* Mobile filter trigger */}
              <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm" className="lg:hidden border-neutral-700 text-neutral-300 rounded-none text-xs tracking-wider uppercase">
                    <SlidersHorizontal className="mr-2 h-3 w-3" />
                    Filters
                    {activeFiltersCount > 0 && (
                      <Badge className="ml-2 h-4 w-4 p-0 flex items-center justify-center bg-red-600 text-white text-[10px] border-0 rounded-full">
                        {activeFiltersCount}
                      </Badge>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-80 bg-black border-neutral-800">
                  <SheetTitle className="text-white text-sm tracking-wider uppercase">Filters</SheetTitle>
                  <div className="mt-6">
                    <FiltersContent />
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </motion.div>

        <div className="flex gap-8">
          {/* Desktop Filters Sidebar */}
          <aside className="hidden lg:block w-56 flex-shrink-0">
            <div className="sticky top-28">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xs font-semibold tracking-[0.2em] text-white uppercase">Filters</h3>
                {activeFiltersCount > 0 && (
                  <Badge className="bg-red-600 text-white text-[10px] border-0 rounded-full h-4 w-4 p-0 flex items-center justify-center">
                    {activeFiltersCount}
                  </Badge>
                )}
              </div>
              <FiltersContent />
            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                {filteredProducts.map((product, i) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.4 }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <ShoppingBag className="h-12 w-12 text-neutral-700 mb-4" />
                <h3 className="text-lg font-medium text-neutral-300 mb-2">No products found</h3>
                <p className="text-sm text-neutral-500 mb-6">Try adjusting your filters to find what you&apos;re looking for.</p>
                <Button
                  variant="outline"
                  onClick={() => useStore.getState().resetFilters()}
                  className="border-neutral-700 text-neutral-300 rounded-none text-xs tracking-wider uppercase"
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
