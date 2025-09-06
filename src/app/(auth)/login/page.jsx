"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Player } from "@lottiefiles/react-lottie-player";
import { toast } from "sonner";
import { Mail, Lock } from "lucide-react"; // 🔹 Lucide icons

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8050/api/v1/user/current-user-profile",
          { withCredentials: true }
        );

        if (res.data?.data) {
          router.replace("/");
        } else {
          setCheckingAuth(false);
        }
      } catch (err) {
        setCheckingAuth(false);
      }
    };

    checkAuth();
  }, [router]);

  if (checkingAuth) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(
        "http://localhost:8050/api/v1/auth/login",
        { email, password },
        { withCredentials: true }
      );
      toast.success("Login successful!");
      window.location.href = "/";
    } catch (err) {
      toast.error(err?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex-grow flex items-center justify-center h-[100vh] bg-gradient-to-br from-slate-100 to-white overflow-hidden pt-0 group">
      {/* Blobs */}
      <div className="absolute top-[-6rem] left-[-6rem] w-[30rem] h-[30rem] bg-[#0c5c55] opacity-10 rounded-full blur-[120px] mix-blend-multiply animate-blob-fast" />
      <div className="absolute bottom-[-6rem] right-[-6rem] w-[30rem] h-[30rem] bg-[#0c5c55] opacity-20 rounded-full blur-[120px] mix-blend-multiply animate-blob-slow" />

      <div className="z-10 w-full max-w-screen-xl px-4 md:px-10 flex flex-col lg:flex-row items-center justify-between">
        {/* Lottie */}
        <div className="hidden lg:flex flex-1 items-center justify-center">
          <Player
            src="/animation/login.json"
            autoplay
            loop
            style={{ width: "90%", maxWidth: "450px" }}
          />
        </div>

        <div className="flex-1 w-full max-w-md bg-white shadow-xl rounded-2xl p-8 border border-gray-200">
          <h1 className="text-3xl font-bold text-primary text-center mb-6">
            Welcome Back
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <Label htmlFor="email" className="pb-1">
                Email
              </Label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="pl-10"
                />
              </div>
            </div>

            <div className="relative">
              <Label htmlFor="password" className="pb-1">
                Password
              </Label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  id="password"
                  type="password"
                  name="password"
                  placeholder="enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="pl-10"
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-white hover:bg-primary/90"
            >
              {loading ? "Logging in..." : "Login"}
            </Button>
          </form>

          <div className="flex justify-between items-center mt-4 text-sm text-muted-foreground">
            <a href="/forgot-password" className="text-primary underline">
              Forgot password?
            </a>
            <a href="/register" className="text-primary underline">
              Sign Up
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
