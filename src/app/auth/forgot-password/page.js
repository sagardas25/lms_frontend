"use client";

import { useState } from "react";
import axios from "axios";
import AuthForm from "@/components/AuthForm";
import { Button } from "@/components/ui/button";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/api/v1/auth/forgot-password", { email });
      setMsg("A reset link has been sent to your email.");
    } catch {
      setMsg("Error sending reset link.");
    }
  };

  return (
    <AuthForm>
      <h2 className="text-2xl font-semibold text-primary mb-6">Forgot Password</h2>
      {msg && <p className="mb-4 text-textSecondary">{msg}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Your Email"
          required
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-light"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button className="w-full bg-primary text-white hover:bg-primaryLight !py-3">
          Send Reset Link
        </Button>
      </form>
    </AuthForm>
  );
}
