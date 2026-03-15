"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

type Mode = "login" | "signup" | null;

const TAGLINE = "An Intelligent Academic Planner Designed to Help Modern Students Organize, Plan, and Achieve Their Academic Goals Efficiently.";

export default function LoginPage() {
  const router = useRouter();
  const { login, signup } = useAuth();
  const [mode, setMode] = useState<Mode>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [typewriterText, setTypewriterText] = useState("");
  const [typewriterDone, setTypewriterDone] = useState(false);

  useEffect(() => {
    if (typewriterDone) return;
    if (typewriterText.length < TAGLINE.length) {
      const t = setTimeout(() => {
        setTypewriterText(TAGLINE.slice(0, typewriterText.length + 1));
      }, 45);
      return () => clearTimeout(t);
    }
    setTypewriterDone(true);
  }, [typewriterText, typewriterDone]);

  function clearForm() {
    setError("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  }

  function openLogin() {
    setMode("login");
    clearForm();
  }

  function openSignup() {
    setMode("signup");
    clearForm();
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const result = await login(email, password);
    setLoading(false);
    if (result.ok) {
      router.replace("/");
      return;
    }
    setError(result.error || "Login failed");
  }

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setLoading(true);
    const result = await signup(email, password);
    setLoading(false);
    if (result.ok) {
      router.replace("/");
      return;
    }
    setError(result.error || "Sign up failed");
  }

  return (
    <div className="min-h-screen bg-[#FDFDFD] flex flex-col">
      {/* Top right: Login and Sign up */}
      <header className="absolute top-0 right-0 p-6 flex items-center gap-3">
        <button
          type="button"
          onClick={openLogin}
          className="font-medium text-gray-800 hover:text-teal-700 bg-white/80 hover:bg-teal-50/90 border border-gray-200 hover:border-teal-200 rounded-lg px-4 py-2 shadow-sm transition-colors"
        >
          Login
        </button>
        <button
          type="button"
          onClick={openSignup}
          className="font-medium text-gray-800 hover:text-teal-700 bg-white/80 hover:bg-teal-50/90 border border-gray-200 hover:border-teal-200 rounded-lg px-4 py-2 shadow-sm transition-colors"
        >
          Sign up
        </button>
      </header>

      {/* Center hero: Uniplanner centered, tagline left-aligned with it */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 pt-20">
        <div className="grid justify-items-center w-full max-w-6xl">
          <h1 className="text-[4.5rem] sm:text-[6rem] md:text-[8rem] lg:text-[8rem] xl:text-[14rem] font-bold text-black tracking-tight leading-[0.85] select-none text-center">
            Uniplanner.
          </h1>
          <p className="w-full justify-self-start mt-4 sm:mt-6 md:mt-8 lg:mt-10 text-[#134e4a] font-normal text-sm sm:text-base md:text-lg lg:text-xl min-h-[1.5em]">
            <span className="whitespace-nowrap">{typewriterText}</span>
            {!typewriterDone && (
              <span className="inline-block w-0.5 h-[0.9em] bg-[#134e4a] ml-0.5 animate-pulse align-middle" aria-hidden />
            )}
          </p>
          {/* Sign up button centered under the text, arrow inside button in white */}
          <div className="w-full flex justify-center mt-8 sm:mt-10">
            <button
              type="button"
              onClick={openSignup}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#134e4a] text-white font-semibold hover:bg-[#0f3d3a] active:scale-95 transition-all duration-150 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#134e4a] focus:ring-offset-2"
            >
                Sign up
              <span aria-hidden>→</span>
            </button>
          </div>
        </div>

        {/* Blur overlay + centered form when Login or Sign up is clicked */}
        {mode !== null && (
          <div
            className="fixed inset-0 z-10 flex items-center justify-center p-4 bg-black/20 backdrop-blur-md"
            onClick={(e) => e.target === e.currentTarget && (setMode(null), clearForm())}
            role="dialog"
            aria-modal="true"
            aria-label="Login or Sign up"
          >
            <div
              className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-100 p-10 relative"
              onClick={(e) => e.stopPropagation()}
            >
            <button
              type="button"
              onClick={() => { setMode(null); clearForm(); }}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
              aria-label="Close"
            >
              ×
            </button>
            <div className="flex rounded-lg bg-gray-100 p-1 mb-6">
              <button
                type="button"
                onClick={() => {
                  setMode("login");
                  clearForm();
                }}
                className={`flex-1 py-2 rounded-md text-sm font-medium transition-colors ${
                  mode === "login"
                    ? "bg-white text-teal-700 shadow"
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                Sign in
              </button>
              <button
                type="button"
                onClick={() => {
                  setMode("signup");
                  clearForm();
                }}
                className={`flex-1 py-2 rounded-md text-sm font-medium transition-colors ${
                  mode === "signup"
                    ? "bg-white text-teal-700 shadow"
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                Sign up
              </button>
            </div>

            {mode === "login" ? (
              <form onSubmit={handleLogin} className="flex flex-col gap-4">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="email"
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition"
                    placeholder="Enter email"
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoComplete="current-password"
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition"
                    placeholder="Enter password"
                  />
                </div>
                {error && (
                  <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">
                    {error}
                  </p>
                )}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full mt-2 py-3 rounded-lg bg-teal-600 text-white font-semibold hover:bg-teal-700 disabled:opacity-50 transition"
                >
                  {loading ? "Signing in…" : "Sign in"}
                </button>
              </form>
            ) : (
              <form onSubmit={handleSignup} className="flex flex-col gap-4">
                <div>
                  <label
                    htmlFor="signup-email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email
                  </label>
                  <input
                    id="signup-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="email"
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition"
                    placeholder="Enter email"
                  />
                </div>
                <div>
                  <label
                    htmlFor="signup-password"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Password
                  </label>
                  <input
                    id="signup-password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoComplete="new-password"
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition"
                    placeholder="Create password"
                  />
                </div>
                <div>
                  <label
                    htmlFor="confirm-password"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Confirm password
                  </label>
                  <input
                    id="confirm-password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    autoComplete="new-password"
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition"
                    placeholder="Confirm password"
                  />
                </div>
                {error && (
                  <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">
                    {error}
                  </p>
                )}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full mt-2 py-3 rounded-lg bg-teal-600 text-white font-semibold hover:bg-teal-700 disabled:opacity-50 transition"
                >
                  {loading ? "Creating account…" : "Sign up"}
                </button>
              </form>
            )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
