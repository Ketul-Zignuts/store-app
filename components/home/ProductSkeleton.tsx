import { Colors } from '@/constants/Colors';
import SkeletonLoadingLib from 'expo-skeleton-loading';
import React from 'react';
import { Dimensions, Platform, StyleSheet, View } from 'react-native';

const SkeletonLoading = SkeletonLoadingLib as unknown as React.ComponentType<{
    background: string;
    highlight: string;
    children: React.ReactNode;
}>;

const { width } = Dimensions.get("window");
const CARD_WIDTH = (width - 48) / 2;

const ProductSkeleton = () => {
    return (
        <View style={styles.card}>
            <SkeletonLoading background={"#f0f0f0"} highlight={"#ffffff"}>
                <View>
                    <View style={styles.imageWrapper} />
                    <View style={styles.info}>
                        <View style={styles.titleLine} />
                        <View style={styles.ratingLine} />
                        <View style={styles.priceRow}>
                            <View style={styles.priceLine} />
                            <View style={styles.originalPriceLine} />
                            <View style={styles.cartBtnPlaceholder} />
                        </View>
                    </View>
                </View>
            </SkeletonLoading>
        </View>
    );
};

export default ProductSkeleton;

const styles = StyleSheet.create({
    card: {
        width: CARD_WIDTH,
        backgroundColor: "#fff",
        borderRadius: 16,
        overflow: "hidden",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: Platform.OS === "ios" ? 0.07 : 0,
        shadowRadius: Platform.OS === "ios" ? 8 : 0,
        elevation: Platform.OS === "android" ? 3 : 0,
        borderWidth: Platform.OS === "ios" ? 1 : 0,
        borderColor: Platform.OS === "ios" ? Colors.black4 : "transparent",
        marginBottom: 16,
    },
    imageWrapper: {
        width: "100%",
        height: 160,
        backgroundColor: "#f0f0f0",
    },
    info: {
        padding: 10,
    },
    titleLine: {
        width: "80%",
        height: 14,
        backgroundColor: "#f0f0f0",
        borderRadius: 4,
        marginBottom: 8,
    },
    ratingLine: {
        width: "40%",
        height: 12,
        backgroundColor: "#f0f0f0",
        borderRadius: 4,
        marginBottom: 12,
    },
    priceRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    priceLine: {
        width: "30%",
        height: 16,
        backgroundColor: "#f0f0f0",
        borderRadius: 4,
    },
    originalPriceLine: {
        width: "20%",
        height: 12,
        backgroundColor: "#f0f0f0",
        borderRadius: 4,
    },
    cartBtnPlaceholder: {
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: "#f0f0f0",
    },
});
