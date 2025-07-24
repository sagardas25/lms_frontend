"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { LogOut } from "lucide-react";

const navItems = [
  { label: "Profile", path: "/profile/me" },
  { label: "Edit Profile", path: "/profile/update" },
  { label: "Update Password", path: "/profile/password" },
  { label: "My Courses", path: "/profile/courses" },
];

export default function ProfileLayout({ children }) {
  const [user, setUser] = useState(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("http://localhost:8050/api/v1/user/current-user-profile", {
          withCredentials: true,
        });
        setUser(res.data?.data);
      } catch (err) {
        console.error("Failed to load user data", err);
      }
    };
    fetchProfile();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:8050/api/v1/user/logout",
        {},
        { withCredentials: true }
      );
      toast.success("Logged out successfully");
      router.push("/auth/login");
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-[240px_1fr] gap-6">
      {/* Sidebar */}
      <aside className="bg-card border shadow-sm rounded-lg p-4 h-fit sticky top-4 flex flex-col justify-between gap-6 min-h-[300px]">
        <div>
          {user && (
            <div className="flex flex-col items-center text-center gap-3">
              <Avatar className="w-16 h-16">
                <AvatarImage src={user.avatar} alt={user.fullName} />
                <AvatarFallback>{user.fullName?.[0]}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-base font-semibold">{user.fullName}</h3>
                <p className="text-sm text-muted-foreground break-words">
                  {user.email}
                </p>
              </div>
            </div>
          )}

          <Separator className="my-4" />

          <nav className="flex flex-col gap-1">
            {navItems.map((item) => (
              <Button
                key={item.path}
                variant="ghost"
                className={cn(
                  "justify-start text-left w-full",
                  pathname === item.path &&
                    "bg-muted text-primary font-semibold"
                )}
                onClick={() => router.push(item.path)}
              >
                {item.label}
              </Button>
            ))}
          </nav>
        </div>

        {/* Logout */}
        <div className="pt-4 border-t">
          <Button
            variant="destructive"
            className="w-full justify-center gap-2"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Main content */}
      <main className="w-full overflow-hidden">{children}</main>
    </div>
  );
}
