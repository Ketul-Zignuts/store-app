import { WishlistItem } from '@/types/store';
import productStore from '@/utils/Utils';
import { useCallback, useEffect, useState } from 'react';
import { DeviceEventEmitter } from 'react-native';

const WISHLIST_SYNC_EVENT = 'wishlist_sync_update';

export const useWishlist = () => {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);

  const load = useCallback(async () => {
    const response = await productStore.get<WishlistItem[]>('wishlist');
    const data = Array.isArray(response) ? response.flat() : [];
    const normalized = (data as WishlistItem[]).map(item => ({
      ...item,
      qty: item.qty ?? 1,
    }));

    setWishlist(normalized);
  }, []);

  useEffect(() => {
    load();

    const subscription = DeviceEventEmitter.addListener(
      WISHLIST_SYNC_EVENT,
      () => {
        load();
      }
    );

    return () => {
      subscription.remove();
    };
  }, [load]);

  const toggleWishlist = async (product: {
    id: number;
    title: string;
    price: number;
    category: string;
    images: string[];
  }) => {
    const rawData = await productStore.get<WishlistItem[]>('wishlist');
    const current: WishlistItem[] = Array.isArray(rawData)
      ? rawData.flat()
      : [];

    const exists = current.find(i => i.productId === product.id);

    let updatedList: WishlistItem[];

    if (exists) {
      updatedList = current.filter(i => i.productId !== product.id);
    } else {
      const newItem: WishlistItem = {
        id: Date.now().toString(),
        productId: product.id,
        title: product.title,
        category: product.category,
        price: product.price,
        image: product.images?.[0] ?? '',
        addedAt: new Date().toISOString(),
        qty: 1,
      };

      updatedList = [...current, newItem];
    }

    await productStore.set('wishlist', updatedList);

    DeviceEventEmitter.emit(WISHLIST_SYNC_EVENT);

    load();
  };

  const updateQty = async (id: string, qty: number) => {
    const rawData = await productStore.get<WishlistItem[]>('wishlist');
    const current: WishlistItem[] = Array.isArray(rawData)
      ? rawData.flat()
      : [];

    const updatedList = current.map(item =>
      item.id === id
        ? {
          ...item,
          qty: qty < 1 ? 1 : qty,
        }
        : item
    );

    await productStore.set('wishlist', updatedList);

    DeviceEventEmitter.emit(WISHLIST_SYNC_EVENT);

    load();
  };

  const isWishlisted = (productId: number) => wishlist.some(i => i.productId === productId);

  const totalAmount = wishlist.reduce(
    (sum, item) => sum + item.price * (item.qty ?? 1),
    0
  );

  const totalItems = wishlist.reduce(
    (sum, item) => sum + (item.qty ?? 1),
    0
  );

  return {
    wishlist,
    toggleWishlist,
    updateQty,
    isWishlisted,
    totalAmount,
    totalItems,
  };
};