"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useGetProfileQuery } from "@/shared/api/ProfileApi/ProfileApi";
import { useRouter } from "next/navigation";

interface AuthContextType {
  token: string | null;
  setToken: (token: string | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedToken = localStorage.getItem("access_token");
    setToken(storedToken);
    
    const handleStorageChange = () => {
      setToken(localStorage.getItem("access_token"));
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  // Проверяем валидность токена если он задан
  const { isError, isLoading } = useGetProfileQuery(undefined, {
    skip: !token, // не делаем запрос, если токена нет
  });

  // Если токен невалиден — удаляем его и редиректим
  useEffect(() => {
    if (isError) {
      updateToken(null);
      router.push("/");
    }
  }, [isError]);

  const updateToken = (newToken: string | null) => {
    if (newToken) {
      localStorage.setItem("access_token", newToken);
    } else {
      localStorage.removeItem("access_token");
    }
    setToken(newToken);
    window.dispatchEvent(new Event("storage")); // Триггерим событие обновления
  };

  return <AuthContext.Provider value={{ token, setToken: updateToken }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
