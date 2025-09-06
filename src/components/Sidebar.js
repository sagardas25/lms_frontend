
// "use client";

// import Link from "next/link";
// import { useEffect, useState } from "react";
// import { Home, BookOpen, Award, Settings } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Badge } from "@/components/ui/badge";
// import axios from "axios";

// export default function Sidebar() {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const res = await axios.get(
//           "http://localhost:8050/api/v1/user/current-user-profile",
//           { withCredentials: true }
//         );
//         setUser(res.data?.data);
//         console.log("user avatar:", res.data?.data.avatar);

//         console.log("user name:", res.data?.data.fullName);
//       } catch (err) {
//         setUser(null);
//       }
//     };

//     if (!user) fetchUser();
//   }, [user]);

//   return (
//     <aside className="w-64 border-r border-sidebar-border bg-gray-200 min-h-screen p-4">
//       {/* Profile Section */}
//       <div className="flex flex-col items-center text-center mt-20">
//         <Avatar className="w-20 h-20 mb-2">
//           <AvatarImage
//             src={user?.avatar}
//             alt={user?.fullName}
//             className="object-cover w-full h-full rounded-full"
//           />
//         </Avatar>
//         <span className="font-semibold text-foreground">{user?.fullName}</span>
//         {user?.role && (
//           <div className="mt-2">
//             <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
//               {user?.role || "Student"}
//             </span>
//           </div>
//         )}

//         {user?.lastActive && (
//           <p className="text-sm text-muted-foreground mt-1">
//             Joined :{" "}
//             {user?.createdAt
//               ? new Date(user.createdAt).toLocaleDateString()
//               : "—"}
//           </p>
//         )}
//       </div>

//       {/* Navigation */}
//       <nav className="flex-col gap-4 mt-8">
//         <div className="my-2">
//           <Link href="/student/dashboard" passHref>
//             <Button
//               asChild
//               variant="ghost"
//               className="w-full justify-start gap-3 bg-sidebar-accent text-sidebar-accent-foreground"
//             >
//               <span className="flex items-center gap-3">
//                 <Home className="h-4 w-4" />
//                 Dashboard
//               </span>
//             </Button>
//           </Link>
//         </div>

//         <div className="my-2">
//           <Link href="/student/courses" passHref>
//             <Button
//               asChild
//               variant="ghost"
//               className="w-full justify-start gap-3 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
//             >
//               <span className="flex items-center gap-3">
//                 <BookOpen className="h-4 w-4" />
//                 My Courses
//               </span>
//             </Button>
//           </Link>
//         </div>

//         <div className="my-2">
//           <Link href="/student/certificates" passHref>
//             <Button
//               asChild
//               variant="ghost"
//               className="w-full justify-start gap-3 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
//             >
//               <span className="flex items-center gap-3">
//                 <Award className="h-4 w-4" />
//                 Certificates
//               </span>
//             </Button>
//           </Link>
//         </div>

//         <div className="my-2">
//           <Link href="/settings/profile" passHref>
//             <Button
//               asChild
//               variant="ghost"
//               className="w-full justify-start gap-3 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
//             >
//               <span className="flex items-center gap-3">
//                 <Settings className="h-4 w-4" />
//                 Settings
//               </span>
//             </Button>
//           </Link>
//         </div>
//       </nav>
//     </aside>
//   );
// }


"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Home, BookOpen, Award, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import axios from "axios";

export default function Sidebar() {
  const [user, setUser] = useState(null);
  const pathname = usePathname(); // Get current route

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
      }
    };

    if (!user) fetchUser();
  }, [user]);

  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: Home },
    { name: "My Courses", href: "/student/courses", icon: BookOpen },
    { name: "Certificates", href: "/student/certificates", icon: Award },
    { name: "Settings", href: "/settings/profile", icon: Settings },
  ];

  return (
    <aside className="w-64 border-r border-sidebar-border bg-gray-200 min-h-screen p-4 pb-0 mb-0">
      {/* Profile Section */}
      <div className="flex flex-col items-center text-center mt-20">
        <Avatar className="w-20 h-20 mb-2">
          <AvatarImage
            src={user?.avatar}
            alt={user?.fullName}
            className="object-cover w-full h-full rounded-full"
          />
        </Avatar>
        <span className="font-semibold text-foreground">{user?.fullName}</span>
        {user?.role && (
          <div className="mt-2">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
              {user?.role || "Student"}
            </span>
          </div>
        )}
        {user?.createdAt && (
          <p className="text-sm text-muted-foreground mt-1">
            Joined : {new Date(user.createdAt).toLocaleDateString()}
          </p>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-col gap-4 mt-8">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <div className="my-2" key={item.href}>
              <Link href={item.href} passHref>
                <Button
                  asChild
                  variant="ghost"
                  className={`w-full justify-start gap-3 ${
                    isActive
                      ? "bg-green-500/20 text-green-700" // active link color
                      : "text-sidebar-foreground hover:bg-green-100 hover:text-green-700"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <item.icon className="h-4 w-4" />
                    {item.name}
                  </span>
                </Button>
              </Link>
            </div>
          );
        })}
      </nav>
    </aside>
  );
}
