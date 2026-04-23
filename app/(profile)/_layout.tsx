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
                    case "profile-update/index":
                        title = "Profile Update";
                        break;
                    case "my-orders/index":
                        title = "My Orders";
                        break;
                    case "change-password/index":
                        title = "Change Password";
                        break;
                    default:
                        title = "Profile";
                }

                return {
                    headerShown: true,
                    headerTitle: title,
                    headerTitleAlign: "center",
                    headerStyle: styles.headerStyle,
                    headerTintColor: "#fff",
                    headerLeft: () => (
                        <TouchableOpacity
                            onPress={() => router.push("/(tabs)/profile")}
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