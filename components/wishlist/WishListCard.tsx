import { TonalIconChip } from '@/components/TonalChip';
import { Colors } from '@/constants/Colors';
import { useWishlist } from '@/hooks/useWishlist';
import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

type Props = {
  data: {
    id: string;
    productId: number;
    title: string;
    price: number;
    image: string;
    qty?: number;
    category?: string;
  };
};

const WishListCard = ({ data }: Props) => {
  const { updateQty, toggleWishlist } = useWishlist();
  const qty = data.qty || 1;
  const [imgError, setImgError] = useState(false);
  const [inputValue, setInputValue] = useState(String(qty));

  useEffect(() => {
    setInputValue(String(qty));
  }, [qty]);

  const increaseQty = () => updateQty(data.id, qty + 1);

  const decreaseQty = () =>
    updateQty(data.id, qty > 1 ? qty - 1 : 1);

  const handleInputChange = (value: string) => {
    if (/^\d*$/.test(value)) setInputValue(value);
  };

  const handleBlur = () => {
    let num = parseInt(inputValue);
    if (isNaN(num) || num < 1) num = 1;
    updateQty(data.id, num);
  };

  const handleDelete = () => {
    toggleWishlist({
      id: data.productId,
      title: data.title,
      price: data.price,
      category: data.category || '',
      images: [data.image],
    });
  };

  const handleAddToCart = () => {
    console.log('Add to cart:', data.title, 'qty:', qty);
  };

  return (
    <View style={styles.card}>
      <Pressable onPress={() => router.push(`/product/${data.productId}`)}>
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
            ${(data.price * qty).toFixed(2)}
          </Text>
          <View style={styles.actionsRow}>
            <View style={styles.qtyContainer}>
              <Pressable style={styles.btn} onPress={decreaseQty}>
                <Text style={styles.btnText}>-</Text>
              </Pressable>
              <TextInput
                value={inputValue}
                onChangeText={handleInputChange}
                onBlur={handleBlur}
                keyboardType="numeric"
                selectTextOnFocus
                style={styles.input}
              />

              <Pressable style={styles.btn} onPress={increaseQty}>
                <Text style={styles.btnText}>+</Text>
              </Pressable>
            </View>
            <TonalIconChip
              iconName="cart"
              label="cart"
              onPress={handleAddToCart}
              size={28}
              backgroundColor={Colors.heart}
              iconColor={Colors.white}
              square
            />

          </View>
        </View>
      </View>
    </View>
  );
};

export default WishListCard;

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

  actionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
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

  input: {
    width: 40,
    textAlign: 'center',
    fontSize: 14,
    paddingVertical: 2,
  },

  cartBtn: {
    backgroundColor: '#0D0D1A',
    padding: 8,
    borderRadius: 8,
  },
});