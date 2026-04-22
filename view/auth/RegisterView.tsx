import CustomTextInput from "@/components/forms/CustomTextInput";
import LoginImageAnimation from "@/components/LoginImageAnimation";
import CustomButton from "@/components/shared/Button";
import { Colors } from "@/constants/Colors";
import { useToast } from "@/context/ToastContext";
import { useAuth } from "@/hooks/useAuth";
import { yupResolver } from "@hookform/resolvers/yup";
import { router } from "expo-router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    View
} from "react-native";
import * as yup from "yup";

const registerSchema = yup.object({
    name: yup.string().required("Name is required"),
    email: yup.string().email("Enter valid email").required("Email is required"),
    password: yup
        .string()
        .matches(/^[a-zA-Z0-9]+$/, "Only letters and numbers allowed")
        .min(6)
        .required(),
    avatar: yup.string().url("Enter valid image URL").optional(),
});

type RegisterForm = {
    name: string;
    email: string;
    password: string;
    avatar?: string | undefined;
};

export default function RegisterView() {
    const { showToast } = useToast();
    const { register } = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        mode: "all",
        reValidateMode: "onChange",
        resolver: yupResolver(registerSchema),
    });

    const onSubmit = async (data: RegisterForm) => {
        setIsLoading(true)
        try {
            const response: any = await register(
                data.name,
                data.email,
                data.password,
                data?.avatar || "https://i.pravatar.cc/300",
            );
            if (response?.data) {
                showToast("success", "Account created successfully. Please log in to continue.");
                router.push("/(auth)/login");
            }
        } catch (err: any) {
            const msg = err?.response?.data?.message?.[0] || err?.response?.data?.message || err?.message || "Something went wrong";
            console.log("REGISTER ERROR:", msg);
            showToast("error", msg);
        } finally {
            setIsLoading(false)
        }
    };

    return (
        <KeyboardAvoidingView
            style={styles.wrapper}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
            <StatusBar barStyle="dark-content" />
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                keyboardShouldPersistTaps="handled"
            >
                <LoginImageAnimation />
                <View style={styles.container}>
                    <View style={styles.content}>
                        <View style={styles.header}>
                            <Text style={styles.title}>
                                Create account
                            </Text>
                            <Text style={styles.subtitle}>
                                Join us and start exploring premium fashion
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
                                name="password"
                                control={control}
                                placeholder="Password"
                                error={Boolean(errors.password)}
                                helperText={errors.password?.message}
                                secureTextEntry={!showPassword}
                                icon={showPassword ? "eye-off" : "eye"}
                                onIconPress={() => setShowPassword(p => !p)}
                            />
                            <CustomTextInput
                                name="avatar"
                                control={control}
                                placeholder="Avatar URL (optional)"
                                error={Boolean(errors.avatar)}
                                helperText={errors.avatar?.message}
                            />
                            <CustomButton style={{ paddingVertical: 4, marginTop: 10 }} fullWidth onPress={handleSubmit(onSubmit)} disabled={isLoading} loading={isLoading} square>
                                Create account
                            </CustomButton>
                            <View style={styles.footer}>
                                <Text style={styles.signupText}>
                                    Already have an account?{" "}
                                    <Text
                                        style={styles.signupHighlight}
                                        onPress={() => router.push("/(auth)/login")}
                                    >
                                        Sign in
                                    </Text>
                                </Text>
                            </View>
                        </View>
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
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        paddingHorizontal: 24,
        paddingBottom: 50,
        justifyContent: "space-between",
    },
    header: {
        marginTop: 10,
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
        marginTop: 16,
        gap: 14,
    },
    button: {
        backgroundColor: Colors.orange.theme,
        height: 52,
        borderRadius: 14,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 8,
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontFamily: "Rubik-SemiBold",
    },
    footer: {
        marginTop: 18,
        alignItems: "center",
    },
    signupText: {
        fontSize: 13,
        color: "#444",
    },
    signupHighlight: {
        color: Colors.orange.theme,
        fontFamily: "Rubik-SemiBold",
    },
});