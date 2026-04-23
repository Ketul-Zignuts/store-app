import api from "@/axios/axios";
import CustomTextInput from "@/components/forms/CustomTextInput";
import CustomButton from "@/components/shared/Button";
import { useToast } from "@/context/ToastContext";
import { useAuth } from "@/hooks/useAuth";
import { yupResolver } from "@hookform/resolvers/yup";
import { router } from "expo-router";
import React, { useState } from "react";
import { Resolver, useForm } from "react-hook-form";
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import * as yup from "yup";

const profileUpdateSchema = yup.object({
    name: yup.string().required("Name is required"),
    email: yup.string().email("Enter valid email").required("Email is required"),
    avatar: yup.string().url("Enter valid image URL").optional(),
});

type ProfileUpdateForm = yup.InferType<typeof profileUpdateSchema>;

export default function ProfileUpdateView() {
    const { showToast } = useToast();
    const { user, setUser } = useAuth();

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<ProfileUpdateForm>({
        mode: "all",
        reValidateMode: "onChange",
        resolver: yupResolver(profileUpdateSchema) as Resolver<ProfileUpdateForm>,
        defaultValues: {
            name: user?.name || "",
            email: user?.email || "",
            avatar: user?.avatar || "",
        },
    });

    const onSubmit = async (data: ProfileUpdateForm) => {
        if (!user?.id) {
            showToast("error", "User not found. Please log in again.");
            return;
        }

        setIsLoading(true);
        try {
            const response = await api.put(`/users/${user.id}`, {
                name: data.name,
                email: data.email,
                avatar: data.avatar || user.avatar || "https://i.pravatar.cc/300",
            });

            if (response?.data) {
                setUser?.(prev => ({ ...prev!, ...response.data }));
                showToast("success", "Profile updated successfully.");
                router.push("/(tabs)/profile");
            }
        } catch (err: any) {
            const msg =
                err?.response?.data?.message?.[0] ||
                err?.response?.data?.message ||
                err?.message ||
                "Something went wrong";
            showToast("error", msg);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView
            style={styles.wrapper}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                keyboardShouldPersistTaps="handled"
            >
                <View style={styles.content}>
                    <View style={styles.header}>
                        <Text style={styles.title}>Update Profile</Text>
                        <Text style={styles.subtitle}>
                            Edit your personal details below
                        </Text>
                    </View>

                    <View style={styles.form}>
                        <CustomTextInput
                            name="name"
                            control={control}
                            placeholder="Full name"
                            error={Boolean(errors.name)}
                            helperText={errors.name?.message}
                        />
                        <CustomTextInput
                            name="email"
                            control={control}
                            placeholder="Email address"
                            error={Boolean(errors.email)}
                            helperText={errors.email?.message}
                        />
                        <CustomTextInput
                            name="avatar"
                            control={control}
                            placeholder="Avatar URL (optional)"
                            error={Boolean(errors.avatar)}
                            helperText={errors.avatar?.message}
                        />
                        <CustomButton
                            style={{ paddingVertical: 4, marginTop: 10 }}
                            fullWidth
                            onPress={handleSubmit(onSubmit)}
                            disabled={isLoading}
                            loading={isLoading}
                            square
                        >
                            Save Changes
                        </CustomButton>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: "#fff",
    },
    scrollContent: {
        flexGrow: 1,
    },
    content: {
        paddingHorizontal: 24,
        paddingTop: 20,
        paddingBottom: 50,
    },
    header: {
        marginBottom: 24,   // ✅ tight, controlled gap between header and form
    },
    title: {
        fontSize: 32,
        fontFamily: "Rubik-Bold",
        color: "#111",
        lineHeight: 38,
    },
    subtitle: {
        fontSize: 15,
        fontFamily: "Rubik-Regular",
        color: "#666",
        marginTop: 6,
        lineHeight: 22,
    },
    form: {
        gap: 14,
    },
});