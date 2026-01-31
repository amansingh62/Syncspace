"use client";

import React from "react";
import { useState } from "react";
import Link from "next/link";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import AuthLayout from "@/components/AuthLayout";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const data = { email, password };

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
          credentials: "include",
        }
      );

      if (res.ok) {
        router.push("/app");
      } else {
        setError("Invalid email or password");
      }
    } catch {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Your journey continues here"
    >
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-balance" style={{ color: "#1f2937" }}>
           Log In
        </h2>
        <p className="auth-text mt-2 text-sm sm:text-base">
          Sign in to your account to continue
        </p>
      </div>

      {/* Form */}
      <form onSubmit={submit} className="space-y-5">
        {/* Email Field */}
        <div className="space-y-2 animate-fade-in-up" style={{ animationDelay: "100ms" }}>
          <label htmlFor="email" className="auth-label">
            Email Address
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 auth-icon h-5 w-5" />
            <input
              id="email"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full pl-10 pr-4 py-2.5 sm:py-3 bg-white rounded-lg auth-input"
              style={{ borderWidth: "1px" }}
            />
          </div>
        </div>

        {/* Password Field */}
        <div className="space-y-2 animate-fade-in-up" style={{ animationDelay: "200ms" }}>
          <label htmlFor="password" className="auth-label">
            Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 auth-icon h-5 w-5" />
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full pl-10 pr-10 py-2.5 sm:py-3 bg-white rounded-lg auth-input"
              style={{ borderWidth: "1px" }}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 transition-colors duration-300"
              style={{ color: "#6b7280" }}
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="p-3 rounded-lg text-sm" style={{ backgroundColor: "#fee2e2", borderWidth: "1px", borderColor: "#fecaca", color: "#dc2626" }}>
            {error}
          </div>
        )}

        {/* Forgot Password */}
        <div className="flex justify-end">
          <Link href="/forgot-password" className="auth-link text-sm font-medium">
            Forgot password?
          </Link>
        </div>

        {/* Login Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full font-semibold py-2.5 sm:py-3 rounded-lg animate-fade-in-up auth-button"
          style={{ animationDelay: "300ms" }}
        >
          {isLoading ? (
            <div className="flex items-center justify-center gap-2">
              <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Signing in...
            </div>
          ) : (
            "Sign In"
          )}
        </button>
      </form>

      {/* Divider */}
      <div className="mt-6 flex items-center gap-3 animate-fade-in-up" style={{ animationDelay: "400ms" }}>
        <div className="flex-1 h-px auth-divider" />
        <span className="text-xs auth-text">OR</span>
        <div className="flex-1 h-px auth-divider" />
      </div>

      {/* Sign Up Link */}
      <div className="mt-6 text-center text-sm animate-fade-in-up" style={{ animationDelay: "500ms", color: "#6b7280" }}>
        Dont have an account?{" "}
        <Link href="/register" className="auth-link font-semibold">
          Create one
        </Link>
      </div>
    </AuthLayout>
  );
}
