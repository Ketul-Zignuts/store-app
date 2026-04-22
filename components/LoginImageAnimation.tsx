import React, { useEffect, useRef } from 'react';
import { Animated, Image, StyleSheet, View } from 'react-native';

const LoginImageAnimation = () => {
    // Standard Animated values
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(20)).current;

    useEffect(() => {
        // Run both animations at the same time
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
            }),
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 800,
                useNativeDriver: true,
            })
        ]).start();
        //eslint-disable-next-line
    }, []);

    return (
        <View style={styles.imageWrapper}>
            <Animated.View
                style={[
                    styles.animatedContainer,
                    {
                        opacity: fadeAnim,
                        transform: [{ translateY: slideAnim }]
                    }
                ]}
            >
                <Image
                    source={require("@/assets/images/login.png")}
                    style={styles.heroImage}
                    resizeMode="cover"
                />
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    imageWrapper: {
        flex: 20,
        backgroundColor: '#fff',
    },
    animatedContainer: {
        flex: 1,
    },
    heroImage: {
        width: '100%',
        height: '100%'
    },
});

export default LoginImageAnimation;