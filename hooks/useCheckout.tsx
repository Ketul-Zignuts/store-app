import { CheckoutContext } from "@/context/CheckoutContext";
import { useContext } from "react";

export const useCheckout = () => {
  const context = useContext(CheckoutContext);
  if (!context) {
    throw new Error("useCheckout must be used within CheckoutProvider");
  }
  return context;
};