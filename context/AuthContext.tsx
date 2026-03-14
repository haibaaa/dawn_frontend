"use client";

import React, { createContext, useCallback, useContext, useEffect, useState } from "react";

const AUTH_COOKIE = "auth_token";
const USER_COOKIE = "auth_user";

type AuthUser = { username?: string; email?: string } | null;

type AuthContextType = {
  user: AuthUser;
  token: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ ok: boolean; error?: string }>;
  signup: (email: string, password: string) => Promise<{ ok: boolean; error?: string }>;
  logout: () => void;
  isAuthenticated: boolean;
};

function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? decodeURIComponent(match[2]) : null;
}

function setCookie(name: string, value: string, days = 7) {
  const d = new Date();
  d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${encodeURIComponent(value)};path=/;expires=${d.toUTCString()};SameSite=Lax`;
}

function deleteCookie(name: string) {
  document.cookie = `${name}=;path=/;expires=Thu, 01 Jan 1970 00:00:00 GMT`;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const t = getCookie(AUTH_COOKIE);
    const u = getCookie(USER_COOKIE);
    if (t) setToken(t);
    if (u) try { setUser(JSON.parse(u)); } catch { setUser({ username: u }); }
    setIsLoading(false);
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        return { ok: false, error: data.detail || data.message || "Login failed" };
      }
      const authToken = data.token ?? data.access_token ?? data.access;
      if (!authToken) {
        return { ok: false, error: "No token in response" };
      }
      setCookie(AUTH_COOKIE, authToken);
      const userPayload = data.user ?? { email: data.email ?? email };
      setUser(userPayload);
      setCookie(USER_COOKIE, JSON.stringify(userPayload));
      setToken(authToken);
      return { ok: true };
    } catch (e) {
      return { ok: false, error: (e as Error).message || "Network error" };
    }
  }, []);

  const signup = useCallback(async (email: string, password: string) => {
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        return { ok: false, error: data.detail || data.message || "Sign up failed" };
      }
      const authToken = data.token ?? data.access_token ?? data.access;
      if (authToken) {
        setCookie(AUTH_COOKIE, authToken);
        const userPayload = data.user ?? { email: data.email ?? email };
        setUser(userPayload);
        setCookie(USER_COOKIE, JSON.stringify(userPayload));
        setToken(authToken);
      }
      return { ok: true };
    } catch (e) {
      return { ok: false, error: (e as Error).message || "Network error" };
    }
  }, []);

  const logout = useCallback(() => {
    deleteCookie(AUTH_COOKIE);
    deleteCookie(USER_COOKIE);
    setToken(null);
    setUser(null);
    if (typeof window !== "undefined") window.location.href = "/login";
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        login,
        signup,
        logout,
        isAuthenticated: !!token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
