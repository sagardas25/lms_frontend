// "use client";

// import { useEffect, useState } from "react";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Button } from "@/components/ui/button";
// import { Loader2 } from "lucide-react";
// import axios from "axios";
// import { toast } from "sonner";

// export default function UpdateProfilePage() {
//   const [formData, setFormData] = useState({
//     fullName: "",
//     bio: "",
//     email: "",
//   });

//   const [loading, setLoading] = useState(true);
//   const [updating, setUpdating] = useState(false);

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const res = await axios.get(
//           "http://localhost:8050/api/v1/user/current-user-profile",
//           { withCredentials: true }
//         );
//         const { fullName, bio, email } = res.data?.data || {};
//         setFormData({ fullName, bio, email });
//       } catch (error) {
//         toast.error("Failed to fetch user details");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchUser();
//   }, []);

//   const handleChange = (e) => {
//     setFormData((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setUpdating(true);
//     try {
//       const form = new FormData();
//       form.append("fullName", formData.fullName);
//       form.append("bio", formData.bio);

//       await axios.patch(
//         "http://localhost:8050/api/v1/user/update-profile",
//         form,
//         {
//           withCredentials: true,
//           headers: { "Content-Type": "multipart/form-data" },
//         }
//       );
//       toast.success("Profile updated successfully");
//     } catch (error) {
//       toast.error(error?.response?.data?.message || "Failed to update profile");
//     } finally {
//       setUpdating(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-[50vh]">
//         <Loader2 className="animate-spin h-6 w-6 text-primary" />
//       </div>
//     );
//   }

//   return (
//     <div className="relative w-full h-full overflow-hidden">
//       <div className="relative z-10 max-w-4xl mx-auto px-4 py-8">
//         <div className="backdrop-blur-xl bg-white/60 dark:bg-black/30 border border-white/20 rounded-2xl p-6 shadow-lg space-y-6">
//           <div>
//             <h2 className="text-2xl font-bold text-[#0c5c55]">
//               Update Profile
//             </h2>
//             <p className="text-muted-foreground text-sm">
//               Make changes to your personal information.
//             </p>
//           </div>

//           <form onSubmit={handleSubmit} className="space-y-6">
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//               <div className="space-y-2">
//                 <label htmlFor="fullName" className="text-sm font-semibold">
//                   Full Name
//                 </label>
//                 <Input
//                   id="fullName"
//                   name="fullName"
//                   value={formData.fullName}
//                   onChange={handleChange}
//                   placeholder="Your full name"
//                   required
//                   className="bg-white/80 backdrop-blur border border-white/30"
//                 />
//               </div>

//               <div className="space-y-2">
//                 <label htmlFor="email" className="text-sm font-semibold">
//                   Email (read-only)
//                 </label>
//                 <Input
//                   id="email"
//                   name="email"
//                   value={formData.email}
//                   disabled
//                   className="bg-white/40 text-muted-foreground cursor-not-allowed"
//                 />
//               </div>
//             </div>

//             <div className="space-y-2">
//               <label htmlFor="bio" className="text-sm font-semibold">
//                 Bio
//               </label>
//               <Textarea
//                 id="bio"
//                 name="bio"
//                 value={formData.bio}
//                 onChange={handleChange}
//                 rows={4}
//                 placeholder="Tell us something about yourself"
//                 className="bg-white/80 backdrop-blur border border-white/30"
//               />
//             </div>

//             <div className="flex justify-end">
//               <Button type="submit" disabled={updating}>
//                 {updating ? (
//                   <>
//                     <Loader2 className="animate-spin mr-2 h-4 w-4" />
//                     Saving...
//                   </>
//                 ) : (
//                   "Update Profile"
//                 )}
//               </Button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";

export default function UpdateProfilePage() {
  const [formData, setFormData] = useState({
    fullName: "",
    bio: "",
    email: "",
  });

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8050/api/v1/user/current-user-profile",
          { withCredentials: true }
        );
        const { fullName, bio, email } = res.data?.data || {};
        setFormData({ fullName, bio, email });
      } catch (error) {
        toast.error("Failed to fetch user details");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);
    try {
      const form = new FormData();
      form.append("fullName", formData.fullName);
      form.append("bio", formData.bio);

      await axios.patch(
        "http://localhost:8050/api/v1/user/update-profile",
        form,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to update profile");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <Loader2 className="animate-spin h-6 w-6 text-primary" />
      </div>
    );
  }

  return (
    <div className="w-full h-full flex items-center bg-white/30 rounded-xl  justify-center px-4   sm:py-16 mx-6 mt-1  relative overflow-hidden">
      {/* blob */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-0 left-0 w-72 h-72 bg-gradient-to-br from-[#0c5c55] to-[#7ec8c4] rounded-full blur-[120px] opacity-50" />
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-gradient-to-br from-[#0c5c55] to-[#7ec8c4] rounded-full blur-[120px] opacity-50" />
      </div>

      <div className="relative w-full max-w-3xl backdrop-blur-xl bg-white/50 dark:bg-black/30 border border-white/40 rounded-2xl shadow-lg p-6 sm:p-10 space-y-6">
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#0c5c55]">
            Update Profile
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Make changes to your personal information.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label
                htmlFor="fullName"
                className="text-sm font-medium text-[#0c5c55]"
              >
                Full Name
              </label>
              <Input
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Your full name"
                required
                className="bg-white/80 backdrop-blur border border-white/30"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-sm font-medium text-[#0c5c55]"
              >
                Email (read-only)
              </label>
              <Input
                id="email"
                name="email"
                value={formData.email}
                disabled
                className="bg-white/40 text-muted-foreground cursor-not-allowed"
              />
            </div>
          </div>

          <div className="space-y-2 ">
            <label htmlFor="bio" className="text-sm font-medium text-[#0c5c55]">
              Bio
            </label>
            <Textarea
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              rows={6}
              placeholder="Tell us something about yourself"
              className="bg-white/80 backdrop-blur border resize-none  border-white/30"
            />
          </div>

          <div className="flex justify-center pt-4">
            <Button type="submit" disabled={updating} className="px-6">
              {updating ? (
                <>
                  <Loader2 className="animate-spin mr-2 h-4 w-4" />
                  Saving...
                </>
              ) : (
                "Update Profile"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
