"use client";

import React from "react"

import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { Mail, Lock, Eye, EyeOff, User } from "lucide-react";
import AuthLayout from "@/components/AuthLayout";

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setIsLoading(true);

    try {
      const data = { name, email, password };

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
          credentials: "include",
        }
      );

      if (res.ok) {
        router.push("/login");
      } else {
        const errorData = await res.json();
        setError(errorData.message || "Registration failed");
      }
    } catch  {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Join Us"
      subtitle="Create your account and start your journey"
    >
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-balance" style={{ color: "#1f2937" }}>
          Create Account
        </h2>
        <p className="auth-text mt-2 text-sm sm:text-base">
          Sign up to get started
        </p>
      </div>

      {/* Form */}
      <form onSubmit={submit} className="space-y-5">
        {/* Name Field */}
        <div className="space-y-2 animate-fade-in-up" style={{ animationDelay: "100ms" }}>
          <label htmlFor="name" className="auth-label">
            Full Name
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 auth-icon h-5 w-5" />
            <input
              id="name"
              type="text"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full pl-10 pr-4 py-2.5 sm:py-3 bg-white rounded-lg auth-input"
              style={{ borderWidth: "1px" }}
            />
          </div>
        </div>

        {/* Email Field */}
        <div className="space-y-2 animate-fade-in-up" style={{ animationDelay: "150ms" }}>
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
          <p className="text-xs auth-text">
            Password must be at least 6 characters
          </p>
        </div>

        {/* Confirm Password Field */}
        <div className="space-y-2 animate-fade-in-up" style={{ animationDelay: "250ms" }}>
          <label htmlFor="confirmPassword" className="auth-label">
            Confirm Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 auth-icon h-5 w-5" />
            <input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full pl-10 pr-10 py-2.5 sm:py-3 bg-white rounded-lg auth-input"
              style={{ borderWidth: "1px" }}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 transition-colors duration-300"
              style={{ color: "#6b7280" }}
            >
              {showConfirmPassword ? (
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

        {/* Sign Up Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full font-semibold py-2.5 sm:py-3 rounded-lg animate-fade-in-up auth-button"
          style={{ animationDelay: "300ms" }}
        >
          {isLoading ? (
            <div className="flex items-center justify-center gap-2">
              <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Creating account...
            </div>
          ) : (
            "Create Account"
          )}
        </button>
      </form>

      {/* Divider */}
      <div className="mt-6 flex items-center gap-3 animate-fade-in-up" style={{ animationDelay: "400ms" }}>
        <div className="flex-1 h-px auth-divider" />
        <span className="text-xs auth-text">OR</span>
        <div className="flex-1 h-px auth-divider" />
      </div>

      {/* Sign In Link */}
      <div className="mt-6 text-center text-sm animate-fade-in-up" style={{ animationDelay: "500ms", color: "#6b7280" }}>
        Already have an account?{" "}
        <Link href="/login" className="auth-link font-semibold">
    Sign in
  </Link>
      </div>
    </AuthLayout>
  );
}
