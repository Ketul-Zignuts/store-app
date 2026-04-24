import CartFooter from '@/components/cart/CartFooter';
import CartItemCard from '@/components/cart/CartItemCard';
import CustomButton from '@/components/shared/Button';
import NoListItem from '@/components/shared/NoListItem';
import { Colors } from '@/constants/Colors';
import { useCart } from '@/hooks/useCart';
import { useCheckout } from '@/hooks/useCheckout';
import { router } from 'expo-router';
import React, { useMemo, useState } from 'react';
import {
    FlatList,
    StyleSheet,
    Text,
    View
} from 'react-native';

const PAGE_SIZE = 10;

const CartView = () => {
    const { checkoutFromCart } = useCheckout();
    const { cart: cartItems, totalItems, totalPrice } = useCart();
    const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

    const visibleData = useMemo(
        () => cartItems.slice(0, visibleCount),
        [cartItems, visibleCount]
    );

    const loadMore = () => {
        if (visibleCount < cartItems.length) {
            setVisibleCount(prev => prev + PAGE_SIZE);
        }
    };

    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <View style={styles.stickyHeader}>
                <View>
                    <Text style={styles.headerTitle}>
                        {totalItems} Items
                    </Text>
                    <Text style={styles.buyText}>
                        Buy Now • ${totalPrice.toFixed(2)}
                    </Text>
                </View>
                <CustomButton
                    icon='cart'
                    color={Colors.orange.theme}
                    onPress={() => {
                        if (cartItems.length === 0) return;
                        checkoutFromCart(cartItems as any);
                        router.push("/checkout");
                    }}
                >
                    Buy Now
                </CustomButton>
            </View>
            <FlatList
                data={visibleData}
                keyExtractor={(item: any) => item.id}
                renderItem={({ item }) => <CartItemCard data={item} />}
                onEndReached={loadMore}
                onEndReachedThreshold={0.5}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.contentContainer}
                ListEmptyComponent={<NoListItem iconName='cart-outline' title='Your cart is empty' subtitle={"Looks like you haven't added anything yet.\nStart shopping and fill it up!"} />}
            />
            <CartFooter />
        </View>
    );
};

const styles = StyleSheet.create({
    contentContainer: {
        paddingBottom: 16,
    },
    stickyHeader: {
        backgroundColor: '#fff',
        paddingHorizontal: 16,
        paddingVertical: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        borderTopWidth: 1,
        borderTopColor: '#eee'
    },

    headerTitle: {
        fontSize: 14,
        fontFamily: 'Rubik-Medium',
    },

    headerSub: {
        fontSize: 18,
        fontWeight: 'bold',
    },

    buyBtn: {
        backgroundColor: '#0D0D1A',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
    },

    buyText: {
        fontFamily: 'Rubik-Regular',
        marginTop: 4,
    },
});

export default CartView;