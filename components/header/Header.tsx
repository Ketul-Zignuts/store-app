import { useAuth } from "@/hooks/useAuth";
import { Feather, Ionicons } from "@expo/vector-icons";
import { router, usePathname } from "expo-router";
import React, { useEffect, useMemo, useRef } from "react";
import {
    Image,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

type HeaderProps = {
    onPressFilter?: () => void;
}

const Header = ({ onPressFilter }: HeaderProps) => {
    const { user } = useAuth();
    const pathname = usePathname();
    const firstName = user?.name?.trim()?.split(" ")?.[0] ?? "Guest User";
    const avatarUri = user?.avatar ?? null;
    const isExplore = useMemo(() => pathname === "/explore", [pathname]);
    const inputRef = useRef<TextInput>(null);

    useEffect(() => {
        if (isExplore) {
            setTimeout(() => {
                inputRef.current?.focus();
            }, 100);
        }
    }, [isExplore]);

    return (
        <View style={styles.container}>
            <View style={styles.topRow}>
                <View>
                    <Text style={styles.greeting}>
                        Hello {firstName} 👋
                    </Text>
                    <Text style={styles.subText}>Welcome to store</Text>
                </View>
                <View style={styles.rightIcons}>
                    <TouchableOpacity style={styles.iconBtn}>
                        <Ionicons
                            name="notifications-outline"
                            size={22}
                            color="#111"
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        if (!user) {
                            router.push("/(auth)/login")
                        }
                    }}>
                        <Image
                            source={
                                avatarUri
                                    ? { uri: avatarUri }
                                    : require("@/assets/images/default-avatar.png")
                            }
                            style={styles.avatar}
                        />
                    </TouchableOpacity>
                </View>
            </View>
            {isExplore ? (
                <View style={styles.searchBox}>
                    <Feather name="search" size={18} color="#888" />
                    <TextInput
                        ref={inputRef}
                        placeholder="Search products..."
                        placeholderTextColor="#888"
                        style={styles.input}
                    />
                    <TouchableOpacity style={styles.filterBtn} onPress={() => onPressFilter?.()}>
                        <Ionicons name="options-outline" size={18} color="#111" />
                    </TouchableOpacity>
                </View>
            ) : (
                <TouchableOpacity
                    style={styles.searchBox}
                    activeOpacity={0.8}
                    onPress={() => router.push("/(tabs)/explore")}
                >
                    <Feather name="search" size={18} color="#888" />
                    <Text style={[styles.input, { color: "#888" }]}>
                        Search products...
                    </Text>
                    <View style={styles.filterBtn}>
                        <Ionicons name="options-outline" size={18} color="#111" />
                    </View>
                </TouchableOpacity>
            )}
        </View>
    );
};

export default Header;

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16,
        paddingTop: 10,
        paddingBottom: 12,
        backgroundColor: "#fff",
    },
    topRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 12,
    },
    greeting: {
        fontSize: 18,
        fontWeight: "700",
        color: "#111",
    },
    subText: {
        fontSize: 12,
        color: "#777",
        marginTop: 2,
    },
    rightIcons: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },
    iconBtn: {
        padding: 8,
        borderRadius: 12,
        backgroundColor: "#f3f3f3",
    },
    avatar: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: "#e5e5e5",
    },
    searchBox: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
        borderRadius: 14,
        paddingHorizontal: 12,
        height: 44,
    },
    input: {
        flex: 1,
        marginLeft: 8,
        fontSize: 14,
        color: "#111",
    },
    filterBtn: {
        padding: 6,
        borderRadius: 10,
        backgroundColor: "#fff",
    },
});