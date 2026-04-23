import { CartItem, OrderItem } from '@/types/store';
import productStore from '@/utils/Utils';
import { useCallback, useEffect, useState } from 'react';

export const useOrders = () => {
  const [orders, setOrders] = useState<OrderItem[]>([]);

  const load = useCallback(async () => {
    const data = await productStore.get<OrderItem>('orders');
    setOrders([...data].sort(
      (a, b) => new Date(b.purchasedAt).getTime() - new Date(a.purchasedAt).getTime()
    ));
  }, []);

  useEffect(() => { load(); }, [load]);
  
  const placeOrder = async (cartItems: CartItem[]) => {
    if (!cartItems.length) return;

    const total = cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0);

    const newOrder: OrderItem = {
      id: `ORD-${Date.now()}`,
      items: cartItems,
      total,
      purchasedAt: new Date().toISOString(),
      status: 'pending',
    };

    const current = await productStore.get<OrderItem>('orders');
    await productStore.set('orders', [...current, newOrder]);

    // Clear cart after order placed
    await productStore.clear('cart');

    load();
    return newOrder;
  };

  // ── Derived ───────────────────────────────────────────────────────
  const totalSpent = orders.reduce((sum, o) => sum + o.total, 0);
  const getOrder = (id: string) => orders.find(o => o.id === id);

  return { orders, placeOrder, totalSpent, getOrder };
};