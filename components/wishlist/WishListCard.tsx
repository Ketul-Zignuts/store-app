import { TonalIconChip } from '@/components/TonalChip';
import { Colors } from '@/constants/Colors';
import { useToast } from '@/context/ToastContext';
import { useCart } from '@/hooks/useCart';
import { useWishlist } from '@/hooks/useWishlist';
import { formatPrice } from '@/utils/Utils';
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
  const { showToast } = useToast();
  const {
    addWithQuantity,
    increment,
    decrement,
    setQuantity,
    cart,
  } = useCart();

  const wishlistQty = data.qty || 1;
  const cartItem = cart.find(
    i => Number(i.id) === Number(data.productId)
  );
  const cartQty = cartItem?.quantity ?? 0;
  const [imgError, setImgError] = useState(false);
  const [inputValue, setInputValue] = useState(String(wishlistQty));

  useEffect(() => {
    setInputValue(String(wishlistQty));
  }, [wishlistQty]);

  const increaseQty = () => {
    const newQty = wishlistQty + 1;
    updateQty(data.id, newQty);
    setInputValue(String(newQty));
  };

  const decreaseQty = () => {
    const newQty = wishlistQty > 1 ? wishlistQty - 1 : 1;
    updateQty(data.id, newQty);
    setInputValue(String(newQty));
  };

  const handleInputChange = (value: string) => {
    if (/^\d*$/.test(value)) {
      setInputValue(value);

      const num = parseInt(value);
      if (!isNaN(num) && num > 0) {
        updateQty(data.id, num);
      }
    }
  };

  const handleBlur = () => {
    let num = parseInt(inputValue);
    if (isNaN(num) || num < 1) num = 1;

    updateQty(data.id, num);
    setInputValue(String(num));
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

  const handleAddToCart = async () => {
    const qty = parseInt(inputValue) || 1;

    const product = {
      id: data.productId,
      title: data.title,
      price: data.price,
      images: [data.image],
    };

    const existingItem = cart.find(
      i => Number(i.id) === Number(data.productId)
    );

    if (existingItem) {
      await setQuantity(data.productId, qty);
    } else {
      await addWithQuantity(product, qty);
    }

    showToast('success', `${data.title} added to cart`);
  };

  return (
    <View style={styles.card}>
      {cartQty > 0 && (
        <View style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          backgroundColor: Colors.orange.theme,
          borderBottomLeftRadius: 12,
          borderTopRightRadius: 12,
          paddingHorizontal: 16,
          paddingVertical: 2,
          zIndex: 1,
        }}>
          <Text style={{ color: Colors.white, fontSize: 10, fontFamily: 'Rubik-Bold' }}>
            In Cart
          </Text>
        </View>
      )}

      <Pressable
        onPress={() => router.push(`/product/${data.productId}`)}
      >
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
            <Ionicons
              name="trash-outline"
              size={18}
              color={Colors.error}
            />
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
            $
            {formatPrice(
              (data.price * (cartQty || parseInt(inputValue) || 1)).toFixed(2)
            )}
          </Text>
          <View style={styles.actionsRow}>
            {cartQty > 0 ? (
              <View style={styles.qtyContainer}>
                <Pressable
                  style={styles.btn}
                  onPress={() => decrement(data.productId)}
                >
                  <Text style={styles.btnText}>-</Text>
                </Pressable>
                <Text style={styles.qtyText}>{cartQty}</Text>
                <Pressable
                  style={styles.btn}
                  onPress={() => increment(data.productId)}
                >
                  <Text style={styles.btnText}>+</Text>
                </Pressable>
              </View>
            ) : (
              <>
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
                <Pressable onPress={handleAddToCart}>
                  <TonalIconChip
                    iconName="cart"
                    label="cart"
                    size={28}
                    backgroundColor={Colors.heart}
                    iconColor={Colors.white}
                    square
                  />
                </Pressable>
              </>
            )}
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
    position: 'relative'
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

  qtyText: {
    fontSize: 14,
    fontWeight: '700',
    paddingHorizontal: 6,
  },

  input: {
    width: 40,
    textAlign: 'center',
    fontSize: 14,
    paddingVertical: 2,
  },
});