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

const changePasswordSchema = yup.object({
    currentPassword: yup.string().required("Current password is required"),
    newPassword: yup
        .string()
        .min(6, "Password must be at least 6 characters")
        .required("New password is required"),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref("newPassword")], "Passwords do not match")
        .required("Please confirm your new password"),
});

type ChangePasswordForm = yup.InferType<typeof changePasswordSchema>;

type ShowPasswordState = {
    currentPassword: boolean;
    newPassword: boolean;
    confirmPassword: boolean;
};

export default function ChangePasswordView() {
    const { showToast } = useToast();
    const { user, setUser } = useAuth();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [showPassword, setShowPassword] = useState<ShowPasswordState>({
        currentPassword: false,
        newPassword: false,
        confirmPassword: false,
    });

    const togglePasswordView = (field: keyof ShowPasswordState) => {
        setShowPassword(prev => ({ ...prev, [field]: !prev[field] }));
    };

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<ChangePasswordForm>({
        mode: "all",
        reValidateMode: "onChange",
        resolver: yupResolver(changePasswordSchema) as Resolver<ChangePasswordForm>,
        defaultValues: {
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
        },
    });

    const onSubmit = async (data: ChangePasswordForm) => {
        if (!user?.id) {
            showToast("error", "User not found. Please log in again.");
            return;
        }

        if (data.currentPassword !== user.password) {
            showToast("error", "Current password is incorrect.");
            return;
        }

        setIsLoading(true);
        try {
            const response = await api.put(`/users/${user.id}`, {
                password: data.newPassword,
            });

            if (response?.data) {
                setUser?.(prev => ({ ...prev!, ...response.data }));
                showToast("success", "Password changed successfully.");
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
                        <Text style={styles.title}>Change Password</Text>
                        <Text style={styles.subtitle}>
                            Enter your current password and choose a new one
                        </Text>
                    </View>
                    <View style={styles.form}>
                        <CustomTextInput
                            name="currentPassword"
                            control={control}
                            placeholder="Current password"
                            secureTextEntry={!showPassword.currentPassword}
                            icon={showPassword.currentPassword ? "eye-off" : "eye"}
                            onIconPress={() => togglePasswordView("currentPassword")}
                            error={Boolean(errors.currentPassword)}
                            helperText={errors.currentPassword?.message}
                        />
                        <CustomTextInput
                            name="newPassword"
                            control={control}
                            placeholder="New password"
                            secureTextEntry={!showPassword.newPassword}
                            icon={showPassword.newPassword ? "eye-off" : "eye"}
                            onIconPress={() => togglePasswordView("newPassword")}
                            error={Boolean(errors.newPassword)}
                            helperText={errors.newPassword?.message}
                        />
                        <CustomTextInput
                            name="confirmPassword"
                            control={control}
                            placeholder="Confirm new password"
                            secureTextEntry={!showPassword.confirmPassword}
                            icon={showPassword.confirmPassword ? "eye-off" : "eye"}
                            onIconPress={() => togglePasswordView("confirmPassword")}
                            error={Boolean(errors.confirmPassword)}
                            helperText={errors.confirmPassword?.message}
                        />
                        <CustomButton
                            style={{ paddingVertical: 4, marginTop: 10 }}
                            fullWidth
                            onPress={handleSubmit(onSubmit)}
                            disabled={isLoading}
                            loading={isLoading}
                            square
                        >
                            Change Password
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
        marginBottom: 24,
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