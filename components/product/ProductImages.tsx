import { Colors } from '@/constants/Colors';
import { Product } from '@/context/types/product';
import { useWishlist } from '@/hooks/useWishlist';
import { Ionicons } from '@expo/vector-icons';
import React, { useCallback, useRef, useState } from 'react';
import {
    Dimensions,
    FlatList,
    Image,
    StyleSheet,
    TouchableOpacity,
    View
} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const CARD_WIDTH = SCREEN_WIDTH;
const CARD_HEIGHT = 300;
const THUMBNAIL_SIZE = 80;

type ProductImagesProps = {
    productDetail: Product | null;
};

const CarouselSlide = ({ uri }: { uri: string }) => {
    const [imgError, setImgError] = useState(false);

    return (
        <View style={styles.carouselItem}>
            {!uri || imgError ? (
                <Image
                    source={require('@/assets/images/placeholder.png')}
                    defaultSource={require('@/assets/images/placeholder.png')}
                    style={styles.mainImage}
                    resizeMode="cover"
                />
            ) : (
                <Image
                    source={{ uri }}
                    defaultSource={require('@/assets/images/placeholder.png')}
                    style={styles.mainImage}
                    resizeMode="cover"
                    onError={() => setImgError(true)}
                />
            )}
        </View>
    );
};

const Thumbnail = ({
    uri,
    index,
    activeIndex,
    onPress,
}: {
    uri: string;
    index: number;
    activeIndex: number;
    onPress: (index: number) => void;
}) => {
    const [imgError, setImgError] = useState(false);
    const isActive = index === activeIndex;

    return (
        <TouchableOpacity
            onPress={() => onPress(index)}
            activeOpacity={0.8}
            style={[styles.thumbnailWrapper, isActive && styles.thumbnailActive]}
        >
            {!uri || imgError ? (
                <Image
                    source={require('@/assets/images/placeholder.png')}
                    defaultSource={require('@/assets/images/placeholder.png')}
                    style={styles.thumbnailImage}
                    resizeMode="cover"
                />
            ) : (
                <Image
                    source={{ uri }}
                    defaultSource={require('@/assets/images/placeholder.png')}
                    style={styles.thumbnailImage}
                    resizeMode="cover"
                    onError={() => setImgError(true)}
                />
            )}
        </TouchableOpacity>
    );
};

const ProductImages = ({ productDetail }: ProductImagesProps & { productDetail: any }) => {
    const { toggleWishlist, isWishlisted } = useWishlist();
    const images = Array.isArray(productDetail?.images) ? productDetail.images : [];
    const [activeIndex, setActiveIndex] = useState(0);
    const carouselRef = useRef<any>(null);
    const thumbnailRef = useRef<FlatList>(null);
    const isFavorite = productDetail ? isWishlisted(productDetail.id) : false;

    const handleWishlist = () => {
        toggleWishlist({
            id: productDetail.id,
            title: productDetail.title,
            price: productDetail.price ?? 0,
            category: productDetail?.category?.name || 'General',
            images: productDetail?.images || ''
        });
    };

    const handleSnapToItem = useCallback((index: number) => {
        setActiveIndex(index);
        thumbnailRef.current?.scrollToIndex({
            index,
            animated: true,
            viewPosition: 0.5,
        });
    }, []);

    const handleThumbnailPress = useCallback((index: number) => {
        setActiveIndex(index);
        carouselRef.current?.scrollTo({ index, animated: true });
        thumbnailRef.current?.scrollToIndex({
            index,
            animated: true,
            viewPosition: 0.5,
        });
    }, []);

    const renderCarouselItem = useCallback(
        ({ item }: { item: string }) => <CarouselSlide uri={item} />,
        []
    );

    const renderThumbnail = useCallback(
        ({ item, index }: { item: string; index: number }) => (
            <Thumbnail
                uri={item}
                index={index}
                activeIndex={activeIndex}
                onPress={handleThumbnailPress}
            />
        ),
        [activeIndex, handleThumbnailPress]
    );

    return (
        <View style={styles.container}>
            <View style={styles.carouselContainer}>
                <Carousel
                    ref={carouselRef}
                    data={images}
                    renderItem={renderCarouselItem}
                    width={CARD_WIDTH}
                    height={CARD_HEIGHT}
                    onSnapToItem={handleSnapToItem}
                    loop={false}
                />
                <TouchableOpacity
                    style={styles.heartButton}
                    onPress={handleWishlist}
                    activeOpacity={0.8}
                >
                    <Ionicons
                        name={isFavorite ? 'heart' : 'heart-outline'}
                        size={20}
                        color={Colors.orange.theme}
                    />
                </TouchableOpacity>
                <FlatList
                    ref={thumbnailRef}
                    data={images}
                    renderItem={renderThumbnail}
                    keyExtractor={(_, i) => String(i)}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.thumbnailList}
                    style={styles.thumbnailStrip}
                    getItemLayout={(_, index) => ({
                        length: THUMBNAIL_SIZE + 12,
                        offset: (THUMBNAIL_SIZE + 12) * index,
                        index,
                    })}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFF',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 16,
        marginBottom: 60
    },
    carouselContainer: {
        position: 'relative',
        width: CARD_WIDTH,
        height: CARD_HEIGHT
    },
    carouselItem: {
        flex: 1,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
    },
    mainImage: {
        width: '94%',
        height: 300,
        borderRadius: 16
    },
    heartButton: {
        position: 'absolute',
        top: 14,
        right: 28,
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: Colors.black4,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.12,
        shadowRadius: 6,
        elevation: 4,
    },
    dotsContainer: {
        position: 'absolute',
        bottom: 14,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 6,
    },
    dot: {
        width: 7,
        height: 7,
        borderRadius: 4,
        backgroundColor: 'rgba(255,255,255,0.5)',
    },
    dotActive: {
        backgroundColor: '#fff',
        width: 20,
    },
    thumbnailStrip: {
        position: 'absolute',
        bottom: -THUMBNAIL_SIZE / 2,
        alignSelf: 'center',
    },
    thumbnailList: {
        paddingHorizontal: 16,
        gap: 12
    },
    thumbnailWrapper: {
        width: THUMBNAIL_SIZE,
        height: THUMBNAIL_SIZE,
        borderRadius: 14,
        overflow: 'hidden',
        borderWidth: 2,
        borderColor: 'transparent',
        backgroundColor: '#eee'
    },
    thumbnailActive: {
        borderColor: '#fff',
        opacity: 1,
    },
    thumbnailImage: {
        width: '100%',
        height: '100%',
        borderRadius: 12
    },
});

export default ProductImages;