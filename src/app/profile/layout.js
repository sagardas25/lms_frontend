"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { LogOut } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";
import { useEffect, useState } from "react";

const navLinks = [
  { label: "My Profile", href: "/profile/me" },
  { label: "Edit Profile", href: "/profile/update" },
  { label: "Update Password", href: "/profile/update-password" },
  { label: "My Courses", href: "/profile/my-courses" },
];

export default function ProfileLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMe = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8050/api/v1/user/current-user-profile",
          { withCredentials: true }
        );
        setUser(res.data.data);
      } catch (err) {
        toast.error("Access denied. Please log in.");
        router.replace("/auth/login");
      } finally {
        setLoading(false);
      }
    };
    if(!user) fetchMe();
  }, [router , user]);

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:8050/api/v1/auth/logout",
        {},
        { withCredentials: true }
      );
      toast.success("Logged out successfully");
      router.push("/auth/login");
    } catch (err) {
      toast.error("Logout failed");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-[#0c5c55] font-medium">
        Loading...
      </div>
    );
  }

  return (
    <div className="relative z-0 h-[100vh] text-[#0c5c55] font-inter pt-20 px-2 flex flex-col md:flex-row group bg-slate-300 overflow-hidden">
      {/* Blobs */}
      <div className="absolute top-[-6rem] left-[-6rem] w-[30rem] h-[30rem] bg-[#0c5c55] opacity-10 rounded-full blur-[120px] mix-blend-multiply animate-blob-fast transition duration-300 ease-in-out group-hover:scale-110 group-hover:opacity-60 z-0"></div>
      <div className="absolute bottom-[-6rem] right-[-6rem] w-[30rem] h-[30rem] bg-[#0c5c55] opacity-20 rounded-full blur-[120px] mix-blend-multiply animate-blob-slow transition duration-300 ease-in-out group-hover:scale-110 group-hover:opacity-60 z-0"></div>

      {/* Sidebar */}
      <aside className="z-10 w-full md:w-[260px] bg-white border-r border-gray-200 p-6 mb-2  flex flex-col justify-between shadow-md  rounded-sm bg-gradient-to-br from-rose-50 via-white to-teal-100">
        <div>
          <div className="flex flex-col items-center text-center mb-8">
            <Avatar className="h-16 w-16">
              <AvatarImage src={user?.avatar || ""} />
              <AvatarFallback>{user?.fullName?.[0] || "U"}</AvatarFallback>
            </Avatar>
            <div className="mt-4">
              <p className="text-lg font-semibold">
                {user?.fullName || "Loading..."}
              </p>
              <p className="text-xs text-muted-foreground">
                {user?.email || ""}
              </p>
            </div>
          </div>

          <nav className="space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "block px-4 py-2 rounded-md text-sm font-medium transition-all",
                  pathname === link.href
                    ? "bg-[#0c5c55] text-white shadow-md"
                    : "hover:bg-gray-100 text-gray-600"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <Button
          onClick={handleLogout}
          variant="ghost"
          className="mt-6 w-full flex items-center justify-start gap-2 text-sm bg-rose-200 text-rose-700 hover:bg-rose-300 hover:text-rose-800 transition"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </Button>
      </aside>

      {/* Main content */}
      <main className="flex-1 z-10 p-4 md:py-0 md:px-0  overflow-x-hidden">
        {children}
      </main>
    </div>
  );
}
