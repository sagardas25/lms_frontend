"use client";

import { useState } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

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
      await axios.post(
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
    <section className="relative min-h-screen bg-white/30 flex items-center justify-center overflow-hidden rounded-lg  my-1 mx-4 sm:px-0">
      {/* blob */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-0 left-0 w-72 h-72 bg-gradient-to-br from-[#0c5c55] to-[#7ec8c4] rounded-full blur-[120px] opacity-50" />
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-gradient-to-br from-[#0c5c55] to-[#7ec8c4] rounded-full blur-[120px] opacity-50" />
      </div>
      {/* Form Card */}
      <div className="w-full max-w-2xl bg-white/50  dark:bg-black/30 border border-white/60  rounded-2xl shadow-xl p-6 my-auto sm:p-8">
        <h2 className="text-3xl font-bold text-center text-[#0c5c55] mb-6">
          Update Your Password
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1.5">
            <label
              htmlFor="oldPassword"
              className="text-sm font-semibold text-[#0c5c55]"
            >
              Current Password
            </label>
            <Input
              id="oldPassword"
              name="oldPassword"
              type="password"
              className="bg-white/80 backdrop-blur border border-white/30"
              placeholder="Enter current password"
              value={formData.oldPassword}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="newPassword"
              className="text-sm font-semibold text-[#0c5c55]"
            >
              New Password
            </label>
            <Input
              id="newPassword"
              name="newPassword"
              type="password"
              className="bg-white/80 backdrop-blur border border-white/30"
              placeholder="Enter new password"
              value={formData.newPassword}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="confirmPassword"
              className="text-sm font-semibold text-[#0c5c55]"
            >
              Confirm New Password
            </label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              className="bg-white/80 backdrop-blur border border-white/30"
              placeholder="Re-enter new password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className={cn(
              "w-full mt-4 bg-[#0c5c55] hover:bg-[#094741] text-white"
            )}
          >
            {loading ? "Updating..." : "Update Password"}
          </Button>
        </form>
      </div>
    </section>
  );
}
