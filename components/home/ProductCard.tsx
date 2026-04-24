import { TonalIconChip } from '@/components/TonalChip';
import { Colors } from '@/constants/Colors';
import { Product } from '@/context/types/product';
import { useCart } from '@/hooks/useCart';
import { useWishlist } from '@/hooks/useWishlist';
import { formatImgurUrl, formatPrice, getRandomRating } from '@/utils/Utils';
import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
    Dimensions,
    Image,
    Platform,
    Pressable,
    StyleSheet,
    Text,
    View
} from 'react-native';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 48) / 2;

const ProductCard = ({ item }: { item: Product }) => {
    const { addToCart, increment, decrement, getQuantity } = useCart();
    const { toggleWishlist, isWishlisted } = useWishlist();

    const quantity = getQuantity(item.id);
    const isFavorite = isWishlisted(item?.id);

    const originalPrice = Math.round(item.price * 1.25);
    const imageUrl = formatImgurUrl(item.images?.[0]);

    const [imgError, setImgError] = useState(false);

    const handleWishlist = () => {
        toggleWishlist({
            id: item.id,
            title: item.title,
            price: item.price,
            category: item?.category?.name || 'General',
            images: item.images,
        });
    };

    const handleAddToCart = () => {
        addToCart({
            id: item.id,
            title: item.title,
            price: item.price,
            images: item.images,
        });
    };

    return (
        <Pressable
            style={styles.card}
            onPress={() => router.push(`/product/${item.id}`)}
        >
            <Pressable
                style={styles.wishlist}
                onPress={(e) => {
                    e.stopPropagation();
                    handleWishlist();
                }}
            >
                <Ionicons
                    name={isFavorite ? 'heart' : 'heart-outline'}
                    size={16}
                    color={Colors.orange.theme}
                />
            </Pressable>
            <View style={styles.cartWrapper}>
                {quantity === 0 ? (
                    <Pressable
                        onPress={(e) => {
                            e.stopPropagation();
                            handleAddToCart();
                        }}
                    >
                        <TonalIconChip
                            iconName="cart"
                            label="cart"
                            size={28}
                            backgroundColor={Colors.heart}
                            iconColor={Colors.white}
                        />
                    </Pressable>
                ) : (
                    <View style={styles.qtyWrapper}>
                        <Pressable
                            onPress={(e) => {
                                e.stopPropagation();
                                decrement(item.id);
                            }}
                            style={styles.qtyBtn}
                        >
                            <Text style={styles.qtyBtnText}>−</Text>
                        </Pressable>

                        <Text style={styles.qtyText}>{quantity}</Text>

                        <Pressable
                            onPress={(e) => {
                                e.stopPropagation();
                                increment(item.id);
                            }}
                            style={styles.qtyBtn}
                        >
                            <Text style={styles.qtyBtnText}>+</Text>
                        </Pressable>
                    </View>
                )}
            </View>
            <View style={styles.imageWrapper}>
                {!imageUrl || imgError ? (
                    <Image
                        source={require('@/assets/images/placeholder.png')}
                        style={styles.image}
                    />
                ) : (
                    <Image
                        source={{ uri: imageUrl }}
                        style={styles.image}
                        onError={() => setImgError(true)}
                    />
                )}
            </View>
            <View style={styles.info}>
                <Text style={styles.brand} numberOfLines={1}>
                    {item.title}
                </Text>
                <View style={styles.row}>
                    <View style={styles.ratingRow}>
                        <Ionicons name="star" size={12} color={Colors.orange.theme} />
                        <Text style={styles.rating}>{getRandomRating()}</Text>
                    </View>
                    <View style={styles.priceRow}>
                        <Text style={styles.price}>
                            ${formatPrice(item.price)}
                        </Text>
                        <Text style={styles.originalPrice}>
                            ${formatPrice(originalPrice)}
                        </Text>
                    </View>
                </View>
            </View>
        </Pressable>
    );
};

export default ProductCard;

const styles = StyleSheet.create({
    card: {
        width: CARD_WIDTH,
        backgroundColor: '#fff',
        borderRadius: 16,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: Platform.OS === 'ios' ? 0.07 : 0,
        shadowRadius: Platform.OS === 'ios' ? 8 : 0,
        elevation: Platform.OS === 'android' ? 3 : 0,
        borderWidth: Platform.OS === 'ios' ? 1 : 0,
        borderColor: Platform.OS === 'ios' ? Colors.black4 : 'transparent',
    },

    wishlist: {
        position: 'absolute',
        top: 10,
        left: 10,
        zIndex: 20,
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 3,
    },

    cartWrapper: {
        position: 'absolute',
        top: 10,
        right: 10,
        zIndex: 20,
    },

    cartBtn: {
        backgroundColor: Colors.orange.theme,
        borderRadius: 16,
        padding: 6,
        alignItems: 'center',
        justifyContent: 'center',
    },

    qtyWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.orange.theme,
        borderRadius: 20,
        paddingHorizontal: 6,
        paddingVertical: 2,
    },

    qtyBtn: {
        paddingHorizontal: 6,
        paddingVertical: 2,
    },

    qtyBtnText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '700',
    },

    qtyText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: '700',
        marginHorizontal: 4,
    },

    imageWrapper: {
        width: '100%',
        height: 120,
        backgroundColor: '#f0ede8',
    },

    image: {
        width: '100%',
        height: '100%',
    },

    info: {
        padding: 10,
    },

    brand: {
        fontSize: 13,
        fontWeight: '600',
        marginBottom: 4,
    },

    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    ratingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 3,
    },

    rating: {
        fontSize: 12,
        color: '#666',
    },

    priceRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },

    price: {
        fontSize: 15,
        fontWeight: '700',
    },

    originalPrice: {
        fontSize: 11,
        color: '#aaa',
        textDecorationLine: 'line-through',
    },
});