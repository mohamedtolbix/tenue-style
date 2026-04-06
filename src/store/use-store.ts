import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, DeliveryInfo, FilterState, Page, Product, Size } from '@/types';

interface Store {
  // Navigation
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
  selectedProductId: string | null;
  setSelectedProductId: (id: string | null) => void;

  // Cart
  cart: CartItem[];
  addToCart: (product: Product, size: Size) => void;
  removeFromCart: (productId: string, size: Size) => void;
  updateQuantity: (productId: string, size: Size, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartCount: () => number;

  // Filters
  filters: FilterState;
  setFilter: <K extends keyof FilterState>(key: K, value: FilterState[K]) => void;
  resetFilters: () => void;

  // Delivery
  deliveryInfo: DeliveryInfo;
  setDeliveryInfo: (info: Partial<DeliveryInfo>) => void;

  // Newsletter
  newsletterEmail: string;
  setNewsletterEmail: (email: string) => void;
  newsletterSubmitted: boolean;
  setNewsletterSubmitted: (v: boolean) => void;
}

const defaultFilters: FilterState = {
  category: 'all',
  size: 'all',
  priceRange: [0, 500],
  sortBy: 'default',
};

const defaultDelivery: DeliveryInfo = {
  fullName: '',
  phone: '',
  city: '',
  address: '',
  deliveryType: 'casablanca',
};

export const useStore = create<Store>()(
  persist(
    (set, get) => ({
      // Navigation
      currentPage: 'home',
      setCurrentPage: (page) => set({ currentPage: page }),
      selectedProductId: null,
      setSelectedProductId: (id) => set({ selectedProductId: id }),

      // Cart
      cart: [],
      addToCart: (product, size) => {
        const cart = get().cart;
        const existing = cart.find(
          (item) => item.product.id === product.id && item.size === size
        );
        if (existing) {
          set({
            cart: cart.map((item) =>
              item.product.id === product.id && item.size === size
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          });
        } else {
          set({ cart: [...cart, { product, size, quantity: 1 }] });
        }
      },
      removeFromCart: (productId, size) => {
        set({
          cart: get().cart.filter(
            (item) => !(item.product.id === productId && item.size === size)
          ),
        });
      },
      updateQuantity: (productId, size, quantity) => {
        if (quantity <= 0) {
          get().removeFromCart(productId, size);
          return;
        }
        set({
          cart: get().cart.map((item) =>
            item.product.id === productId && item.size === size
              ? { ...item, quantity }
              : item
          ),
        });
      },
      clearCart: () => set({ cart: [] }),
      getCartTotal: () => {
        return get().cart.reduce(
          (total, item) => total + item.product.price * item.quantity,
          0
        );
      },
      getCartCount: () => {
        return get().cart.reduce((count, item) => count + item.quantity, 0);
      },

      // Filters
      filters: defaultFilters,
      setFilter: (key, value) =>
        set({ filters: { ...get().filters, [key]: value } }),
      resetFilters: () => set({ filters: defaultFilters }),

      // Delivery
      deliveryInfo: defaultDelivery,
      setDeliveryInfo: (info) =>
        set({ deliveryInfo: { ...get().deliveryInfo, ...info } }),

      // Newsletter
      newsletterEmail: '',
      setNewsletterEmail: (email) => set({ newsletterEmail: email }),
      newsletterSubmitted: false,
      setNewsletterSubmitted: (v) => set({ newsletterSubmitted: v }),
    }),
    {
      name: 'tenue-store',
      partialize: (state) => ({
        cart: state.cart,
        deliveryInfo: state.deliveryInfo,
      }),
    }
  )
);
