import api from "@/axios/axios";
import { Product } from "@/context/types/product";
import React, { createContext } from "react";

interface ProductContextType {
    getProducts: (params?: Record<string, any>) => Promise<Product[]>;
    getProductById: (id: number) => Promise<Product>;
    createProduct: (data: Partial<Product>) => Promise<Product>;
    updateProduct: (id: number, data: Partial<Product>) => Promise<Product>;
    deleteProduct: (id: number) => Promise<void>;
}

export const ProductContext = createContext<ProductContextType | null>(null);

type Props = {
    children: React.ReactNode;
};

export const ProductProvider = ({ children }: Props) => {
    const getProducts = async (params?: Record<string, any>) => {
        try {
            const res = await api.get("/products", { params });
            return res.data;
        } catch (error) {
            console.log("getProducts error:", error);
            throw error;
        }
    };

    const getProductById = async (id: number) => {
        try {
            const res = await api.get(`/products/${id}`);
            return res.data;
        } catch (error) {
            console.log("getProductById error:", error);
            throw error;
        }
    };

    const createProduct = async (data: Partial<Product>) => {
        try {
            const res = await api.post("/products", data);
            return res.data;
        } catch (error) {
            console.log("createProduct error:", error);
            throw error;
        }
    };

    const updateProduct = async (id: number, data: Partial<Product>) => {
        try {
            const res = await api.put(`/products/${id}`, data);
            return res.data;
        } catch (error) {
            console.log("updateProduct error:", error);
            throw error;
        }
    };

    const deleteProduct = async (id: number) => {
        try {
            await api.delete(`/products/${id}`);
        } catch (error) {
            console.log("deleteProduct error:", error);
            throw error;
        }
    };

    return (
        <ProductContext.Provider
            value={{
                getProducts,
                getProductById,
                createProduct,
                updateProduct,
                deleteProduct,
            }}
        >
            {children}
        </ProductContext.Provider>
    );
};