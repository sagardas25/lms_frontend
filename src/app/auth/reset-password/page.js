"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import axios from "axios";
import AuthForm from "@/components/AuthForm";
import { Button } from "@/components/ui/button";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/api/v1/auth/reset-password", {
        token,
        password,
      });
      setMsg("Password reset successful! Redirecting to login...");
      setTimeout(() => router.push("/login"), 2000);
    } catch {
      setMsg("Error resetting password.");
    }
  };

  return (
    <AuthForm>
      <h2 className="text-2xl font-semibold text-primary mb-6">Reset Password</h2>
      {msg && <p className="mb-4 text-textSecondary">{msg}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="password"
          placeholder="New Password"
          required
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-light"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button className="w-full bg-primary text-white hover:bg-primaryLight !py-3">
          Reset Password
        </Button>
      </form>
    </AuthForm>
  );
}
