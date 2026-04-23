import SkeletonLoadingLib from 'expo-skeleton-loading';
import React from 'react';
import { StyleSheet, View } from 'react-native';

const SkeletonLoading = SkeletonLoadingLib as unknown as React.ComponentType<{
    background: string;
    highlight: string;
    children: React.ReactNode;
}>;

const ProductDetailSkeleton = () => {
    return (
        <View style={styles.container}>
            <SkeletonLoading background={"#f0f0f0"} highlight={"#ffffff"}>
                <View>
                    <View style={styles.mainImage} />
                    <View style={styles.thumbnailRow}>
                        <View style={styles.thumbnail} />
                        <View style={styles.thumbnail} />
                        <View style={styles.thumbnail} />
                    </View>
                    <View style={styles.namePriceRow}>
                        <View style={styles.nameBlock} />
                        <View style={styles.priceBlock}>
                            <View style={styles.currentPrice} />
                            <View style={styles.originalPrice} />
                        </View>
                    </View>
                    <View style={styles.ratingRow}>
                        <View style={styles.starIcon} />
                        <View style={styles.ratingText} />
                    </View>
                    <View style={styles.sizeLabel} />
                    <View style={styles.sizeRow}>
                        {[...Array(5)].map((_, i) => (
                            <View key={i} style={styles.sizeChip} />
                        ))}
                    </View>
                    <View style={styles.descLabel} />
                    <View style={styles.descLine} />
                    <View style={styles.descLineShort} />
                    <View style={styles.bottomButtons}>
                        <View style={styles.buyNowBtn} />
                        <View style={styles.addToCartBtn} />
                    </View>
                </View>
            </SkeletonLoading>
        </View>
    );
};

export default ProductDetailSkeleton;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        paddingHorizontal: 16,
        paddingTop: 16,
    },
    headerIcon: {
        width: 32,
        height: 32,
        borderRadius: 8,
        backgroundColor: "#f0f0f0",
    },
    headerTitle: {
        width: 130,
        height: 18,
        borderRadius: 6,
        backgroundColor: "#f0f0f0",
    },
    mainImage: {
        width: "100%",
        height: 300,
        borderRadius: 16,
        backgroundColor: "#f0f0f0",
        marginBottom: 12,
    },
    thumbnailRow: {
        flexDirection: "row",
        gap: 10,
        marginBottom: 20,
    },
    thumbnail: {
        width: 64,
        height: 64,
        borderRadius: 10,
        backgroundColor: "#f0f0f0",
    },
    namePriceRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10,
    },
    nameBlock: {
        width: "35%",
        height: 18,
        borderRadius: 6,
        backgroundColor: "#f0f0f0",
    },
    priceBlock: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    currentPrice: {
        width: 60,
        height: 18,
        borderRadius: 6,
        backgroundColor: "#f0f0f0",
    },
    originalPrice: {
        width: 44,
        height: 14,
        borderRadius: 4,
        backgroundColor: "#f0f0f0",
    },
    ratingRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
        marginBottom: 18,
    },
    starIcon: {
        width: 16,
        height: 16,
        borderRadius: 4,
        backgroundColor: "#f0f0f0",
    },
    ratingText: {
        width: 30,
        height: 14,
        borderRadius: 4,
        backgroundColor: "#f0f0f0",
    },

    // Size
    sizeLabel: {
        width: 90,
        height: 14,
        borderRadius: 4,
        backgroundColor: "#f0f0f0",
        marginBottom: 12,
    },
    sizeRow: {
        flexDirection: "row",
        gap: 10,
        marginBottom: 20,
    },
    sizeChip: {
        width: 44,
        height: 36,
        borderRadius: 8,
        backgroundColor: "#f0f0f0",
    },

    // Description
    descLabel: {
        width: 100,
        height: 14,
        borderRadius: 4,
        backgroundColor: "#f0f0f0",
        marginBottom: 10,
    },
    descLine: {
        width: "100%",
        height: 12,
        borderRadius: 4,
        backgroundColor: "#f0f0f0",
        marginBottom: 6,
    },
    descLineShort: {
        width: "65%",
        height: 12,
        borderRadius: 4,
        backgroundColor: "#f0f0f0",
        marginBottom: 28,
    },
    bottomButtons: {
        flexDirection: "row",
        gap: 12,
    },
    buyNowBtn: {
        flex: 1,
        height: 50,
        borderRadius: 14,
        backgroundColor: "#f0f0f0",
    },
    addToCartBtn: {
        flex: 1.4,
        height: 50,
        borderRadius: 14,
        backgroundColor: "#f0f0f0",
    },
});