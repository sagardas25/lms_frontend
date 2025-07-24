"use client";

import { useState } from "react";
import axios from "axios";
import AuthForm from "@/components/AuthForm";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg("");
    try {
      await axios.post(
        "http://localhost:8050/api/v1/auth/login",
        { email, password },
        { withCredentials: true }
      );
      // router.push("/");
      window.location.href = "/";
    } catch (err) {
      setMsg(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthForm>
      <h2 className="text-2xl font-semibold text-primary mb-6">Welcome Back</h2>
      {msg && <p className="mb-4 text-textSecondary">{msg}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Email Address"
          required
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-light"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          required
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-light"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          type="submit"
          className="w-full bg-primary text-white hover:bg-primaryLight !py-3"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </Button>
      </form>
      <div className="flex justify-between items-center mt-4 text-textSecondary">
        <a href="/auth/forgot-password" className="text-primary underline">
          Forgot password?
        </a>
        <a href="register" className="text-primary underline">
          Sign Up
        </a>
      </div>
    </AuthForm>
  );
}
