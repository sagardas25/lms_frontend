"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import axios from "axios";
import { Loader2 } from "lucide-react";

export default function UpdateProfilePage() {
  const [formData, setFormData] = useState({
    fullName: "",
    bio: "",
    email: "",
  });

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8050/api/v1/user/current-user-profile",
          { withCredentials: true }
        );
        const { fullName, bio, email } = res.data?.data || {};
        setFormData({ fullName, bio, email });
      } catch (error) {
        toast.error("Failed to fetch user details");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);
    try {
      const form = new FormData();
      form.append("fullName", formData.fullName);
      form.append("bio", formData.bio);

      const res = await axios.patch(
        "http://localhost:8050/api/v1/user/update-profile",
        form,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to update profile"
      );
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <Loader2 className="animate-spin h-6 w-6 text-primary" />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-primary">Update Profile</h1>
        <p className="text-muted-foreground text-sm">
          Keep your profile up-to-date.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="fullName" className="text-sm font-medium">
              Full Name
            </label>
            <Input
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Your full name"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email (read-only)
            </label>
            <Input
              id="email"
              name="email"
              value={formData.email}
              disabled
              className="bg-muted cursor-not-allowed"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="bio" className="text-sm font-medium">
            Bio
          </label>
          <Textarea
            id="bio"
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            placeholder="Tell us something about yourself"
            rows={4}
          />
        </div>

        <Button
          type="submit"
          className="w-full sm:w-auto"
          disabled={updating}
        >
          {updating ? (
            <>
              <Loader2 className="animate-spin mr-2 h-4 w-4" />
              Saving...
            </>
          ) : (
            "Update Profile"
          )}
        </Button>
      </form>
    </div>
  );
}
