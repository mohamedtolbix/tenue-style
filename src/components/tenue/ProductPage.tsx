'use client';

import { motion } from 'framer-motion';
import { ShoppingBag, Minus, Plus, ArrowLeft, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useStore } from '@/store/use-store';
import { products } from '@/data/products';
import { Size } from '@/types';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

export function ProductCard({ product }: { product: ReturnType<typeof products>[0] }) {
  const { setCurrentPage, setSelectedProductId } = useStore();

  const handleClick = () => {
    setSelectedProductId(product.id);
    setCurrentPage('product');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <motion.button
      onClick={handleClick}
      className="group text-left w-full cursor-pointer"
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-neutral-900 mb-3">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {product.badge && (
          <Badge className="absolute top-3 left-3 bg-white text-black text-[10px] tracking-wider uppercase font-medium rounded-none border-0 px-2.5 py-0.5">
            {product.badge}
          </Badge>
        )}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileHover={{ opacity: 1, y: 0 }}
            className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            <span className="bg-white text-black text-xs tracking-wider uppercase px-6 py-2.5 font-medium">
              Quick View
            </span>
          </motion.div>
        </div>
      </div>
      <h3 className="text-sm text-white font-medium truncate group-hover:text-neutral-300 transition-colors">
        {product.name}
      </h3>
      <p className="text-sm text-neutral-400 mt-0.5">{product.price} MAD</p>
    </motion.button>
  );
}

export function ProductPage() {
  const { selectedProductId, setCurrentPage, addToCart, setSelectedProductId } = useStore();
  const [selectedSize, setSelectedSize] = useState<Size | null>(null);
  const [added, setAdded] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const { toast } = useToast();

  const product = products.find((p) => p.id === selectedProductId);

  if (!product) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="text-center">
          <ShoppingBag className="h-12 w-12 text-neutral-700 mx-auto mb-4" />
          <p className="text-neutral-400 mb-4">Product not found</p>
          <Button onClick={() => setCurrentPage('shop')} variant="outline" className="border-neutral-700 text-neutral-300 rounded-none">
            Back to Shop
          </Button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast({
        title: 'Select a size',
        description: 'Please select a size before adding to cart.',
        variant: 'destructive',
      });
      return;
    }
    for (let i = 0; i < quantity; i++) {
      addToCart(product, selectedSize);
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
    toast({
      title: 'Added to cart',
      description: `${product.name} (${selectedSize}) has been added to your cart.`,
    });
  };

  const handleBack = () => {
    setSelectedProductId(null);
    setCurrentPage('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="min-h-screen pt-24 sm:pt-28 pb-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Back button */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <Button
            variant="ghost"
            onClick={handleBack}
            className="text-neutral-400 hover:text-white -ml-2 rounded-none"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Shop
          </Button>
        </motion.div>

        {/* Product layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="aspect-[3/4] overflow-hidden bg-neutral-900"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col"
          >
            <div className="flex-1">
              {product.badge && (
                <Badge className="mb-3 bg-neutral-800 text-neutral-300 text-[10px] tracking-wider uppercase font-medium rounded-none border-0 px-3 py-1">
                  {product.badge}
                </Badge>
              )}
              <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">{product.name}</h1>
              <p className="text-2xl font-light text-white mb-6">{product.price} MAD</p>
              <div className="w-12 h-[1px] bg-neutral-700 mb-6" />
              <p className="text-sm text-neutral-400 leading-relaxed mb-8">
                {product.description}
              </p>

              {/* Size selection */}
              <div className="mb-8">
                <h3 className="text-xs font-semibold tracking-[0.2em] text-white uppercase mb-3">
                  Size {selectedSize && <span className="text-neutral-500 normal-case tracking-normal ml-1">— {selectedSize}</span>}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={cn(
                        'w-12 h-12 border text-sm font-medium transition-all duration-200',
                        selectedSize === size
                          ? 'bg-white text-black border-white'
                          : 'border-neutral-700 text-neutral-400 hover:text-white hover:border-neutral-500'
                      )}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="mb-8">
                <h3 className="text-xs font-semibold tracking-[0.2em] text-white uppercase mb-3">Quantity</h3>
                <div className="flex items-center gap-0 border border-neutral-700 w-fit">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 flex items-center justify-center text-neutral-400 hover:text-white transition-colors"
                  >
                    <Minus className="h-3 w-3" />
                  </button>
                  <span className="w-12 h-10 flex items-center justify-center text-sm text-white border-x border-neutral-700">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 flex items-center justify-center text-neutral-400 hover:text-white transition-colors"
                  >
                    <Plus className="h-3 w-3" />
                  </button>
                </div>
              </div>
            </div>

            {/* Add to cart */}
            <div className="flex gap-3 mt-auto">
              <Button
                onClick={handleAddToCart}
                className={cn(
                  'flex-1 py-6 text-sm tracking-[0.15em] uppercase rounded-none font-medium h-auto transition-all duration-300',
                  added
                    ? 'bg-green-600 text-white hover:bg-green-600'
                    : 'bg-white text-black hover:bg-neutral-200'
                )}
              >
                {added ? (
                  <>
                    <Check className="mr-2 h-4 w-4" />
                    Added to Cart
                  </>
                ) : (
                  <>
                    <ShoppingBag className="mr-2 h-4 w-4" />
                    Add to Cart — {product.price * quantity} MAD
                  </>
                )}
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16 sm:mt-24">
            <h2 className="text-xl font-bold text-white mb-8">You May Also Like</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {relatedProducts.map((p, i) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <ProductCard product={p} />
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
