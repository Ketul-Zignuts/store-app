export type CartItem = {
  id: string | number;
  title: string;
  price: number;
  image: string;
  quantity: number;
  addedAt: string;
};

export interface WishlistItem {
  id: string;        // Unique entry ID
  productId: number; // The actual product ID
  title: string;
  category: string;  // Added category
  price: number;
  image: string;     // Single string for the image
  addedAt: string;
  qty: number;       // Quantity for wishlist item
}

export type OrderItem = {
  id: string;
  items: CartItem[];
  total: number;
  purchasedAt: string;          // ISO string
  status: 'pending' | 'shipped' | 'delivered';
};