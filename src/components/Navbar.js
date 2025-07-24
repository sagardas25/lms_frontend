// "use client";

// import Link from "next/link";
// import { useEffect, useState } from "react";
// import { usePathname, useRouter } from "next/navigation";
// import axios from "axios";
// import Image from "next/image";
// import { Button } from "./ui/button";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "./ui/dropdown-menu";
// import { Menu, X } from "lucide-react";
// import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

// export default function Navbar() {
//   const router = useRouter();
//   const pathname = usePathname();

//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const res = await axios.get(
//           "http://localhost:8050/api/v1/user/current-user-profile",
//           { withCredentials: true }
//         );
//         setUser(res.data?.data); // using `data` key as returned by your controller
//       } catch (err) {
//         setUser(null);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUser();
//   }, []);

//   const handleLogout = async () => {
//     try {
//       await axios.post(
//         "http://localhost:8050/api/v1/auth/logout",
//         {},
//         { withCredentials: true }
//       );
//       setUser(null);
//       router.push("/auth/login");
//     } catch (err) {
//       console.error("Logout failed:", err);
//     }
//   };

//   return (
//     <header className="bg-background border-b shadow-sm">
//       <nav className="max-w-screen-xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
//         {/* Logo */}
//         <Link href="/" className="text-2xl font-bold text-primary">
//           LMS Platform
//         </Link>

//         {/* Mobile menu button */}
//         <button
//           className="md:hidden text-primary"
//           onClick={() => setIsMenuOpen((prev) => !prev)}
//         >
//           {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
//         </button>

//         {/* Menu Links */}
//         <div
//           className={`${
//             isMenuOpen ? "block" : "hidden"
//           } absolute md:static top-16 left-0 w-full md:w-auto bg-background md:bg-transparent px-4 md:px-0 py-4 md:py-0 shadow md:shadow-none md:flex items-center gap-4 flex-col md:flex-row z-50`}
//         >
//           <Link
//             href="/"
//             className={`text-sm font-medium ${
//               pathname === "/"
//                 ? "text-primary"
//                 : "text-textSecondary hover:text-primary"
//             }`}
//           >
//             Home
//           </Link>

//           <Link
//             href="/student/course"
//             className={`text-sm font-medium ${
//               pathname.includes("/student/course")
//                 ? "text-primary"
//                 : "text-textSecondary hover:text-primary"
//             }`}
//           >
//             Courses
//           </Link>

//           {!loading && user?.role === "instructor" && (
//             <Link
//               href="/instructor/dashboard"
//               className="text-sm font-medium text-textSecondary hover:text-primary"
//             >
//               Instructor
//             </Link>
//           )}

//           {!loading && user?.role === "admin" && (
//             <Link
//               href="/admin/all-students"
//               className="text-sm font-medium text-textSecondary hover:text-primary"
//             >
//               Admin
//             </Link>
//           )}

//           {!loading && !user && (
//             <div className="flex flex-col md:flex-row gap-2 md:gap-4">
//               <Button
//                 variant="ghost"
//                 className="text-primary w-full md:w-auto"
//                 onClick={() => router.push("/auth/login")}
//               >
//                 Login
//               </Button>
//               <Button
//                 className="bg-primary text-white hover:bg-primaryLight w-full md:w-auto"
//                 onClick={() => router.push("/auth/register")}
//               >
//                 Sign Up
//               </Button>
//             </div>
//           )}

//           {!loading && user && (
//             <DropdownMenu>
//               <DropdownMenuTrigger asChild>
//                 <Avatar className="w-8 h-8 bg-amber-800 rounded-4xl cursor-pointer">
//                   <AvatarImage
//                     src={user.avatar}
//                     alt={user.fullName}
//                     className="object-fill rounded-4xl h-full w-full"
//                   />
//                 </Avatar>
//               </DropdownMenuTrigger>
//               <DropdownMenuContent align="end">
//                 <DropdownMenuItem onClick={() => router.push("/profile/me")}>
//                   Profile
//                 </DropdownMenuItem>
//                 <DropdownMenuItem
//                   onClick={() => router.push("/profile/update")}
//                 >
//                   Settings
//                 </DropdownMenuItem>
//                 <DropdownMenuItem onClick={handleLogout}>
//                   Logout
//                 </DropdownMenuItem>
//               </DropdownMenuContent>
//             </DropdownMenu>
//           )}
//         </div>
//       </nav>
//     </header>
//   );
// }

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
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"; // ✅ shadcn version

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
        "http://localhost:8050/api/v1/auth/logout",
        {},
        { withCredentials: true }
      );
      setUser(null);
      router.push("/auth/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <header className="bg-background border-b shadow-sm">
      <nav className="max-w-screen-xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-primary">
          LMS Platform
        </Link>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-primary"
          onClick={() => setIsMenuOpen((prev) => !prev)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Nav Links */}
        <div
          className={`${
            isMenuOpen ? "block" : "hidden"
          } absolute md:static top-16 left-0 w-full md:w-auto bg-background md:bg-transparent px-4 md:px-0 py-4 md:py-0 shadow md:shadow-none md:flex items-center gap-4 flex-col md:flex-row z-50`}
        >
          <Link
            href="/"
            className={`text-sm font-medium ${
              pathname === "/" ? "text-primary" : "text-textSecondary hover:text-primary"
            }`}
          >
            Home
          </Link>

          <Link
            href="/student/course"
            className={`text-sm font-medium ${
              pathname.includes("/student/course")
                ? "text-primary"
                : "text-textSecondary hover:text-primary"
            }`}
          >
            Courses
          </Link>

          {!loading && user?.role === "instructor" && (
            <Link
              href="/instructor/dashboard"
              className="text-sm font-medium text-textSecondary hover:text-primary"
            >
              Instructor
            </Link>
          )}

          {!loading && user?.role === "admin" && (
            <Link
              href="/admin/all-students"
              className="text-sm font-medium text-textSecondary hover:text-primary"
            >
              Admin
            </Link>
          )}

          {/* Guest Auth Buttons */}
          {!loading && !user && (
            <div className="flex flex-col md:flex-row gap-2 md:gap-4">
              <Button
                variant="ghost"
                className="text-primary w-full md:w-auto"
                onClick={() => router.push("/auth/login")}
              >
                Login
              </Button>
              <Button
                className="bg-primary text-white hover:bg-primaryLight w-full md:w-auto"
                onClick={() => router.push("/auth/register")}
              >
                Sign Up
              </Button>
            </div>
          )}

          {/* Authenticated User Avatar */}
          {!loading && user && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="w-9 h-9 rounded-full cursor-pointer ring-2 ring-primary">
                  <AvatarImage
                    src={user.avatar}
                    alt={user.fullName}
                    className="object-fill w-full h-full rounded-full"
                  />
                  <AvatarFallback>
                    {/* Will not show unless Cloudinary fails */}
                    {user?.fullName?.[0] || "U"}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => router.push("/profile/me")}>
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push("/profile/update")}>
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </nav>
    </header>
  );
}
