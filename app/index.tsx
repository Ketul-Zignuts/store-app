import OnBoardingImageAnimation from "@/components/OnBoardingImageAnimation";
import AnimatedButton from "@/components/shared/AnimatedButton";
import * as Haptics from "expo-haptics";
import { router } from "expo-router";
import React from "react";
import { StatusBar, StyleSheet, Text, View } from "react-native";

export default function OnboardingScreen() {

    const handlePress = async () => {
        try {
            await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
            router.replace("/(tabs)/home")
        } catch (error) {
            console.log("Onboarding button error:", error);
        }
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <OnBoardingImageAnimation />
            <View style={styles.bottomSection}>
                <View style={styles.textContainer}>
                    <Text style={styles.title}>
                        Find your luxury fashion style!
                    </Text>
                    <Text style={styles.description}>
                        Elevate your wardrobe and discover your signature luxury fashion styles.
                    </Text>
                </View>
                <AnimatedButton title="Get Started" onPress={handlePress} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    bottomSection: {
        flex: 1,
        paddingHorizontal: 25,
        justifyContent: "space-between",
        paddingBottom: 50,
    },
    textContainer: {
        marginTop: 30,
    },
    title: {
        fontSize: 44,
        fontFamily: "Rubik-Bold",
        color: "#000",
        lineHeight: 45,
        letterSpacing: -1,
    },
    description: {
        fontSize: 18,
        fontFamily: "Rubik-Regular",
        color: "#666",
        marginTop: 15,
        lineHeight: 22,
    },
});