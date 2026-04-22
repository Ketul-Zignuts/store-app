import api from "@/axios/axios";
import { AuthTokens, User } from "@/context/types/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useEffect, useState } from "react";

interface AuthContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>
  tokens: AuthTokens | null;
  setTokens: React.Dispatch<React.SetStateAction<AuthTokens | null>>
  loading: boolean;
  isAuthenticated: boolean;
  isFirstLaunch: boolean | null;
  register: (name: string, email: string, password: string, avatar: string) => any;
  logout: () => Promise<void>;
  completeOnboarding: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | null>(null);

type Props = {
  children: React.ReactNode;
};

export const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User | null>(null);
  const [tokens, setTokens] = useState<AuthTokens | null>(null);
  const [loading, setLoading] = useState(true);
  const [isFirstLaunch, setIsFirstLaunch] = useState<boolean | null>(null);

  const isAuthenticated = !!user;

  const register = async (name: string, email: string, password: string, avatar: string) => {
    try {
      const response = await api.post("/users", {
        name,
        email,
        password,
        avatar: avatar,
      });
      return response
    } catch (error) {
      console.log("Register error:", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      setUser(null);
      setTokens(null);
      await AsyncStorage.removeItem("tokens");
    } catch (error) {
      console.log("Logout error:", error);
    }
  };

  const completeOnboarding = async () => {
    try {
      await AsyncStorage.setItem("onboarding_done", "true");
      setIsFirstLaunch(false);
    } catch (error) {
      console.log("Onboarding error:", error);
    }
  };

  useEffect(() => {
    const init = async () => {
      try {
        const onboarding = await AsyncStorage.getItem("onboarding_done");
        setIsFirstLaunch(onboarding !== "true");
        const stored = await AsyncStorage.getItem("tokens");
        if (stored) {
          const parsed: AuthTokens = JSON.parse(stored);
          setTokens(parsed);
          try {
            const profileRes = await api.get("/auth/profile");
            setUser(profileRes.data);
          } catch (error) {
            console.log("Profile fetch failed, logging out...", error);
            await logout();
          }
        }
      } catch (error) {
        console.log("Init error:", error);
      } finally {
        setLoading(false);
      }
    };

    init();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        tokens,
        setTokens,
        loading,
        isAuthenticated,
        isFirstLaunch,
        register,
        logout,
        completeOnboarding,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};