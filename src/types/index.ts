export type Category = 'tshirts' | 'hoodies' | 'jeans' | 'shoes';
export type Size = 'S' | 'M' | 'L' | 'XL';

export interface Product {
  id: string;
  name: string;
  price: number;
  category: Category;
  image: string;
  images: string[];
  description: string;
  sizes: Size[];
  badge?: string;
}

export interface CartItem {
  product: Product;
  size: Size;
  quantity: number;
}

export type Page = 'home' | 'shop' | 'product' | 'cart' | 'contact';

export interface FilterState {
  category: Category | 'all';
  size: Size | 'all';
  priceRange: [number, number];
  sortBy: 'default' | 'price-asc' | 'price-desc' | 'name';
}

export interface DeliveryInfo {
  fullName: string;
  phone: string;
  city: string;
  address: string;
  deliveryType: 'casablanca' | 'outside';
}
