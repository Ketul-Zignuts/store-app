import { Colors } from '@/constants/Colors';
import { useCart } from '@/hooks/useCart';
import { CartItem } from '@/types/store';
import { formatPrice } from '@/utils/Utils';
import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

type Props = {
  data: CartItem | any;
};

const CartItemCard = ({ data }: Props) => {
  const { increment, decrement, removeFromCart, cart } = useCart();
  const [imgError, setImgError] = useState(false);

  const cartItem = cart.find(i => Number(i.id) === Number(data.id));
  const cartQty = cartItem?.quantity ?? 0;

  const handleDelete = () => {
    removeFromCart(data.id);
  };

  return (
    <View style={styles.card}>
      <Pressable onPress={() => router.push(`/product/${data.id}`)}>
        {!data.image || imgError ? (
          <Image
            source={require('@/assets/images/placeholder.png')}
            style={styles.image}
          />
        ) : (
          <Image
            source={{ uri: data.image }}
            style={styles.image}
            onError={() => setImgError(true)}
          />
        )}
      </Pressable>

      <View style={styles.content}>
        <View style={styles.topRow}>
          <Text numberOfLines={1} style={styles.title}>
            {data.title}
          </Text>
          <Pressable onPress={handleDelete}>
            <Ionicons name="trash-outline" size={18} color={Colors.error} />
          </Pressable>
        </View>
        

        <View style={styles.ratingRow}>
          <Ionicons name="star" size={14} color="#FFA500" />
          <Text style={styles.ratingText}>
            {(Math.random() * (5 - 3) + 3).toFixed(1)}
          </Text>
        </View>

        <View style={styles.bottomRow}>
          <Text style={styles.price}>
            ${formatPrice((data.price * cartQty).toFixed(2))}
          </Text>

          <View style={styles.qtyContainer}>
            <Pressable
              style={styles.btn}
              onPress={() => {
                if(cartQty <= 1) return;
                decrement(data.id) 
              }}
            >
              <Text style={styles.btnText}>-</Text>
            </Pressable>
            <Text style={styles.qtyText}>{cartQty}</Text>
            <Pressable
              style={styles.btn}
              onPress={() => increment(data.id)}
            >
              <Text style={styles.btnText}>+</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
};

export default CartItemCard;

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    padding: 10,
    marginHorizontal: 16,
    marginTop: 16,
    alignItems: 'center',
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 10,
    marginRight: 12,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    flex: 1,
    marginRight: 8,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  ratingText: {
    fontSize: 12,
    marginLeft: 4,
    color: '#444',
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  qtyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EDEDED',
    borderRadius: 8,
    overflow: 'hidden',
  },
  btn: {
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  btnText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  qtyText: {
    fontSize: 14,
    fontWeight: '700',
    paddingHorizontal: 6,
  },
});