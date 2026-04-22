import FilterBottomSheet from '@/components/filters/FilterBottomSheet'
import FilterProduct from '@/components/filters/FilterProduct'
import Header from '@/components/header/Header'
import { useProducts } from '@/hooks/useProduct'
import BottomSheet from '@gorhom/bottom-sheet'
import React, { useEffect, useRef } from 'react'
import { View } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

const ExploreView = () => {
    const bottomSheetRef = useRef<BottomSheet>(null);
    const { categories, loadCategories, setSelectedCategory, selectedCategory } = useProducts();

    const onPressCategory = (id: number | string | null) => {
        setSelectedCategory(id === null ? null : id as string)
    }

    useEffect(() => {
        loadCategories?.();
        //eslint-disable-next-line
    }, []);

    const onPressFilter = () => {
        if (bottomSheetRef?.current) bottomSheetRef?.current?.snapToIndex(0);
    }

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
                <Header onPressFilter={onPressFilter} />
                <FilterProduct
                    categories={categories}
                    onPressCategory={onPressCategory}
                    selectedCategory={selectedCategory}
                />
                <FilterBottomSheet bottomSheetRef={bottomSheetRef} />
            </View>
        </GestureHandlerRootView>
    )
}

export default ExploreView;