import Header from '@/components/header/Header'
import HomeProduct from '@/components/home/HomeProduct'
import { useProducts } from '@/hooks/useProduct'
import React, { useEffect } from 'react'
import { View } from 'react-native'

const HomeView = () => {
    const { categories, loadCategories, setSelectedCategory, selectedCategory } = useProducts();

    useEffect(() => {
        loadCategories?.();
        //eslint-disable-next-line
    }, []);

    const onPressCategory = (id: number | string | null) => {
        setSelectedCategory(id === null ? null : id as string)
    }

    return (
        <View style={{ flex: 1 }}>
            <Header />
            <HomeProduct
                categories={Array.isArray(categories) && categories?.length > 0 ? categories : []}
                onPressCategory={onPressCategory}
                selectedCategory={selectedCategory}
            />
        </View>
    )
}

export default HomeView