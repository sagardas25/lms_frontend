"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import axios from "axios";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Menu, X } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8050/api/v1/user/current-user-profile",
          { withCredentials: true }
        );
        setUser(res.data?.data);
        console.log("user avatar:", res.data?.data.avatar);

        console.log("user name:", res.data?.data.fullName);
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    if (!user) fetchUser();
  }, [user]);

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:8050/api/v1/auth/logout",
        {},
        { withCredentials: true }
      );
      setUser(null);
      router.push("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const NavLink = ({ href, label }) => (
    <Link
      href={href}
      onClick={() => setIsMenuOpen(false)}
      className={`w-full md:w-auto text-center text-sm font-medium py-2 ${
        pathname === href || pathname.includes(href)
          ? "text-primary"
          : "text-muted-foreground hover:text-primary"
      }`}
    >
      {label}
    </Link>
  );

  const isAuthOrHomeRoute = pathname === "/" || pathname.startsWith("/auth");

  return (
    <>
      {/* Overlay blur background on mobile when menu is open */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-background/30 backdrop-blur-sm z-40 md:hidden" />
      )}

      <header className="bg-background border-b shadow-sm fixed top-0 left-0 right-0 bg-gradient-to-br  from-blue-50 to-slate-100 z-50 group">
        {isAuthOrHomeRoute && (
          <>
            <div className="absolute top-[-6rem] left-[-6rem] w-[30rem] h-[30rem] bg-[#1E3A8A]   opacity-10 rounded-full blur-[120px] mix-blend-multiply animate-blob transition duration-300 ease-in-out group-hover:scale-110 group-hover:opacity-60"></div>
            <div className="absolute bottom-[-6rem] right-[-6rem] w-[30rem] h-[30rem] bg-[#1E3A8A] opacity-20 rounded-full blur-[120px] mix-blend-multiply animate-blob transition duration-300 ease-in-out group-hover:scale-110 group-hover:opacity-60"></div>
          </>
        )}

        <nav className="max-w-screen-xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between relative">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-primary">
            LMS Platform
          </Link>

          {/* Mobile Toggle */}
          <button
            className="md:hidden text-primary"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Nav Links */}
          <div
            className={`${
              isMenuOpen ? "flex" : "hidden"
            } md:flex flex-col  md:flex-row md:items-center gap-4 md:gap-6 absolute md:static top-16 left-0 w-full md:w-auto  px-6 md:px-0 py-4 md:py-0 shadow md:shadow-none transition-all duration-300 z-50`}
          >
            <NavLink href="/" label="Home" />
            <NavLink href="/student/course" label="Courses" />

            {!loading && user?.role === "instructor" && (
              <NavLink href="/instructor/dashboard" label="Instructor" />
            )}

            {!loading && user?.role === "admin" && (
              <NavLink href="/admin/all-students" label="Admin" />
            )}

            {!loading && !user && (
              <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
                <Button
                  variant="ghost"
                  className="text-primary w-full md:w-auto hover:bg-[#10b981a9]"
                  onClick={() => {
                    router.push("/login");
                    setIsMenuOpen(false);
                  }}
                >
                  Login
                </Button>
                <Button
                  className="bg-primary text-white hover:bg-primaryLight w-full md:w-auto"
                  onClick={() => {
                    router.push("/register");
                    setIsMenuOpen(false);
                  }}
                >
                  Sign Up
                </Button>
              </div>
            )}
            {!loading && user && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="w-9 h-9 cursor-pointer ring-2 ring-primary">
                    <AvatarImage
                      src={user.avatar}
                      alt={user.fullName}
                      className="object-cover w-full h-full rounded-full"
                    />
                    <AvatarFallback>
                      {user?.fullName?.[0] || "U"}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="start"
                  className="z-[60] mt-2"
                >
                  <DropdownMenuItem
                    onClick={() => {
                      if (user.role === "instructor") {
                        router.push("/instructor/dashboard");
                      } else {
                        router.push("/dashboard");
                      }
                      setIsMenuOpen(false);
                    }}
                  >
                    Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => {
                      router.push("/settings/profile");
                      setIsMenuOpen(false);
                    }}
                  >
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                  >
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </nav>
      </header>
    </>
  );
}
