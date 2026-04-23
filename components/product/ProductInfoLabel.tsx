import { TonalChip } from '@/components/TonalChip';
import { Colors } from '@/constants/Colors';
import { Product } from '@/context/types/product';
import { getRandomRating } from '@/utils/Utils';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

type ProductInfoLabelProps = {
  productDetail: Product | null;
};

const ProductInfoLabel = ({ productDetail }: ProductInfoLabelProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.title} numberOfLines={2}>
          {productDetail?.title}
        </Text>
        <Text style={styles.price}>
          ${productDetail?.price ?? 0}
        </Text>
      </View>
      <View style={styles.ratingWrapper}>
        <TonalChip style={styles.chip}>
          {productDetail?.category?.name}
        </TonalChip>
        <View style={styles.ratingRow}>
          <Ionicons name="star" size={16} color={Colors.orange.theme} />
          <Text style={styles.rating}>{getRandomRating()}</Text>
        </View>
      </View>
      <View style={styles.descriptionContainer}>
        <Text style={styles.descriptionTitle}>Description</Text>
        <Text style={styles.descriptionText}>
          {productDetail?.description}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  title: {
    flex: 1,
    fontFamily: 'Rubik-Bold',
    fontSize: 16,
    color: '#222',
    marginRight: 10,
  },
  price: {
    fontFamily: 'Rubik-Bold',
    fontSize: 16,
    color: Colors.orange.theme,
  },
  ratingWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 12,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  chip: {
    padding: 0,
  },
  rating: {
    fontSize: 14,
    color: '#555',
  },
  descriptionContainer: {
    marginTop: 8,
  },
  descriptionTitle: {
    fontFamily: 'Rubik-Bold',
    fontSize: 15,
    color: '#111',
    marginBottom: 6,
  },
  descriptionText: {
    fontSize: 14,
    lineHeight: 20,
    color: '#666',
  }
});

export default ProductInfoLabel;