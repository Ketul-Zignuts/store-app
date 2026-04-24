import ProductCard from '@/components/home/ProductCard';
import { Product } from '@/context/types/product';
import { useProducts } from '@/hooks/useProduct';
import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 48) / 1.8;

const ProductRelated = () => {
  const { relatedProducts } = useProducts();

  const relatedProductsItem: Product[] = Array.isArray(relatedProducts)
    ? relatedProducts
    : [];

  if (relatedProductsItem.length === 0) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>You might like</Text>

      <Carousel
        width={CARD_WIDTH}
        height={340}
        data={relatedProductsItem}
        loop={false}
        pagingEnabled={false}
        snapEnabled
        style={styles.carousel}
        renderItem={({ item }) => (
          <View style={styles.cardWrapper}>
            <ProductCard item={item} />
          </View>
        )}
      />
    </View>
  );
};

export default ProductRelated;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111',
    marginBottom: 12,
  },
  carousel: {
    paddingLeft: 12,
    overflow: 'visible',
  },
  cardWrapper: {
    marginRight: 12,
    overflow: 'visible',
  },
});