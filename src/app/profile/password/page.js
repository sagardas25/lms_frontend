"use client";

import { useState } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

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
    <section className="w-full px-4 py-8 pt-1 md:py-12 md:pt-0 md:pl-2">
      <div className="max-w-2xl mx-auto bg-card p-6 md:p-8 rounded-lg shadow-sm border border-border">
        <h2 className="text-2xl font-bold text-primary mb-6">
          Update Your Password
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="flex flex-col gap-1">
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

          <div className="flex flex-col gap-1">
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

          <div className="flex flex-col gap-1">
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
            className="w-full md:w-auto"
          >
            {loading ? "Updating..." : "Update Password"}
          </Button>
        </form>
      </div>
    </section>
  );
}
