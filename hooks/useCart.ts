import { CartItem } from '@/types/store';
import productStore from '@/utils/Utils';
import { useCallback, useEffect, useState } from 'react';

export const useCart = () => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const load = useCallback(async () => {
    const data = await productStore.get<CartItem>('cart');
    setCart(data);
  }, []);

  useEffect(() => { load(); }, [load]);

  // ── Add or increment ──────────────────────────────────────────────
  const addToCart = async (product: {
    id: number; title: string; price: number; images: string[];
  }) => {
    const current = await productStore.get<CartItem>('cart');
    const existing = current.find(i => i.productId === product.id);

    if (existing) {
      const updated = current.map(i =>
        i.productId === product.id
          ? { ...i, quantity: i.quantity + 1 }
          : i
      );
      await productStore.set('cart', updated);
    } else {
      const newItem: CartItem = {
        id: Date.now().toString(),
        productId: product.id,
        title: product.title,
        price: product.price,
        image: product.images?.[0] ?? '',
        quantity: 1,
        addedAt: new Date().toISOString(),
      };
      await productStore.set('cart', [...current, newItem]);
    }
    load();
  };

  // ── Increment quantity ────────────────────────────────────────────
  const increment = async (productId: number) => {
    const current = await productStore.get<CartItem>('cart');
    const updated = current.map(i =>
      i.productId === productId ? { ...i, quantity: i.quantity + 1 } : i
    );
    await productStore.set('cart', updated);
    load();
  };

  // ── Decrement quantity (removes if hits 0) ────────────────────────
  const decrement = async (productId: number) => {
    const current = await productStore.get<CartItem>('cart');
    const updated = current
      .map(i => i.productId === productId ? { ...i, quantity: i.quantity - 1 } : i)
      .filter(i => i.quantity > 0);
    await productStore.set('cart', updated);
    load();
  };

  // ── Remove entirely ───────────────────────────────────────────────
  const removeFromCart = async (productId: number) => {
    const current = await productStore.get<CartItem>('cart');
    await productStore.set('cart', current.filter(i => i.productId !== productId));
    load();
  };

  // ── Clear cart ────────────────────────────────────────────────────
  const clearCart = async () => {
    await productStore.clear('cart');
    load();
  };

  // ── Derived ───────────────────────────────────────────────────────
  const totalItems = cart.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const isInCart = (productId: number) => cart.some(i => i.productId === productId);
  const getQuantity = (productId: number) =>
    cart.find(i => i.productId === productId)?.quantity ?? 0;

  return {
    cart,
    addToCart,
    increment,
    decrement,
    removeFromCart,
    clearCart,
    totalItems,
    totalPrice,
    isInCart,
    getQuantity,
  };
};