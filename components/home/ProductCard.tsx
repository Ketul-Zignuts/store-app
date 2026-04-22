import { Colors } from '@/constants/Colors';
import { formatImgurUrl } from '@/utils/Utils';
import React, { useState } from 'react';
import { Dimensions, Image, Platform, Pressable, StyleSheet, Text, View } from 'react-native';

const { width } = Dimensions.get("window");
const CARD_WIDTH = (width - 48) / 2;

type Product = {
    id: number;
    title: string;
    price: number;
    images: string[];
    description?: string;
};

const ProductCard = ({ item }: { item: Product }) => {
    const originalPrice = Math.round(item.price * 1.25);
    const imageUrl = formatImgurUrl(item.images?.[0]);
    const [imgError, setImgError] = useState(false);


    return (
        <Pressable style={styles.card}>
            <Pressable style={styles.wishlist}>
                <Text style={styles.wishlistIcon}>♡</Text>
            </Pressable>
            <View style={styles.imageWrapper}>
                {!imageUrl || imgError ? (
                    <Image
                        source={require("@/assets/images/placeholder.png")}
                        defaultSource={require("@/assets/images/placeholder.png")}
                        style={styles.image}
                        resizeMode="cover"
                        onError={() => setImgError(true)}
                    />
                ) : (
                    <Image
                        source={{ uri: imageUrl }}
                        defaultSource={require("@/assets/images/placeholder.png")}
                        style={styles.image}
                        resizeMode="cover"
                        onError={() => setImgError(true)}
                    />
                )}
            </View>
            <View style={styles.info}>
                <Text style={styles.brand} numberOfLines={1}>
                    {item.title}
                </Text>
                <View style={styles.ratingRow}>
                    <Text style={styles.star}>★</Text>
                    <Text style={styles.rating}>3.5</Text>
                </View>
                <View style={styles.priceRow}>
                    <Text style={styles.price}>${item.price}</Text>
                    <Text style={styles.originalPrice}>${originalPrice}</Text>
                    <Pressable style={styles.cartBtn}>
                        <Text style={styles.cartIcon}>↗</Text>
                    </Pressable>
                </View>
            </View>
        </Pressable>
    );
};

export default ProductCard

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
        borderColor: Platform.OS === "ios" ? Colors.black4 : "transparent"
    },
    wishlist: {
        position: "absolute",
        top: 10,
        right: 10,
        zIndex: 10,
        width: 32,
        height: 32,
        borderRadius: 20,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    wishlistIcon: {
        fontSize: 16,
        color: "#e74c3c",
    },
    imageWrapper: {
        width: "100%",
        height: 160,
        backgroundColor: "#f0ede8",
    },
    image: {
        width: "100%",
        height: "100%",
    },
    info: {
        padding: 10,
    },
    brand: {
        fontSize: 13,
        fontWeight: "600",
        color: "#111",
        marginBottom: 4,
    },
    ratingRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 6,
        gap: 3,
    },
    star: {
        fontSize: 12,
        color: "#f5a623",
    },
    rating: {
        fontSize: 12,
        color: "#666",
        fontWeight: "500",
    },
    priceRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
    },
    price: {
        fontSize: 14,
        fontWeight: "700",
        color: "#111",
    },
    originalPrice: {
        fontSize: 12,
        color: "#aaa",
        textDecorationLine: "line-through",
        flex: 1,
    },
    cartBtn: {
        width: 28,
        height: 28,
        borderRadius: 20,
        backgroundColor: "#111",
        alignItems: "center",
        justifyContent: "center",
    },
    cartIcon: {
        fontSize: 14,
        fontWeight: "600",
        color: "#fff",
    },
});