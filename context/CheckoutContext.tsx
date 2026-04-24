import React, {
    createContext,
    ReactNode,
    useState
} from "react";

type CheckoutItem = {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
};

interface CheckoutContextType {
  items: CheckoutItem[];
  buyNow: (product: {
    id: number;
    title: string;
    price: number;
    images: string[];
  }, qty?: number) => void;
  checkoutFromCart: (cartItems: CheckoutItem[]) => void;
  clearCheckout: () => void;
  totalPrice: number;
  totalItems: number;
}

export const CheckoutContext = createContext<CheckoutContextType | null>(null);

type Props = {
  children: ReactNode;
};

export const CheckoutProvider = ({ children }: Props) => {
  const [items, setItems] = useState<CheckoutItem[]>([]);

  const buyNow = (
    product: {
      id: number;
      title: string;
      price: number;
      images: string[];
    },
    qty: number = 1
  ) => {
    setItems([
      {
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.images?.[0] ?? "",
        quantity: qty,
      },
    ]);
  };

  const checkoutFromCart = (cartItems: CheckoutItem[]) => {
    setItems(cartItems);
  };

  const clearCheckout = () => {
    setItems([]);
  };

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);

  const totalPrice = items.reduce(
    (sum, i) => sum + i.price * i.quantity,
    0
  );

  return (
    <CheckoutContext.Provider
      value={{
        items,
        buyNow,
        checkoutFromCart,
        clearCheckout,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CheckoutContext.Provider>
  );
};