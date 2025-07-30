"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";

export default function ProfileOverview() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8050/api/v1/user/current-user-profile",
          { withCredentials: true }
        );
        if (!res?.data?.data) {
          router.push("/auth/login");
          return;
        }
        setUser(res.data.data);
      } catch (err) {
        console.error("Profile fetch error", err);
        router.push("/auth/login");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [router]);

  if (loading) {
    return (
      <div className="relative w-full min-h-[80vh] px-4 py-10">
        {/* Loading Blobs */}
        <div className="absolute top-[-6rem] left-[-6rem] w-[30rem] h-[30rem] bg-rose-400 opacity-25 rounded-full blur-[140px] mix-blend-multiply animate-blob-fast" />
        <div className="absolute bottom-[-6rem] right-[-6rem] w-[30rem] h-[30rem] bg-rose-300 opacity-25 rounded-full blur-[140px] mix-blend-multiply animate-blob-slow" />
        <div className="space-y-4 max-w-4xl mx-auto">
          <Skeleton className="h-10 w-1/4" />
          <div className="flex gap-4 items-center">
            <Skeleton className="h-24 w-24 rounded-full" />
            <Skeleton className="h-6 w-1/4" />
          </div>
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center mt-20 text-red-500 font-medium text-lg">
        User not found.
      </div>
    );
  }

  return (
    <div className="relative w-full min-h-[80vh] px-4 py-10">
      {/* Decorative Blobs */}
      <div className="absolute top-[-6rem] left-[-6rem] w-[30rem] h-[30rem] bg-rose-300 opacity-25 rounded-full blur-[130px] mix-blend-multiply animate-blob-fast" />
      <div className="absolute bottom-[-6rem] right-[-6rem] w-[30rem] h-[30rem] bg-rose-200 opacity-25 rounded-full blur-[130px] mix-blend-multiply animate-blob-slow" />

      {/* Profile Card */}
      <Card className="relative z-10 bg-white/60 backdrop-blur-lg shadow-xl border border-white/20 max-w-5xl mx-auto">
        <CardHeader className="flex flex-col md:flex-row gap-6 items-center">
          <Image
            src={user.avatar || "/placeholder-avatar.png"}
            alt="User Avatar"
            width={96}
            height={96}
            className="rounded-full border object-cover h-24 w-24"
          />
          <div className="text-center md:text-left">
            <CardTitle className="text-3xl font-bold text-primary">
              {user.fullName}
            </CardTitle>
            <Badge
              variant="outline"
              className="mt-2 capitalize bg-[#e6f4f1] text-[#0c5c55] border-[#0c5c55]"
            >
              {user.role}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6">
          <div>
            <p className="text-sm text-muted-foreground">Email</p>
            <p className="font-medium">{user.email}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Username</p>
            <p className="font-medium">{user.username || "N/A"}</p>
          </div>
          <div className="md:col-span-2">
            <p className="text-sm text-muted-foreground">Bio</p>
            <p className="font-medium">
              {user.bio || "No bio provided"}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Joined On</p>
            <p className="font-medium">
              {new Date(user.createdAt).toLocaleDateString()}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
