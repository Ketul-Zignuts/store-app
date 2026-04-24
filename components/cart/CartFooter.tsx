import { useCart } from '@/hooks/useCart';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const CartFooter = () => {
    const { totalPrice } = useCart();

    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <Text style={styles.label}>Subtotal</Text>
                <Text style={styles.value}>${totalPrice.toFixed(2)}</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.label}>Delivery</Text>
                <Text style={styles.free}>Free</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.row}>
                <Text style={styles.totalLabel}>Total</Text>
                <Text style={styles.totalValue}>${totalPrice.toFixed(2)}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        paddingHorizontal: 16,
        paddingTop: 12,
        paddingBottom: 60,
        borderTopWidth: 1,
        borderColor: '#E0E0E0',
        gap: 8,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    label: {
        fontSize: 14,
        color: '#666',
        fontFamily: 'Rubik-Regular',
    },
    value: {
        fontSize: 14,
        color: '#333',
        fontFamily: 'Rubik-Regular',
    },
    free: {
        fontSize: 14,
        color: '#2ecc71',
        fontFamily: 'Rubik-Medium',
    },
    divider: {
        height: 1,
        backgroundColor: '#E0E0E0',
        marginVertical: 4,
    },
    totalLabel: {
        fontSize: 15,
        fontFamily: 'Rubik-Medium',
        color: '#000',
    },
    totalValue: {
        fontSize: 15,
        fontFamily: 'Rubik-Medium',
        color: '#000',
    },
});

export default CartFooter;