"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Mail, Upload, Save, ArrowLeft, CheckCircle } from "lucide-react";
import { toast } from "sonner";

export default function ProfileSettingsPage() {
  const router = useRouter();

  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    bio: "",
  });
  const [avatar, setAvatar] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8050/api/v1/user/current-user-profile",
        { withCredentials: true }
      );
      const data = res.data?.data;
      setUser(data);

      console.log("user name", data.fullName);

      setFormData({
        fullName: data.fullName,
        email: data.email,
        bio: data.bio || "",
      });
    } catch (err) {
      setError("Failed to fetch profile");
    } finally {
      setFetching(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatar(file);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const form = new FormData();
      form.append("fullName", formData.fullName);
      form.append("bio", formData.bio);
      if (avatar) form.append("avatar", avatar);

      await axios.patch(
        "http://localhost:8050/api/v1/user/update-profile",
        form,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      toast.success("Profile updated successfully!");

      await fetchUserProfile();
      setTimeout(() => {
        router.refresh();
      }, 2000);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-primary/5 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="h-[88vh] bg-gradient-to-br from-background via-muted/20 to-primary/5 p-4 pb-0  ">
      <div className="max-w-4xl mx-auto mt-20 z-10">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Overview */}
          <div className="lg:col-span-1">
            <Card className="border-2 border-border/50 shadow-2xl bg-card/95 backdrop-blur-sm">
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <Avatar className="w-24 h-24 border-4 border-primary/20">
                    <AvatarImage
                      src={user?.avatar || ""}
                      alt={user?.fullName}
                    />
                    <AvatarFallback className="text-2xl bg-gradient-to-r from-primary to-secondary text-primary-foreground">
                      {user?.fullName?.charAt(0) || "U"}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <CardTitle className="text-xl">{user?.fullName}</CardTitle>
                <CardDescription className="text-primary">
                  {user?.email}
                </CardDescription>
                <div className="mt-2">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                    {user?.role || "Student"}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 text-center">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Member since
                    </p>
                    <p className="font-medium">
                      {user?.createdAt
                        ? new Date(user.createdAt).toLocaleDateString()
                        : "—"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Courses enrolled
                    </p>
                    <p className="font-medium">{user?.coursesCount || "—"}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Profile Form */}
          <div className="lg:col-span-2">
            <Card className="border-2 border-border/50 shadow-2xl bg-card/95 backdrop-blur-sm">
              <CardHeader className="flex-col items-centre space-y-1">
                <CardTitle className="text-2xl text-center ">
                  Edit Profile
                </CardTitle>
                <CardDescription className="text-center text-muted-foreground">
                  Update your personal information and profile picture
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={onSubmit} className="space-y-6">
                  {/* {error && (
                    <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm">
                      {error}
                    </div>
                  )}

                  {success && (
                    <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20 text-green-600 text-sm flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4" />
                      <span>{success}</span>
                    </div>
                  )} */}

                  {/* Avatar Upload */}
                  <div className="space-y-1 m-0 pt-0 pb-4">
                    <Label className="text-sm font-medium">
                      Profile Picture
                    </Label>
                    <div className="flex items-center space-x-4">
                      <Avatar className="w-16 h-16 border-2 border-border">
                        <AvatarImage
                          src={
                            avatar
                              ? URL.createObjectURL(avatar)
                              : user?.avatar || ""
                          }
                          alt={formData.fullName}
                        />
                        <AvatarFallback className="bg-gradient-to-r from-primary to-secondary text-primary-foreground">
                          {formData.fullName?.charAt(0) || "U"}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <input
                          id="avatar"
                          type="file"
                          accept="image/*"
                          onChange={handleAvatarChange}
                          className="hidden"
                        />
                        <Label
                          htmlFor="avatar"
                          className="flex items-center space-x-2 p-3 border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-primary transition-colors"
                        >
                          <Upload className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">
                            {avatar
                              ? avatar.name
                              : "Click to upload new picture"}
                          </span>
                        </Label>
                      </div>
                    </div>
                  </div>

                  {/* Full Name */}
                  <div className="space-y-0">
                    <Label htmlFor="fullName" className="text-sm font-medium">
                      Full Name
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="fullName"
                        name="fullName"
                        type="text"
                        placeholder="Enter your full name"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        className="pl-10 border-2 focus:border-primary transition-colors"
                        required
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="space-y-0 m-0 pt-0 pb-4">
                    <Label htmlFor="email" className="text-sm font-medium">
                      Email Address
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        className="pl-10 border-2 bg-muted/50 cursor-not-allowed"
                        disabled
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Email cannot be changed
                    </p>
                  </div>

                  {/* Bio */}
                  <div className="space-y-0 m-0 pt-0 pb-4">
                    <Label htmlFor="bio" className="text-sm font-medium">
                      Bio
                    </Label>
                    <Textarea
                      id="bio"
                      name="bio"
                      placeholder="Tell us about yourself..."
                      value={formData.bio}
                      onChange={handleInputChange}
                      className="border-2 focus:border-primary transition-colors resize-none"
                      rows={4}
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-primary-foreground hover:shadow-lg hover:scale-101 transition-all duration-300"
                  >
                    {loading ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin"></div>
                        <span>Updating profile...</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <Save className="h-4 w-4" />
                        <span>Save Changes</span>
                      </div>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
