"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Player } from "@lottiefiles/react-lottie-player";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    fullName: "",
    gender: "",
    country: "",
    phoneNumber: "",
    email: "",
    password: "",
  });

  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const handleAvatarChange = (e) => {
    setAvatar(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = new FormData();
      Object.keys(form).forEach((key) => data.append(key, form[key]));
      if (avatar) data.append("avatar", avatar);

      await axios.post("http://localhost:8050/api/v1/auth/register", data, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      toast.success("Registration successful!");
      router.push("/auth/login");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex-grow flex items-center h-[100vh] justify-center bg-gradient-to-br from-slate-100 to-white overflow-hidden pt-20 group">
      {/* Blobs */}
      <div className="absolute top-[-6rem] left-[-6rem] w-[30rem] h-[30rem] bg-[#0c5c55]  opacity-10 rounded-full blur-[120px] mix-blend-multiply animate-blob-fast transition duration-300 ease-in-out group-hover:scale-110 group-hover:opacity-60"></div>
      <div className="absolute bottom-[-6rem] right-[-6rem] w-[30rem] h-[30rem] bg-[#0c5c55] opacity-20 rounded-full blur-[120px] mix-blend-multiply animate-blob-slow transition duration-300 ease-in-out group-hover:scale-110 group-hover:opacity-60"></div>

      <div className="z-10 w-full max-w-screen-xl px-4 md:px-10 flex flex-col lg:flex-row items-center justify-between pb-12 pt-0 md:pt-10">
        {/* Lottie */}
        <div className="hidden lg:flex flex-1 items-center justify-center">
          <Player
            //src="https://lottie.host/16634aab-1f36-4ab9-acec-b604846b1fa4/hkJYGxwafl.json"
            src="/animation/register.json"
            autoplay
            loop
            style={{ width: "90%", maxWidth: "450px" }}
          />
        </div>

        {/* Register Form */}
        <div className="flex-1 w-full max-w-md bg-white shadow-xl rounded-2xl p-8 border border-gray-200">
          <h1 className="text-3xl font-bold text-primary text-center mb-6">
            Create Account
          </h1>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <Label htmlFor="fullName" className="pb-1">
                Full Name
              </Label>
              <Input
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label htmlFor="gender" className="pb-1">
                Gender
              </Label>
              <Select
                onValueChange={(val) => handleSelectChange("gender", val)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="avatar" className="pb-1">
                Avatar
              </Label>
              <Input
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="cursor-pointer"
              />
            </div>

            <div>
              <Label htmlFor="phoneNumber" className="pb-1">
                Phone Number
              </Label>
              <Input
                name="phoneNumber"
                value={form.phoneNumber}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label htmlFor="email" className="pb-1">
                Email
              </Label>
              <Input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label htmlFor="password" className="pb-1">
                Password
              </Label>
              <Input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-white hover:bg-primary/90"
            >
              {loading ? "Registering..." : "Sign Up"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
