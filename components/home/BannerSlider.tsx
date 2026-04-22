import React from "react";
import { Dimensions, Image, Platform, StyleSheet, View } from "react-native";
import Carousel from "react-native-reanimated-carousel";

const { width } = Dimensions.get("window");

const banners = [
    {
        id: "1",
        image: require("@/assets/images/banners/banner1.png"),
    },
    {
        id: "2",
        image: require("@/assets/images/banners/banner2.png"),
    },
    {
        id: "3",
        image: require("@/assets/images/banners/banner3.png"),
    },
    {
        id: "4",
        image: require("@/assets/images/banners/banner4.png"),
    },
    {
        id: "5",
        image: require("@/assets/images/banners/banner5.png"),
    },
];

const BannerSlider = () => {
    return (
        <Carousel
            loop
            width={width}
            height={Platform.OS === "android" ? 250 : 300}
            autoPlay
            data={banners}
            scrollAnimationDuration={800}
            renderItem={({ item }) => (
                <View style={styles.card}>
                    <Image
                        source={item.image}
                        style={styles.image}
                        resizeMode="contain"
                    />
                </View>
            )}
        />
    );
};

export default BannerSlider;

const styles = StyleSheet.create({
    card: {
        borderRadius: 6
    },
    image: {
        width: width,
        height: Platform.OS === "android" ? 250 : 300,
    },
});