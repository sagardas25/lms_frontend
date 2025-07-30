"use client";

import { useState } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Image from "next/image";
// import bgBlob from "@/public/blob-bg.svg"; // You can use the same blob SVG as in login/register

export default function UpdatePasswordPage() {
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("New password and confirm password do not match");
      return;
    }

    try {
      setLoading(true);
      await axios.put(
        "http://localhost:8050/api/v1/auth/update-password",
        {
          oldPassword: formData.oldPassword,
          newPassword: formData.newPassword,
        },
        { withCredentials: true }
      );

      toast.success("Password updated successfully");
      setFormData({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to update password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative min-h-screen w-full flex items-center justify-center bg-[#f7fdfc] overflow-hidden">
      {/* Background Blob */}
      <div className="absolute inset-0 -z-10">
        <Image
          src={bgBlob}
          alt="Background"
          className="object-cover w-full h-full opacity-50"
          priority
        />
        <div className="absolute inset-0 bg-white/50 backdrop-blur-sm" />
      </div>

      {/* Form Card */}
      <div className="w-full max-w-md bg-white/60 backdrop-blur-lg border border-border rounded-xl shadow-lg p-6 sm:p-8">
        <h2 className="text-2xl sm:text-3xl font-semibold text-center text-[#0c5c55] mb-6">
          Update Your Password
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label htmlFor="oldPassword" className="text-sm font-medium text-muted-foreground">
              Current Password
            </label>
            <Input
              id="oldPassword"
              name="oldPassword"
              type="password"
              placeholder="Enter current password"
              value={formData.oldPassword}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="newPassword" className="text-sm font-medium text-muted-foreground">
              New Password
            </label>
            <Input
              id="newPassword"
              name="newPassword"
              type="password"
              placeholder="Enter new password"
              value={formData.newPassword}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="confirmPassword" className="text-sm font-medium text-muted-foreground">
              Confirm New Password
            </label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="Re-enter new password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full mt-2"
          >
            {loading ? "Updating..." : "Update Password"}
          </Button>
        </form>
      </div>
    </section>
  );
}
