import CustomButton from "@/components/shared/Button";
import { Colors } from "@/constants/Colors";
import { useAuth } from "@/hooks/useAuth";
import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useMemo } from "react";
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

type MenuItem = {
    key: string;
    label: string;
    icon: React.ComponentProps<typeof Ionicons>["name"];
    iconColor: string;
    onPress: () => void;
    forward: boolean
};

const ProfileView = () => {
    const { user, logout } = useAuth();
    const isGuest = !user;
    const displayName = user?.name?.trim() || "Guest User";
    const displayContact = user?.email?.trim() || "Please login to continue";
    const avatarUri = user?.avatar ?? null;

    const menuItems = useMemo<MenuItem[]>(
        () => [
            {
                key: "profile",
                label: "My Profile",
                icon: "person-outline",
                iconColor: "#58A6FF",
                onPress: () => router.push("/(profile)/profile-update"),
                forward: true
            },
            {
                key: "orders",
                label: "My Orders",
                icon: "bag-handle-outline",
                iconColor: "#52C41A",
                onPress: () => router.push("/(profile)/my-orders"),
                forward: true
            },
            {
                key: "refund",
                label: "Refund",
                icon: "refresh-circle-outline",
                iconColor: "#6C63FF",
                onPress: () => undefined,
                forward: false
            },
            {
                key: "password",
                label: "Change Password",
                icon: "lock-closed-outline",
                iconColor: "#FA8C16",
                onPress: () => router.push("/(profile)/change-password"),
                forward: true
            },
            {
                key: "language",
                label: "Change Language",
                icon: "language-outline",
                iconColor: "#D946EF",
                onPress: () => undefined,
                forward: false
            },
        ],
        [],
    );

    const handlePrimaryAction = async () => {
        if (isGuest) {
            router.push("/(auth)/login");
            return;
        }
        await logout();
        router.replace("/(tabs)/home");
    };

    return (
        <View style={styles.screen}>
            <ScrollView
                contentContainerStyle={styles.contentContainer}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.topCard}>
                    <View style={styles.topRow}>
                        <Text style={styles.pageTitle}>Profile</Text>
                    </View>

                    <View style={styles.profileCenter}>
                        <View>
                            <Image
                                source={
                                    avatarUri
                                        ? { uri: avatarUri }
                                        : require("@/assets/images/default-avatar.png")
                                }
                                style={styles.avatar}
                            />
                            {!isGuest && (
                                <View style={styles.editBadge}>
                                    <Feather name="edit-2" size={11} color="#fff" />
                                </View>
                            )}
                        </View>
                        <Text style={styles.nameText}>{displayName}</Text>
                        <Text style={styles.contactText}>{displayContact}</Text>
                    </View>
                </View>

                <View style={styles.menuCard}>
                    <Text style={styles.sectionTitle}>Account Overview</Text>
                    {menuItems.map((item) => (
                        <TouchableOpacity
                            key={item.key}
                            style={styles.menuRow}
                            activeOpacity={0.75}
                            onPress={item.onPress}
                            disabled={isGuest}
                        >
                            <View style={styles.leftRow}>
                                <View style={styles.iconWrap}>
                                    <Ionicons name={item.icon} size={18} color={item.iconColor} />
                                </View>
                                <Text style={[styles.menuLabel, isGuest && styles.menuLabelDisabled]}>
                                    {item.label}
                                </Text>
                            </View>
                            {item?.forward && (
                                <MaterialCommunityIcons name="chevron-right" size={22} color="#9AA0A6" />
                            )}
                        </TouchableOpacity>
                    ))}
                    <CustomButton style={{ marginTop: 10 }} square onPress={handlePrimaryAction}>
                        {isGuest ? "Login / Register" : "Logout"}
                    </CustomButton>
                </View>
            </ScrollView>
        </View>
    );
};

export default ProfileView;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: "#FFF",
    },
    contentContainer: {
        paddingHorizontal: 16,
        paddingTop: 10,
        paddingBottom: 130,
    },
    topCard: {
        backgroundColor: Colors.orange.theme,
        borderRadius: 28,
        paddingHorizontal: 18,
        paddingTop: 18,
        paddingBottom: 26,
    },
    topRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    pageTitle: {
        color: "#fff",
        fontSize: 24,
        fontWeight: "700",
    },
    moreBtn: {
        width: 32,
        height: 32,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.45)",
        alignItems: "center",
        justifyContent: "center",
    },
    profileCenter: {
        marginTop: 24,
        alignItems: "center",
    },
    avatar: {
        width: 86,
        height: 86,
        borderRadius: 43,
        backgroundColor: "#D9D9D9",
    },
    editBadge: {
        width: 22,
        height: 22,
        borderRadius: 11,
        backgroundColor: "#F9A826",
        borderWidth: 2,
        borderColor: "#083D11",
        position: "absolute",
        right: -2,
        bottom: -2,
        alignItems: "center",
        justifyContent: "center",
    },
    nameText: {
        marginTop: 14,
        fontSize: 20,
        fontWeight: "700",
        color: "#FFFFFF",
    },
    contactText: {
        marginTop: 6,
        fontSize: 13,
        color: "rgba(255,255,255,0.8)",
    },
    menuCard: {
        marginTop: 18,
        backgroundColor: "#FFFFFF",
        borderRadius: 24,
        paddingHorizontal: 14,
        paddingTop: 18,
        paddingBottom: 16,

        borderWidth: 1,
        borderColor: "#EAEAEA",
    },
    sectionTitle: {
        fontSize: 15,
        fontWeight: "700",
        color: "#253238",
        marginBottom: 10,
    },
    menuRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 11,
    },
    leftRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },
    iconWrap: {
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: "#F5F7FB",
        alignItems: "center",
        justifyContent: "center",
    },
    menuLabel: {
        fontSize: 15,
        color: "#1F2937",
        fontWeight: "500",
    },
    menuLabelDisabled: {
        color: "#A0A4AA",
    },
    primaryBtnText: {
        color: "#FFFFFF",
        fontSize: 15,
        fontWeight: "700",
    },
});