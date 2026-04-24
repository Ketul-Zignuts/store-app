import ProductDetailSkeleton from '@/components/product/ProductDetailSkeleton';
import ProductImages from '@/components/product/ProductImages';
import ProductInfoLabel from '@/components/product/ProductInfoLabel';
import ProductRelated from '@/components/product/ProductRelated';
import CustomButton from '@/components/shared/Button';
import NoListItem from '@/components/shared/NoListItem';
import { TonalIconChip } from '@/components/TonalChip';
import { Colors } from '@/constants/Colors';
import { useToast } from '@/context/ToastContext';
import { Product } from '@/context/types/product';
import { useCart } from '@/hooks/useCart';
import { useProducts } from '@/hooks/useProduct';
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View
} from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

const ProductDetailView = () => {
    const { id } = useLocalSearchParams<{ id: string }>();
    const { getProductById, productDetail, loadingDetail } = useProducts();
    const { showToast } = useToast();

    const {
        cart,
        addWithQuantity,
        setQuantity,
        increment,
        decrement,
    } = useCart();

    const [inputValue, setInputValue] = useState('1');

    // Fetch product
    useEffect(() => {
        if (!id) return;
        getProductById(Number(id));
        //eslint-disable-next-line
    }, [id]);

    // Get cart state
    const cartItem = cart.find(
        i => Number(i.id) === Number(productDetail?.id)
    );

    const cartQty = cartItem?.quantity ?? 0;

    // Sync qty if already in cart
    useEffect(() => {
        if (cartQty > 0) {
            setInputValue(String(cartQty));
        }
    }, [cartQty]);

    // ───── Qty Handlers ─────
    const increaseQty = () => {
        const num = parseInt(inputValue) || 1;
        setInputValue(String(num + 1));
    };

    const decreaseQty = () => {
        const num = parseInt(inputValue) || 1;
        setInputValue(String(num > 1 ? num - 1 : 1));
    };

    const handleInputChange = (value: string) => {
        if (/^\d*$/.test(value)) {
            setInputValue(value);
        }
    };

    const handleBlur = () => {
        let num = parseInt(inputValue);
        if (isNaN(num) || num < 1) num = 1;
        setInputValue(String(num));
    };

    // ───── Add to Cart ─────
    const handleAddToCart = async () => {
        if (!productDetail) return;

        const qty = parseInt(inputValue) || 1;

        const product = {
            id: productDetail.id,
            title: productDetail.title,
            price: productDetail.price,
            images: productDetail.images,
        };

        if (cartQty > 0) {
            await setQuantity(productDetail.id, qty);
        } else {
            await addWithQuantity(product, qty);
        }

        showToast('success', `${productDetail.title} added to cart`);
    };

    // ───── UI STATES ─────
    if (loadingDetail) return <ProductDetailSkeleton />;

    if (!loadingDetail && !productDetail) {
        return (
            <View style={styles.center}>
                <NoListItem
                    iconName="cube-outline"
                    title="Product not found"
                    subtitle="This product may have been removed."
                />
            </View>
        );
    }

    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <ScrollView
                contentContainerStyle={{ paddingBottom: 120 }}
                showsVerticalScrollIndicator={false}
            >
                <ProductImages productDetail={productDetail} />

                <View style={{ paddingHorizontal: 16 }}>
                    <ProductInfoLabel productDetail={productDetail} />
                    <ProductRelated />
                </View>
            </ScrollView>

            {/* ✅ Bottom Bar */}
            <SafeAreaView edges={['bottom']} style={styles.safeArea}>
                <View style={styles.bottomBar}>

                    {/* Buy Now */}
                    <CustomButton
                        icon="basket"
                        color="transparent"
                        style={styles.buyNowButton}
                    >
                        Buy Now
                    </CustomButton>

                    {/* Cart Section */}
                    {cartQty > 0 ? (
                        <View style={styles.cartControlWrapper}>
                            <View style={{
                                ...styles.qtyContainer,
                                borderRadius: 20
                            }}>
                                <Pressable
                                    style={styles.btn}
                                    onPress={() => decrement((productDetail as Product).id)}
                                >
                                    <Text style={styles.btnText}>-</Text>
                                </Pressable>

                                <Text style={styles.qtyText}>{cartQty}</Text>

                                <Pressable
                                    style={styles.btn}
                                    onPress={() => increment((productDetail as Product).id)}
                                >
                                    <Text style={styles.btnText}>+</Text>
                                </Pressable>
                                <Pressable onPress={() => showToast('info', 'This item is already in your cart')}>
                                <TonalIconChip
                                    iconName="cart"
                                    size={32}
                                    backgroundColor={Colors.green.primary}
                                    iconColor={Colors.white}
                                    style={{...styles.tonalChip,backgroundColor: Colors.green.primary}}
                                />
                            </Pressable>
                            </View>
                        </View>
                    ) : (
                        <View style={styles.cartControlWrapper}>
                             <View style={{
                                ...styles.qtyContainer,
                                borderTopLeftRadius: 20,
                                borderBottomLeftRadius: 20
                            }}>
                                <Pressable style={styles.btn} onPress={decreaseQty}>
                                    <Text style={styles.btnText}>-</Text>
                                </Pressable>

                                <TextInput
                                    value={inputValue}
                                    onChangeText={handleInputChange}
                                    onBlur={handleBlur}
                                    keyboardType="numeric"
                                    style={styles.input}
                                />

                                <Pressable style={styles.btn} onPress={increaseQty}>
                                    <Text style={styles.btnText}>+</Text>
                                </Pressable>
                            </View>

                            <Pressable onPress={handleAddToCart}>
                                <TonalIconChip
                                    iconName="cart"
                                    size={32}
                                    backgroundColor={Colors.orange.theme}
                                    iconColor={Colors.white}
                                    style={styles.tonalChip}
                                />
                            </Pressable>
                        </View>
                    )}

                </View>
            </SafeAreaView>
        </View>
    );
};

export default ProductDetailView;

// ───── Styles ─────
const styles = StyleSheet.create({
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    safeArea: {
        position: 'absolute',
        bottom: Platform.OS === 'android' ? 24 : 0,
        left: 0,
        right: 0,
        alignItems: 'center',
    },

    bottomBar: {
        width: '90%',
        flexDirection: 'row',
        backgroundColor: '#1a1a1a',
        borderRadius: 50,
        alignItems: 'center',
        padding: 8,
        gap: 8,
    },

    buyNowButton: {
        flex: 4,
        backgroundColor: 'transparent',
        borderWidth: 0,
    },

    cartControlWrapper: {
        flex: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end'
    },

    qtyContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#EDEDED',
        overflow: 'hidden',
        height: 36,
    },

    btn: {
        paddingHorizontal: 12,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },

    tonalChip: {
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
        backgroundColor: Colors.orange.theme,
        borderRadius: 20,
        width: 36,
        height: 36,
        justifyContent: 'center',
        alignItems: 'center'
    },

    btnText: {
        fontSize: 16,
        fontWeight: 'bold',
    },

    qtyText: {
        fontSize: 14,
        fontWeight: '700',
        paddingHorizontal: 10,
    },

    input: {
        width: 50,
        textAlign: 'center',
        fontSize: 14,
        paddingVertical: 4,
    },
});