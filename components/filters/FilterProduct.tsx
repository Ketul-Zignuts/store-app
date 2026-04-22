import CategorySelections from "@/components/CategorySelections";
import ProductCard from "@/components/home/ProductCard";
import { Colors } from "@/constants/Colors";
import { useProducts } from "@/hooks/useProduct";
import { Ionicons } from "@expo/vector-icons";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
    ActivityIndicator,
    FlatList,
    NativeScrollEvent,
    NativeSyntheticEvent,
    StyleSheet,
    Text,
    View,
} from "react-native";

type Product = {
    id: number;
    title: string;
    price: number;
    images: string[];
    description?: string;
};

type Category = {
    id: number | string;
    name: string;
};

type HomeProductProps = {
    categories: Category[];
    selectedCategory: string | null;
    onPressCategory: (id: number | string | null) => void;
};

const BANNER_HEIGHT = 10;

const FilterProduct = ({
    categories,
    onPressCategory,
    selectedCategory,
}: HomeProductProps) => {
    const {
        hasMore,
        loadMore,
        loadProducts,
        products,
        loading,
        loadingMore,
        selectedCategory: activeCategory,
    } = useProducts();
    const isLoadingMoreRef = useRef(false);
    const [isCategoryPinned, setIsCategoryPinned] = useState(false);

    useEffect(() => {
        loadProducts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        loadProducts(true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeCategory]);

    const handleLoadMore = useCallback(async () => {
        if (!hasMore || loading || loadingMore || isLoadingMoreRef.current) return;
        isLoadingMoreRef.current = true;
        await loadMore();
        isLoadingMoreRef.current = false;
    }, [hasMore, loading, loadingMore, loadMore]);

    const renderItem = useCallback(
        ({ item }: { item: Product }) => (
            <View style={{ marginHorizontal: 12 }}>
                <ProductCard item={item} />
            </View>
        ),
        []
    );

    const ListFooter = useCallback(() => {
        if (!loadingMore) return <View style={{ height: 24 }} />;
        return (
            <View style={styles.footer}>
                <ActivityIndicator size="small" color="#888" />
            </View>
        );
    }, [loadingMore]);

    const ListEmpty = useCallback(() => {
        if (loading) return null;
        return (
            <View style={styles.emptyState}>
                <Text style={styles.emptyText}>No products found</Text>
            </View>
        );
    }, [loading]);

    const handleScroll = useCallback(
        (event: NativeSyntheticEvent<NativeScrollEvent>) => {
            const offsetY = event.nativeEvent.contentOffset.y;
            const shouldPin = offsetY >= BANNER_HEIGHT;
            if (shouldPin !== isCategoryPinned) {
                setIsCategoryPinned(shouldPin);
            }
        },
        [isCategoryPinned]
    );

    const keyExtractor = useCallback(
        (item: Product, index: number) => `${item.id}-${index}`,
        []
    );

    return (
        <View style={styles.container}>
            {isCategoryPinned && (
                <View style={styles.pinnedCategoryContainer}>
                    <CategorySelections
                        data={categories}
                        onPress={onPressCategory}
                        selectedCategory={selectedCategory}
                    />
                </View>
            )}
            <FlatList
                data={products}
                keyExtractor={keyExtractor}
                renderItem={renderItem}
                numColumns={2}
                columnWrapperStyle={styles.row}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={
                    <>
                        <View style={styles.stickyCategoryContainer}>
                            <CategorySelections
                                data={categories}
                                onPress={onPressCategory}
                                selectedCategory={selectedCategory}
                            />
                        </View>
                        <View style={{ flexDirection: "row", alignItems: "stretch", gap: 6, paddingLeft: 10 }}>
                            <Ionicons name="filter" size={32} color={Colors.orange.theme} />
                            <Text style={styles.heading}>Explore Products</Text>
                        </View>
                    </>
                }
                ListFooterComponent={ListFooter}
                ListEmptyComponent={ListEmpty}
                onEndReached={handleLoadMore}
                onEndReachedThreshold={0.4}
                onScroll={handleScroll}
                scrollEventThrottle={16}
                removeClippedSubviews
                initialNumToRender={10}
                maxToRenderPerBatch={10}
                windowSize={5}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF",
    },
    listContent: {
        paddingTop: 10,
        paddingBottom: 32,
    },
    stickyCategoryContainer: {
        marginHorizontal: -16,
        backgroundColor: "#fff",
        paddingVertical: 0,
        paddingHorizontal: 16
    },
    pinnedCategoryContainer: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: "#fff",
        zIndex: 10,
        paddingVertical: 0,
        height: 60
    },
    row: {
        justifyContent: "space-between",
        marginBottom: 16
    },
    heading: {
        fontSize: 22,
        fontWeight: "700",
        color: "#111",
        marginBottom: 16,
        paddingLeft: 10,
        letterSpacing: -0.5,
    },
    footer: {
        paddingVertical: 24,
        alignItems: "center",
    },
    emptyState: {
        flex: 1,
        alignItems: "center",
        paddingTop: 80,
    },
    emptyText: {
        color: "#999",
        fontSize: 15,
    },
});

export default FilterProduct;