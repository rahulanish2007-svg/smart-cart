export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  discountPercent?: number;
  unit: string;
  rating: number;
  reviewsCount: string;
  image: string;
  isFreshToday?: boolean;
  tag?: string;
  tagColor?: string;
  description?: string;
  brand?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type TabType = 'home' | 'shop' | 'planner' | 'wishlist' | 'profile';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  suggestedProducts?: Product[];
  actionLabel?: string;
}

export interface PlannedItem {
  id: string;
  name: string;
  brand: string;
  category: string;
  quantity: string;
  price: number;
  icon: string;
  checked: boolean;
  productId?: string;
}

export interface PlannerSettings {
  people: number;
  days: number;
  diet: 'Vegetarian' | 'Vegan' | 'Keto' | 'Everything';
  budget: number;
  tags: string[];
}

export interface Order {
  id: string;
  date: string;
  itemsCount: number;
  total: number;
  status: 'Delivered' | 'In Transit' | 'Preparing';
  items: CartItem[];
}
