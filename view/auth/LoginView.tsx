import api from "@/axios/axios";
import CustomTextInput from "@/components/forms/CustomTextInput";
import LoginImageAnimation from "@/components/LoginImageAnimation";
import CustomButton from "@/components/shared/Button";
import { Colors } from "@/constants/Colors";
import { useToast } from "@/context/ToastContext";
import { AuthTokens } from "@/context/types/auth";
import { useAuth } from "@/hooks/useAuth";
import { yupResolver } from "@hookform/resolvers/yup";
import AsyncStorage from "@react-native-async-storage/async-storage";
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

const authLoginSchema = yup.object({
    email: yup
        .string()
        .required("Email is required")
        .email("Enter a valid email"),
    password: yup
        .string()
        .matches(/^[a-zA-Z0-9]+$/, "Only letters and numbers allowed")
        .min(6)
        .required(),
});

type LoginForm = {
    email: string;
    password: string;
};

export default function LoginView() {
    const { setTokens, setUser } = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { showToast } = useToast();

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginForm>({
        mode: "all",
        reValidateMode: "onChange",
        resolver: yupResolver(authLoginSchema),
    });

    const onSubmit = async (data: LoginForm) => {
        setIsLoading(true)
        try {
            const res = await api.post("/auth/login", { email: data?.email, password: data?.password });
            const tokenData: AuthTokens = res.data;
            setTokens(tokenData);
            await AsyncStorage.setItem("tokens", JSON.stringify(tokenData));
            const profileRes = await api.get("/auth/profile");
            setUser(profileRes.data);
            showToast("success", "Login successfull");
            router.replace("/(tabs)/home")
        } catch (err: any) {
            let msg = "Something went wrong";
            if (err?.response?.data?.statusCode) {
                msg = "Invalid credentials";
            } else {
                msg = err?.response?.data?.message?.[0] || err?.response?.data?.message || err?.message || "Something went wrong";
            }
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
                                Welcome back
                            </Text>
                            <Text style={styles.subtitle}>
                                Sign in to continue to your account
                            </Text>
                        </View>
                        <View style={styles.form}>
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
                            <CustomButton style={{ paddingVertical: 4, marginTop: 10 }} fullWidth onPress={handleSubmit(onSubmit)} disabled={isLoading} loading={isLoading} square>
                                Login
                            </CustomButton>
                            <View style={styles.footer}>
                                <Text style={styles.linkText}>
                                    Forgot password?
                                </Text>
                                <Text style={styles.signupText}>
                                    Don’t have an account?{" "}
                                    <Text
                                        style={styles.signupHighlight}
                                        onPress={() => router.push("/(auth)/register")}
                                    >
                                        Sign up
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
        paddingBottom: 60,
        justifyContent: "space-between",
    },

    header: {
        marginTop: 10,
    },
    title: {
        fontSize: 34,
        fontFamily: "Rubik-Bold",
        color: "#111",
        lineHeight: 40
    },
    subtitle: {
        fontSize: 15,
        fontFamily: "Rubik-Regular",
        color: "#666"
    },
    form: {
        marginTop: 10,
        gap: 14,
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontFamily: "Rubik-SemiBold",
        letterSpacing: 0.2,
    },
    footer: {
        marginTop: 18,
        alignItems: "center",
        gap: 10,
    },
    linkText: {
        fontSize: 13,
        color: "#666",
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