"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    avatar: null,
  });
  const [loading, setLoading] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8050/api/v1/user/current-user-profile",
          {
            withCredentials: true,
          }
        );

        if (res.data?.data) {
          // User is logged in
          router.replace("/"); // redirect to homepage
        } else {
          setCheckingAuth(false);
        }
      } catch (err) {
        // Not logged in
        setCheckingAuth(false);
      }
    };

    checkAuth();
  }, [router]);

  if (checkingAuth) return null;

  const handleChange = (e) => {
    if (e.target.name === "avatar") {
      setForm({ ...form, avatar: e.target.files[0] });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.avatar) return alert("Avatar is required");

    const formData = new FormData();
    formData.append("fullName", form.fullName);
    formData.append("email", form.email);
    formData.append("password", form.password);
    formData.append("avatar", form.avatar);

    try {
      setLoading(true);
      await axios.post("http://localhost:8050/api/v1/auth/register", formData);
      router.push("/auth/login");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md space-y-4 bg-white p-6 rounded-2xl shadow-md"
      >
        <h2 className="text-2xl font-semibold text-primary text-center">
          Register
        </h2>
        <Input
          name="fullName"
          placeholder="Full Name"
          onChange={handleChange}
          required
        />
        <Input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />
        <Input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />
        <Input
          type="file"
          name="avatar"
          accept="image/*"
          onChange={handleChange}
          required
        />
        <Button className="w-full bg-primary text-white" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </Button>
      </form>
    </div>
  );
}
