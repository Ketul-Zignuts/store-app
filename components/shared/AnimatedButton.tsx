import { Colors } from "@/constants/Colors";
import { Feather, Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import React, { useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Animated, {
    Easing,
    interpolate,
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withTiming,
} from "react-native-reanimated";

type Props = {
    title: string;
    onPress: () => void;
};

export default function AnimatedButton({ title, onPress }: Props) {
    const progress = useSharedValue(0);

    useEffect(() => {
        progress.value = withRepeat(
            withTiming(1, {
                duration: 1500,
                easing: Easing.linear,
            }),
            -1,
            false
        );
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const animatedStyle1 = useAnimatedStyle(() => ({
        opacity: interpolate(progress.value, [0, 0.2, 0.4, 0.5], [0.2, 1, 0.2, 0.2]),
    }));

    const animatedStyle2 = useAnimatedStyle(() => ({
        opacity: interpolate(progress.value, [0.2, 0.4, 0.6, 0.7], [0.2, 1, 0.2, 0.2]),
    }));

    const animatedStyle3 = useAnimatedStyle(() => ({
        opacity: interpolate(progress.value, [0.4, 0.6, 0.8, 1], [0.2, 1, 0.2, 0.2]),
    }));

    const handlePress = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        onPress();
    };

    return (
        <TouchableOpacity
            style={styles.button}
            activeOpacity={0.8}
            onPress={handlePress}
        >
            <View style={styles.orangeCircle}>
                <Feather name="check" size={24} color="white" />
            </View>

            <Text style={styles.buttonText}>{title}</Text>

            <View style={styles.chevronGroup}>
                <Animated.View style={animatedStyle1}>
                    <Ionicons name="chevron-forward" size={20} color="black" />
                </Animated.View>
                <Animated.View style={[animatedStyle2, { marginLeft: -12 }]}>
                    <Ionicons name="chevron-forward" size={20} color="black" />
                </Animated.View>
                <Animated.View style={[animatedStyle3, { marginLeft: -12 }]}>
                    <Ionicons name="chevron-forward" size={20} color="black" />
                </Animated.View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        height: 80,
        width: "100%",
        borderWidth: 1.5,
        borderColor: "#000",
        borderRadius: 40,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 10,
        justifyContent: "space-between",
    },
    orangeCircle: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: Colors.orange.theme,
        justifyContent: "center",
        alignItems: "center",
    },
    buttonText: {
        fontSize: 22,
        fontFamily: "Rubik-Medium",
        color: "#000",
    },
    chevronGroup: {
        flexDirection: "row",
        alignItems: "center",
        marginRight: 15,
        width: 45,
    },
});