import { CartItem } from '@/types/store';
import productStore from '@/utils/Utils';
import { useCallback, useEffect, useState } from 'react';
import { DeviceEventEmitter } from 'react-native';

const CART_SYNC_EVENT = 'cart_sync_update';

const normalizeCartItem = (item: any): CartItem => ({
  id: Number(item.id ?? item.productId),
  title: item.title,
  price: Number(item.price),
  image: item.image,
  quantity: Number(item.quantity) || 0,
  addedAt: item.addedAt,
});

export const useCart = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const getCurrentCart = async () => {
    const rawData = await productStore.get<CartItem[]>('cart');
    const data = Array.isArray(rawData) ? rawData.flat() : [];
    return data.map(normalizeCartItem);
  };
  const loadCart = useCallback(async () => {
    const data = await getCurrentCart();
    setCart(data);
  }, []);

  useEffect(() => {
    loadCart();

    const sub = DeviceEventEmitter.addListener(
      CART_SYNC_EVENT,
      loadCart
    );

    return () => sub.remove();
  }, [loadCart]);

  const persistCart = useCallback(async (updated: CartItem[]) => {
    const normalized = updated.map(normalizeCartItem);

    setCart(normalized);
    await productStore.set('cart', normalized);

    DeviceEventEmitter.emit(CART_SYNC_EVENT);
  }, []);

  const findProduct = (items: CartItem[], id: number | string) =>
    items.find(i => Number(i.id) === Number(id));

  const addToCart = async (product: {
    id: number;
    title: string;
    price: number;
    images: string[];
  }) => {
    const current = await getCurrentCart();
    const existing = findProduct(current, product.id);

    const updated = existing
      ? current.map(i =>
          Number(i.id) === Number(product.id)
            ? { ...i, quantity: i.quantity + 1 }
            : i
        )
      : [
          ...current,
          {
            id: Number(product.id),
            title: product.title,
            price: product.price,
            image: product.images?.[0] ?? '',
            quantity: 1,
            addedAt: new Date().toISOString(),
          },
        ];

    await persistCart(updated);
  };

  const addWithQuantity = async (
    product: {
      id: number;
      title: string;
      price: number;
      images: string[];
    },
    qty: number
  ) => {
    if (qty < 1) return;

    const current = await getCurrentCart();
    const existing = findProduct(current, product.id);

    const updated = existing
      ? current.map(i =>
          Number(i.id) === Number(product.id)
            ? { ...i, quantity: i.quantity + qty }
            : i
        )
      : [
          ...current,
          {
            id: Number(product.id),
            title: product.title,
            price: product.price,
            image: product.images?.[0] ?? '',
            quantity: qty,
            addedAt: new Date().toISOString(),
          },
        ];

    await persistCart(updated);
  };

  const setQuantity = async (id: number, qty: number) => {
    const current = await getCurrentCart();

    const updated = current
      .map(i =>
        Number(i.id) === Number(id)
          ? { ...i, quantity: qty }
          : i
      )
      .filter(i => i.quantity > 0);

    await persistCart(updated);
  };

  const increment = async (id: number) => {
    const current = await getCurrentCart();

    const updated = current.map(i =>
      Number(i.id) === Number(id)
        ? { ...i, quantity: i.quantity + 1 }
        : i
    );

    await persistCart(updated);
  };

  const decrement = async (id: number) => {
    const current = await getCurrentCart();

    const updated = current
      .map(i =>
        Number(i.id) === Number(id)
          ? { ...i, quantity: i.quantity - 1 }
          : i
      )
      .filter(i => i.quantity > 0);

    await persistCart(updated);
  };

  const removeFromCart = async (id: number) => {
    const current = await getCurrentCart();

    const updated = current.filter(
      i => Number(i.id) !== Number(id)
    );

    await persistCart(updated);
  };

  const clearCart = async () => {
    await productStore.set('cart', []);
    setCart([]);
    DeviceEventEmitter.emit(CART_SYNC_EVENT);
  };

  const totalItems = cart.reduce((sum, i) => sum + i.quantity, 0);

  const totalPrice = cart.reduce(
    (sum, i) => sum + i.price * i.quantity,
    0
  );

  const isInCart = (id: number | string) =>
    cart.some(i => Number(i.id) === Number(id));

  const getQuantity = (id: number | string) =>
    cart.find(i => Number(i.id) === Number(id))?.quantity ?? 0;

  return {
    cart,
    addToCart,
    addWithQuantity,
    setQuantity,
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