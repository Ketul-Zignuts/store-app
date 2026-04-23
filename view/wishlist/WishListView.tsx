import Header from '@/components/header/Header';
import CustomButton from '@/components/shared/Button';
import NoListItem from '@/components/shared/NoListItem';
import WishListCard from '@/components/wishlist/WishListCard';
import { useWishlist } from '@/hooks/useWishlist';
import React, { useMemo, useState } from 'react';
import {
    FlatList,
    StyleSheet,
    Text,
    View
} from 'react-native';

const PAGE_SIZE = 10;

const WishListView = () => {
    const { wishlist, totalAmount, totalItems } = useWishlist();
    const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

    const visibleData = useMemo(
        () => wishlist.slice(0, visibleCount),
        [wishlist, visibleCount]
    );

    const loadMore = () => {
        if (visibleCount < wishlist.length) {
            setVisibleCount(prev => prev + PAGE_SIZE);
        }
    };

    return (
        <View style={{ flex: 1 }}>
            <Header containerPaddingBottom={12} />
            <FlatList
                data={visibleData}
                keyExtractor={(item: any) => item.id}
                renderItem={({ item }) => <WishListCard data={item} />}
                onEndReached={loadMore}
                onEndReachedThreshold={0.5}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.contentContainer}
                ListEmptyComponent={<NoListItem iconName='heart-outline' title='Your wishlist is empty' subtitle={"Save the things you love.\n They'll be waiting right here."} />}
                ListHeaderComponent={
                    <View style={styles.stickyHeader}>
                        <View>
                            <Text style={styles.headerTitle}>
                                {totalItems} Items
                            </Text>
                            <Text style={styles.buyText}>
                                Buy Now • ${totalAmount.toFixed(2)}
                            </Text>
                        </View>
                        <CustomButton icon='cart'>Buy Now</CustomButton>
                    </View>
                }
                stickyHeaderIndices={[0]}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    contentContainer:{
        paddingBottom:180
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

export default WishListView;