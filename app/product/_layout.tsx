import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { Stack, router } from 'expo-router';
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

export default function ProfileLayout() {
    return (
        <Stack
            screenOptions={({ route }) => {
                let title = "";

                switch (route.name) {
                    case "[id]/index":
                        title = "Product Detail";
                        break;
                    default:
                        title = "Detail";
                }

                return {
                    headerShown: true,
                    headerTitle: title,
                    headerTitleAlign: "center",
                    headerStyle: styles.headerStyle,
                    headerTintColor: "#FFF",
                    headerLeft: () => (
                        <TouchableOpacity
                            onPress={() => router.back()}
                            style={styles.iconBtn}
                            activeOpacity={0.7}
                        >
                            <Ionicons name="arrow-back" size={22} color="#fff" />
                        </TouchableOpacity>
                    ),
                };
            }}
        />
    );
}

const styles = StyleSheet.create({
    headerStyle: {
        backgroundColor: Colors.orange.theme,
    },
    iconBtn: {
        width: 36,
        height: 36,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:Colors.orange.theme
    }
});