import { Colors } from "@/constants/Colors";
import { AntDesign, Fontisto, Ionicons, Octicons } from "@expo/vector-icons";
import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, StyleSheet, View } from 'react-native';

const TabLayout = () => {
    return (
        <Tabs screenOptions={{
            tabBarShowLabel: false,
            tabBarActiveTintColor: '#FFFFFF',
            tabBarInactiveTintColor: '#9DA0A5',
            sceneStyle: {
                backgroundColor: "#FFF",
            },
            tabBarItemStyle: {
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                paddingVertical: 16
            },
            tabBarStyle: {
                backgroundColor: '#1A1A1A',
                position: 'absolute',
                bottom: 50,
                left: 45,
                right: 45,
                borderRadius: 35,
                height: 70,
                borderTopWidth: 0,
                paddingBottom: 0,
                paddingHorizontal: Platform.OS === "ios" ? 4 : 10,
                elevation: 10,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 10 },
                shadowOpacity: 0.4,
                shadowRadius: 15,
                width: "80%",
                marginLeft: "10%"
            }
        }}>
            <Tabs.Screen
                name="home"
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused, color }) => (
                        <View style={focused ? styles.activeTab : styles.inactiveTab}>
                            <Octicons name={focused ? "home-fill" : "home"} size={22} color={color} />
                        </View>
                    )
                }}
            />
            <Tabs.Screen
                name="explore"
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused, color }) => (
                        <View style={focused ? styles.activeTab : styles.inactiveTab}>
                            {focused ? (
                                <AntDesign
                                    name="search"
                                    size={24}
                                    color={color}
                                />
                            ) : (
                                <Fontisto
                                    name="search"
                                    size={24}
                                    color={color}
                                />
                            )}
                        </View>
                    )
                }}
            />
            <Tabs.Screen
                name="cart"
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused, color }) => (
                        <View style={focused ? styles.activeTab : styles.inactiveTab}>
                            <Ionicons
                                name={focused ? "cart" : "cart-outline"}
                                size={24}
                                color={color}
                            />
                        </View>
                    )
                }}
            />
            <Tabs.Screen
                name="wishlist"
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused, color }) => (
                        <View style={focused ? styles.activeTab : styles.inactiveTab}>
                            <Ionicons
                                name={focused ? 'heart' : 'heart-outline'}
                                size={24}
                                color={color}
                            />
                        </View>
                    )
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused, color }) => (
                        <View style={focused ? styles.activeTab : styles.inactiveTab}>
                            <Octicons
                                name={focused ? "person-fill" : "person"}
                                size={22}
                                color={color}
                            />
                        </View>
                    )
                }}
            />
        </Tabs>
    );
};

const styles = StyleSheet.create({
    activeTab: {
        backgroundColor: Colors.orange.theme,
        width: 48,
        height: 48,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inactiveTab: {
        width: 48,
        height: 48,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default TabLayout;