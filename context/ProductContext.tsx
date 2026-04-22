import api from "@/axios/axios";
import { Product } from "@/context/types/product";
import React, { createContext, useState } from "react";

export type Category = {
    id: number;
    name: string;
    image: string;
    creationAt?: string;
    updatedAt?: string;
};

interface PriceFilterTypes {
    price: number;
    price_min: number;
    price_max: number;
}

interface ProductContextType {
    products: Product[];
    categories: Category[];

    loading: boolean;
    loadingMore: boolean;
    refreshing: boolean;
    hasMore: boolean;

    loadingCategories: boolean;
    selectedCategory: string | null
    setSelectedCategory: React.Dispatch<React.SetStateAction<string | null>>

    loadProducts: (refresh?: boolean) => Promise<void>;
    loadMore: () => Promise<void>;

    loadCategories: () => Promise<void>;

    getProductById: (id: number) => Promise<Product>;
    createProduct: (data: Partial<Product>) => Promise<Product>;
    updateProduct: (id: number, data: Partial<Product>) => Promise<Product>;
    deleteProduct: (id: number) => Promise<void>;
    priceFilter: PriceFilterTypes
    setPriceFilter: React.Dispatch<React.SetStateAction<PriceFilterTypes>>
}

export const ProductContext = createContext<ProductContextType | null>(null);

type Props = {
    children: React.ReactNode;
};

const LIMIT = 10;

export const ProductProvider = ({ children }: Props) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);

    const [loading, setLoading] = useState(false);
    const [loadingMore, setLoadingMore] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    const [loadingCategories, setLoadingCategories] = useState(false);
    const [priceFilter, setPriceFilter] = useState<PriceFilterTypes>({
        price: 0,
        price_min: 0,
        price_max: 0
    });

    const fetchProducts = async (offset: number, categoryId?: string | null) => {
        const params: any = {
            offset,
            limit: LIMIT,
        };
        if (categoryId) params.categoryId = categoryId;
        if (priceFilter.price > 0) {
            params.price = priceFilter.price;
        }
        if (priceFilter.price_min > 0) {
            params.price_min = priceFilter.price_min;
        }
        if (priceFilter.price_max > 0) {
            params.price_max = priceFilter.price_max;
        }
        const res = await api.get("/products", { params });
        return res.data;
    };

    const loadProducts = async (refresh = false) => {
        try {
            if (loading) return;
            setLoading(true);
            if (refresh) setRefreshing(true);
            const offset = refresh ? 0 : products.length;
            const data = await fetchProducts(offset, selectedCategory);
            if (refresh) {
                setProducts(data);
            } else {
                setProducts((prev) => [...prev, ...data]);
            }
            setHasMore(data.length === LIMIT);
        } catch (error) {
            console.log("loadProducts error:", error);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    const loadMore = async () => {
        if (loadingMore || loading || !hasMore) return;
        try {
            setLoadingMore(true);
            const offset = products.length;
            const data = await fetchProducts(offset, selectedCategory);
            setProducts((prev) => [...prev, ...data]);
            if (data.length < LIMIT) setHasMore(false);
        } catch (error) {
            console.log("loadMore error:", error);
        } finally {
            setLoadingMore(false);
        }
    };

    const loadCategories = async () => {
        try {
            setLoadingCategories(true);
            const res = await api.get("/categories");
            setCategories(res.data);
        } catch (error) {
            console.log("loadCategories error:", error);
        } finally {
            setLoadingCategories(false);
        }
    };

    const getProductById = async (id: number) => {
        const res = await api.get(`/products/${id}`);
        return res.data;
    };

    const createProduct = async (data: Partial<Product>) => {
        const res = await api.post("/products", data);
        return res.data;
    };

    const updateProduct = async (id: number, data: Partial<Product>) => {
        const res = await api.put(`/products/${id}`, data);
        return res.data;
    };

    const deleteProduct = async (id: number) => {
        await api.delete(`/products/${id}`);
    };

    return (
        <ProductContext.Provider
            value={{
                products,
                categories,
                loading,
                loadingMore,
                refreshing,
                hasMore,
                loadingCategories,
                loadProducts,
                loadMore,
                loadCategories,
                getProductById,
                createProduct,
                updateProduct,
                deleteProduct,
                selectedCategory,
                setSelectedCategory,
                priceFilter,
                setPriceFilter
            }}
        >
            {children}
        </ProductContext.Provider>
    );
};