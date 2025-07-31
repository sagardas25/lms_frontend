"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import {
  Mail,
  User,
  MapPin,
  BookOpen,
  Calendar,
  Phone,
  ShieldCheck,
  Book
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function ProfileOverview() {
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8050/api/v1/user/current-user-profile",
          { withCredentials: true }
        );

        console.log("res.data?.data : ", res.data?.data);

        setUser(res.data?.data);
      } catch (err) {
        setUser(null);
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="relative w-full px-0 overflow-hidden bg-transparent">
      {/* Outer Card Container */}
      <div className="max-w-5xl mx-auto  rounded-2xl h-full p-4 md:p-8">
        {/* Blob background */}
        <div className="absolute inset-0 -z-10 pointer-events-none">
          <div className="absolute top-0 left-0 w-72 h-72 bg-gradient-to-br from-[#0c5c55] to-[#7ec8c4] rounded-full blur-[120px] opacity-50" />
          <div className="absolute bottom-0 right-0 w-72 h-72 bg-gradient-to-br from-[#0c5c55] to-[#7ec8c4] rounded-full blur-[120px] opacity-50" />
        </div>

        <Card className="bg-white/40  border border-white/20 backdrop-blur-sm shadow-md rounded-2xl">
          <CardContent className="p-0 md:px-6 flex flex-col">
            <h2 className="text-xl font-semibold text-[#0c5c55] mb-4">
              Profile Overview
            </h2>

            {/* Inner Cards Container */}
            <div className="grid md:grid-cols-2 gap-2">
              {/* Email */}
              <ProfileField icon={Mail} label="Email" value={user.email} />

              {/* course purchased or created */}
              {user.role === "student" ? (
                <ProfileField
                  icon={Book}
                  label="Courses Purchased"
                  value={`${user.enrolledCourses?.length || 0} course(s)`}
                />
              ) : user.role === "instructor" ? (
                <ProfileField
                  icon={BookOpen}
                  label="Courses Created"
                  value={`${user.createdCourse?.length || 0} course(s)`}
                />
              ) : (
                <ProfileField
                  icon={BookOpen}
                  label="Courses Purchased"
                  value={null}
                />
              )}

              {/* Gender */}
              <ProfileField
                icon={User}
                label="Gender"
                value={user.gender || "N/A"}
              />

              {/* Phone */}
              <ProfileField
                icon={Phone}
                label="Phone"
                value={user.phoneNumber || "N/A"}
              />

              {/* Role */}
              <ProfileField
                icon={ShieldCheck}
                label="Role"
                value={user.role || "User"}
                capitalize
              />

              {/* Joined On */}
              <ProfileField
                icon={Calendar}
                label="Joined On"
                value={
                  user.createdAt
                    ? new Date(user.createdAt).toLocaleDateString()
                    : "N/A"
                }
              />

              {/* Bio */}
              <Card className="bg-white/70 shadow-inner border border-white/10 md:col-span-2">
                <CardContent className="px-3 py-2">
                  <div className="text-muted-foreground text-xs flex items-center gap-2 mb-1">
                    <User className="h-3.5 w-3.5 text-[#0c5c55]" />
                    Bio
                  </div>
                  <p className="font-medium text-sm line-clamp-3">
                    {user.bio || "No bio added yet."}
                  </p>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Reusable component for fields
function ProfileField({ icon: Icon, label, value, capitalize = false }) {
  return (
    <Card className="bg-white/70 shadow-inner border border-white/10">
      <CardContent className="px-3 py-2">
        <div className="text-muted-foreground text-xs flex items-center gap-2 mb-1">
          <Icon className="h-3.5 w-3.5 text-[#0c5c55]" />
          {label}
        </div>
        <p
          className={`font-medium text-sm truncate ${
            capitalize ? "capitalize" : ""
          }`}
        >
          {value}
        </p>
      </CardContent>
    </Card>
  );
}
