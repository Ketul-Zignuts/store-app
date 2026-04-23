import ProductDetailSkeleton from '@/components/product/ProductDetailSkeleton';
import ProductImages from '@/components/product/ProductImages';
import ProductInfoLabel from '@/components/product/ProductInfoLabel';
import CustomButton from '@/components/shared/Button';
import { Colors } from '@/constants/Colors';
import { useProducts } from '@/hooks/useProduct';
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect } from 'react';
import { Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

const ProductDetailView = () => {
    const { id } = useLocalSearchParams<{ id: string }>();
    const { getProductById, productDetail, loadingDetail } = useProducts();

    useEffect(() => {
        if (!id) return;
        getProductById(Number(id));
    }, [id, getProductById]);

    if (loadingDetail) {
        return <ProductDetailSkeleton />;
    }

    if(!loadingDetail && !productDetail) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Product not found.</Text>
            </View>
        );
    }

    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <ScrollView
                style={{ flex: 1 }}
                contentContainerStyle={{ paddingBottom: Platform.OS === "android" ? 120 : 100 }}
                showsVerticalScrollIndicator={false}
            >
                <ProductImages productDetail={productDetail} />
                <View style={{ paddingHorizontal: 16 }}>
                    <ProductInfoLabel productDetail={productDetail} />
                </View>
            </ScrollView>
            <SafeAreaView edges={['bottom']} style={styles.safeArea}>
                <View style={styles.bottomBar}>
                    <CustomButton
                        icon="basket"
                        color="transparent"
                        style={styles.buyNowButton}
                    >
                        Buy Now
                    </CustomButton>
                    <CustomButton
                        icon="cart"
                        style={styles.addToCartButton}
                        color={Colors.orange.theme}
                    >
                        Add to Cart
                    </CustomButton>
                </View>
            </SafeAreaView>
        </View>
    );
};

const styles = StyleSheet.create({
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
    addToCartButton: {
        flex: 5
    },
});

export default ProductDetailView;