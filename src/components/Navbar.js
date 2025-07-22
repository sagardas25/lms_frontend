"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();

  const [user, setUser] = useState(null); // { name, role }
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8000/api/v1/user/current-user-profile",
          {
            withCredentials: true,
          }
        );
        setUser(res.data?.user);
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:8000/api/v1/auth/logout",
        {},
        { withCredentials: true }
      );
      setUser(null);
      router.push("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <header className="border-b shadow-sm bg-background">
      <nav className="flex items-center justify-between px-6 py-4 max-w-screen-xl mx-auto">
        <Link href="/" className="text-2xl font-bold text-primary">
          LMS Platform
        </Link>

        <div className="flex gap-4 items-center">
          <Link
            href="/"
            className={`text-sm font-medium ${
              pathname === "/" ? "text-primary" : "text-textSecondary"
            }`}
          >
            Home
          </Link>

          <Link
            href="/student/course"
            className={`text-sm font-medium ${
              pathname.includes("/course")
                ? "text-primary"
                : "text-textSecondary"
            }`}
          >
            Courses
          </Link>

          {!loading && user?.role === "instructor" && (
            <Link
              href="/instructor/dashboard"
              className="text-sm font-medium text-textSecondary"
            >
              Instructor
            </Link>
          )}

          {!loading && user?.role === "admin" && (
            <Link
              href="/admin/all-students"
              className="text-sm font-medium text-textSecondary"
            >
              Admin
            </Link>
          )}

          {!loading && !user && (
            <>
              <Button
                variant="ghost"
                className="text-primary"
                onClick={() => router.push("/login")}
              >
                Login
              </Button>
              <Button
                className="bg-primary text-white hover:bg-primaryLight"
                onClick={() => router.push("/register")}
              >
                Sign Up
              </Button>
            </>
          )}

          {!loading && user && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="text-primary">
                  {user.name}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => router.push("/profile/me")}>
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push("/profile/update")}>
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </nav>
    </header>
  );
}
