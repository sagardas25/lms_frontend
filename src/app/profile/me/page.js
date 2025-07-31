"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Mail,
  User,
  BadgeInfo,
  Calendar,
  MapPin,
  ShieldCheck,
} from "lucide-react";

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
        {/* Loading blobs */}
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
    <div className="relative w-full h-full  px-4 ">
      {/* Blobs */}
      <div className="absolute top-[-6rem] left-[-6rem] w-[30rem] h-[30rem] bg-rose-300 opacity-25 rounded-full blur-[130px] mix-blend-multiply animate-blob-fast" />
      <div className="absolute bottom-[-6rem] right-[-6rem] w-[30rem] h-[30rem] bg-rose-200 opacity-25 rounded-full blur-[130px] mix-blend-multiply animate-blob-slow" />

      {/* bg-white/60 */}
      <Card className="relative h-full z-10   backdrop-blur-xl shadow-2xl border border-white/20 max-w-5xl mx-auto">
        <CardHeader className="flex flex-col md:flex-row gap-6 items-center border-b">
          <Image
            src={user.avatar || "/placeholder-avatar.png"}
            alt="User Avatar"
            width={96}
            height={96}
            className="rounded-full border object-cover h-24 w-24"
          />
          <div className="text-center md:text-left space-y-1">
            <CardTitle className="text-3xl font-bold text-primary">
              {user.fullName}
            </CardTitle>
            <Badge
              variant="outline"
              className="capitalize bg-[#e6f4f1] text-[#0c5c55] border-[#0c5c55]"
            >
              {user.role}
            </Badge>
          </div>
        </CardHeader>

        {/* marked card */}

        <CardContent className="grid md:grid-cols-2 gap-4 p-6">
  {/* Email */}
  <Card className="bg-white/70 shadow-inner border border-white/10 h-[100px]">
    <CardContent className="p-3">
      <div className="text-muted-foreground text-sm flex items-center gap-2 mb-1">
        <Mail className="h-4 w-4 text-[#0c5c55]" />
        Email
      </div>
      <p className="font-medium truncate">{user.email}</p>
    </CardContent>
  </Card>

  {/* Username */}
  <Card className="bg-white/70 shadow-inner border border-white/10 h-[100px]">
    <CardContent className="p-3">
      <div className="text-muted-foreground text-sm flex items-center gap-2 mb-1">
        <User className="h-4 w-4 text-[#0c5c55]" />
        Username
      </div>
      <p className="font-medium truncate">{user.username || "N/A"}</p>
    </CardContent>
  </Card>

  {/* Country */}
  <Card className="bg-white/70 shadow-inner border border-white/10 h-[100px]">
    <CardContent className="p-3">
      <div className="text-muted-foreground text-sm flex items-center gap-2 mb-1">
        <MapPin className="h-4 w-4 text-[#0c5c55]" />
        Country
      </div>
      <p className="font-medium truncate">{user.country || "N/A"}</p>
    </CardContent>
  </Card>

  {/* Joined On */}
  <Card className="bg-white/70 shadow-inner border border-white/10 h-[100px]">
    <CardContent className="p-3">
      <div className="text-muted-foreground text-sm flex items-center gap-2 mb-1">
        <Calendar className="h-4 w-4 text-[#0c5c55]" />
        Joined On
      </div>
      <p className="font-medium truncate">
        {new Date(user.createdAt).toLocaleDateString()}
      </p>
    </CardContent>
  </Card>

  {/* Bio */}
  <Card className="bg-white/70 shadow-inner border border-white/10 md:col-span-2 h-[120px]">
    <CardContent className="p-3 overflow-hidden">
      <div className="text-muted-foreground text-sm flex items-center gap-2 mb-1">
        <BadgeInfo className="h-4 w-4 text-[#0c5c55]" />
        Bio
      </div>
      <p className="font-medium line-clamp-2">
        {user.bio || "No bio provided"}
      </p>
    </CardContent>
  </Card>
</CardContent>

      </Card>
    </div>
  );
}

{
  /* <CardContent className="grid grid-cols-1  h-[75%] bg-amber-500 md:grid-cols-2 gap-6 p-6">
<Card className="bg-white/70 shadow-inner border border-white/10">
  <CardContent className="p-4 space-y-1">
    <div className="text-muted-foreground text-sm flex items-center gap-2">
      <Mail className="h-4 w-4 text-[#0c5c55]" />
      Email
    </div>
    <p className="font-medium">{user.email}</p>
  </CardContent>
</Card>

<Card className="bg-white/70 shadow-inner border border-white/10">
  <CardContent className="p-4 space-y-1">
    <div className="text-muted-foreground text-sm flex items-center gap-2">
      <User className="h-4 w-4 text-[#0c5c55]" />
      Username
    </div>
    <p className="font-medium">{user.username || "N/A"}</p>
  </CardContent>
</Card>

<Card className="bg-white/70 shadow-inner border border-white/10">
  <CardContent className="p-4 space-y-1">
    <div className="text-muted-foreground text-sm flex items-center gap-2">
      <MapPin className="h-4 w-4 text-[#0c5c55]" />
      Country
    </div>
    <p className="font-medium">{user.country || "N/A"}</p>
  </CardContent>
</Card>

<Card className="bg-white/70 shadow-inner border border-white/10">
  <CardContent className="p-4 space-y-1">
    <div className="text-muted-foreground text-sm flex items-center gap-2">
      <Calendar className="h-4 w-4 text-[#0c5c55]" />
      Joined On
    </div>
    <p className="font-medium">
      {new Date(user.createdAt).toLocaleDateString()}
    </p>
  </CardContent>
</Card>

<Card className="bg-white/70 shadow-inner border border-white/10 md:col-span-2">
  <CardContent className="p-4 space-y-1">
    <div className="text-muted-foreground text-sm flex items-center gap-2">
      <BadgeInfo className="h-4 w-4 text-[#0c5c55]" />
      Bio
    </div>
    <p className="font-medium">{user.bio || "No bio provided"}</p>
  </CardContent>
</Card>
</CardContent> */
}
