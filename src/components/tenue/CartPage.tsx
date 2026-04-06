'use client';

import { motion } from 'framer-motion';
import { Minus, Plus, Trash2, ArrowLeft, ShoppingBag, MapPin, Truck, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useStore } from '@/store/use-store';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

export function CartPage() {
  const {
    cart,
    updateQuantity,
    removeFromCart,
    clearCart,
    deliveryInfo,
    setDeliveryInfo,
    setCurrentPage,
  } = useStore();
  const [orderPlaced, setOrderPlaced] = useState(false);
  const { toast } = useToast();

  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const deliveryFee = deliveryInfo.deliveryType === 'casablanca' ? 25 : 40;
  const total = subtotal + (cart.length > 0 ? deliveryFee : 0);

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (!deliveryInfo.fullName || !deliveryInfo.phone || !deliveryInfo.city || !deliveryInfo.address) {
      toast({
        title: 'Missing information',
        description: 'Please fill in all delivery fields.',
        variant: 'destructive',
      });
      return;
    }
    if (cart.length === 0) {
      toast({
        title: 'Cart is empty',
        description: 'Add some products before checking out.',
        variant: 'destructive',
      });
      return;
    }
    setOrderPlaced(true);
    clearCart();
    toast({
      title: 'Order confirmed!',
      description: 'Thank you for your order. We will contact you shortly.',
    });
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen pt-24 sm:pt-28 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md mx-auto px-4"
        >
          <div className="w-16 h-16 rounded-full bg-green-600/20 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-8 w-8 text-green-500" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-3">Order Confirmed!</h2>
          <p className="text-neutral-400 text-sm mb-6">
            Thank you for your purchase. We will contact you on WhatsApp to confirm your order details and delivery.
          </p>
          <Button
            onClick={() => {
              setOrderPlaced(false);
              setCurrentPage('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="bg-white text-black hover:bg-neutral-200 rounded-none text-sm tracking-wider uppercase px-8 py-5 h-auto"
          >
            Continue Shopping
          </Button>
        </motion.div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen pt-24 sm:pt-28 flex items-center justify-center">
        <div className="text-center px-4">
          <ShoppingBag className="h-16 w-16 text-neutral-800 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-white mb-3">Your Cart is Empty</h2>
          <p className="text-neutral-500 text-sm mb-8">Looks like you haven&apos;t added anything yet.</p>
          <Button
            onClick={() => {
              setCurrentPage('shop');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="bg-white text-black hover:bg-neutral-200 rounded-none text-sm tracking-wider uppercase px-8 py-5 h-auto"
          >
            Start Shopping
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 sm:pt-28 pb-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <p className="text-xs tracking-[0.3em] text-neutral-500 uppercase mb-2">Shopping Cart</p>
          <h1 className="text-3xl sm:text-4xl font-bold text-white">Checkout</h1>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Cart Items */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2"
          >
            <div className="space-y-4">
              {cart.map((item) => (
                <div
                  key={`${item.product.id}-${item.size}`}
                  className="flex gap-4 p-4 border border-neutral-800 bg-neutral-950"
                >
                  <div className="w-20 h-24 sm:w-24 sm:h-32 flex-shrink-0 bg-neutral-900 overflow-hidden">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="text-sm font-medium text-white truncate">{item.product.name}</h3>
                        <p className="text-xs text-neutral-500 mt-0.5">Size: {item.size}</p>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.product.id, item.size)}
                        className="text-neutral-600 hover:text-red-500 transition-colors p-1"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="flex items-end justify-between mt-4">
                      <div className="flex items-center border border-neutral-800">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.size, item.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center text-neutral-400 hover:text-white transition-colors"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-8 h-8 flex items-center justify-center text-xs text-white border-x border-neutral-800">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.size, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center text-neutral-400 hover:text-white transition-colors"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                      <p className="text-sm font-medium text-white">
                        {item.product.price * item.quantity} MAD
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Order Summary & Delivery Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <form onSubmit={handleCheckout} className="space-y-6">
              {/* Delivery Form */}
              <div className="border border-neutral-800 p-5 bg-neutral-950">
                <div className="flex items-center gap-2 mb-5">
                  <MapPin className="h-4 w-4 text-neutral-400" />
                  <h3 className="text-xs font-semibold tracking-[0.2em] text-white uppercase">
                    Delivery Information
                  </h3>
                </div>
                <div className="space-y-4">
                  <div>
                    <Label className="text-xs text-neutral-400 uppercase tracking-wider">Full Name</Label>
                    <Input
                      value={deliveryInfo.fullName}
                      onChange={(e) => setDeliveryInfo({ fullName: e.target.value })}
                      placeholder="Enter your full name"
                      className="bg-neutral-900 border-neutral-800 text-white placeholder:text-neutral-600 rounded-none h-10 mt-1.5 text-sm"
                    />
                  </div>
                  <div>
                    <Label className="text-xs text-neutral-400 uppercase tracking-wider">Phone Number</Label>
                    <Input
                      value={deliveryInfo.phone}
                      onChange={(e) => setDeliveryInfo({ phone: e.target.value })}
                      placeholder="+212 600 000 000"
                      className="bg-neutral-900 border-neutral-800 text-white placeholder:text-neutral-600 rounded-none h-10 mt-1.5 text-sm"
                    />
                  </div>
                  <div>
                    <Label className="text-xs text-neutral-400 uppercase tracking-wider">City</Label>
                    <Input
                      value={deliveryInfo.city}
                      onChange={(e) => setDeliveryInfo({ city: e.target.value })}
                      placeholder="Enter your city"
                      className="bg-neutral-900 border-neutral-800 text-white placeholder:text-neutral-600 rounded-none h-10 mt-1.5 text-sm"
                    />
                  </div>
                  <div>
                    <Label className="text-xs text-neutral-400 uppercase tracking-wider">Address</Label>
                    <Input
                      value={deliveryInfo.address}
                      onChange={(e) => setDeliveryInfo({ address: e.target.value })}
                      placeholder="Enter your address"
                      className="bg-neutral-900 border-neutral-800 text-white placeholder:text-neutral-600 rounded-none h-10 mt-1.5 text-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Delivery Options */}
              <div className="border border-neutral-800 p-5 bg-neutral-950">
                <div className="flex items-center gap-2 mb-5">
                  <Truck className="h-4 w-4 text-neutral-400" />
                  <h3 className="text-xs font-semibold tracking-[0.2em] text-white uppercase">
                    Delivery Option
                  </h3>
                </div>
                <RadioGroup
                  value={deliveryInfo.deliveryType}
                  onValueChange={(val) => setDeliveryInfo({ deliveryType: val as 'casablanca' | 'outside' })}
                  className="space-y-3"
                >
                  <label className={cn(
                    'flex items-center justify-between p-3 border cursor-pointer transition-colors',
                    deliveryInfo.deliveryType === 'casablanca'
                      ? 'border-white bg-white/5'
                      : 'border-neutral-800 hover:border-neutral-600'
                  )}>
                    <div className="flex items-center gap-3">
                      <RadioGroupItem value="casablanca" className="border-neutral-600" />
                      <div>
                        <p className="text-sm text-white">Casablanca</p>
                        <p className="text-xs text-neutral-500">1-2 business days</p>
                      </div>
                    </div>
                    <span className="text-sm text-white font-medium">25 MAD</span>
                  </label>
                  <label className={cn(
                    'flex items-center justify-between p-3 border cursor-pointer transition-colors',
                    deliveryInfo.deliveryType === 'outside'
                      ? 'border-white bg-white/5'
                      : 'border-neutral-800 hover:border-neutral-600'
                  )}>
                    <div className="flex items-center gap-3">
                      <RadioGroupItem value="outside" className="border-neutral-600" />
                      <div>
                        <p className="text-sm text-white">Outside Casablanca</p>
                        <p className="text-xs text-neutral-500">3-5 business days</p>
                      </div>
                    </div>
                    <span className="text-sm text-white font-medium">40 MAD</span>
                  </label>
                </RadioGroup>
              </div>

              {/* Order Summary */}
              <div className="border border-neutral-800 p-5 bg-neutral-950">
                <h3 className="text-xs font-semibold tracking-[0.2em] text-white uppercase mb-5">
                  Order Summary
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Subtotal ({cart.length} items)</span>
                    <span className="text-white">{subtotal} MAD</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Delivery</span>
                    <span className="text-white">{deliveryFee} MAD</span>
                  </div>
                  <Separator className="bg-neutral-800" />
                  <div className="flex justify-between pt-1">
                    <span className="text-white font-semibold">Total</span>
                    <span className="text-white font-bold text-lg">{total} MAD</span>
                  </div>
                </div>
              </div>

              {/* Confirm Button */}
              <Button
                type="submit"
                className="w-full bg-white text-black hover:bg-neutral-200 rounded-none py-6 text-sm tracking-[0.15em] uppercase font-medium h-auto transition-all duration-300"
              >
                Confirm Order — {total} MAD
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
