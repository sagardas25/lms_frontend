"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";

export default function ProfileOverview() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8050/api/v1/user/current-user-profile",
          { withCredentials: true }
        );
        setUser(res.data?.data);
      } catch (err) {
        console.error("Failed to fetch profile", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto mt-10 space-y-6">
        <Skeleton className="h-10 w-1/3" />
        <div className="flex items-center gap-4">
          <Skeleton className="w-24 h-24 rounded-full" />
          <Skeleton className="h-6 w-1/4" />
        </div>
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
      </div>
    );
  }

  if (!user) {
    return <p className="text-center mt-10">User not found</p>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 space-y-6">
      <Card>
        <CardHeader className="flex items-center gap-4">
          <Image
            src={user.avatar}
            alt="User Avatar"
            width={96}
            height={96}
            className="rounded-full object-cover w-24 h-24"
          />
          <div>
            <CardTitle className="text-2xl text-primary">{user.fullName}</CardTitle>
            <Badge variant="outline" className="mt-2 capitalize">
              {user.role}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div>
            <p className="text-sm text-muted-foreground">Email</p>
            <p className="text-base text-foreground">{user.email}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Username</p>
            <p className="text-base text-foreground">{user.username || "N/A"}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Bio</p>
            <p className="text-base text-foreground">
              {user.bio || "No bio provided"}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Joined</p>
            <p className="text-base text-foreground">
              {new Date(user.createdAt).toLocaleDateString()}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
