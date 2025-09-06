// "use client";

// import { useState, useEffect } from "react";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
//   BookOpen,
//   Eye,
//   EyeOff,
//   Mail,
//   Lock,
//   User,
//   Upload,
//   ArrowRight,
//   Phone,
// } from "lucide-react";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import axios from "axios";
// import { toast, Toaster } from "sonner";

// export default function RegisterPage() {
//   const router = useRouter();
//   const [formData, setFormData] = useState({
//     fullName: "",
//     email: "",
//     phone: "",
//     password: "",
//     confirmPassword: "",
//   });
//   const [avatar, setAvatar] = useState(null);
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const token = localStorage.getItem("authToken");
//     if (token) router.replace("/dashboard");
//   }, [router]);

//   const handleInputChange = (e) => {
//     setFormData((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   const handleAvatarChange = (e) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       setAvatar(file);
//     }
//   };

//   async function onSubmit(e) {
//     e.preventDefault();
//     setLoading(true);

//     // Validation
//     if (formData.password !== formData.confirmPassword) {
//       toast.error("Passwords do not match");
//       setLoading(false);
//       return;
//     }

//     if (formData.password.length < 6) {
//       toast.error("Password must be at least 6 characters");
//       setLoading(false);
//       return;
//     }

//     try {
//       const form = new FormData();
//       form.append("fullName", formData.fullName);
//       form.append("email", formData.email);
//       form.append("phoneNumber", formData.phone);
//       form.append("password", formData.password);
//       if (avatar) form.append("avatar", avatar);

//       await axios.post("http://localhost:8050/api/v1/auth/register", form, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       toast.success("Account created successfully! Redirecting to login...");
//       setTimeout(() => router.push("/login"), 2000);
//     } catch (err) {
//       toast.error(err?.response?.data?.message || "Registration failed");
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-primary/5 flex items-center justify-center p-4">
//       {/* Sonner Toaster */}
//       <Toaster position="bottom-right" richColors />

//       {/* Background decoration */}
//       <div className="absolute inset-0 overflow-hidden">
//         <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-full blur-3xl animate-float"></div>
//         <div
//           className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-secondary/5 to-primary/5 rounded-full blur-3xl animate-float"
//           style={{ animationDelay: "1s" }}
//         ></div>
//       </div>

//       <div className="w-full max-w-md relative z-10">
//         {/* Logo */}
//         <div className="text-center mb-8">
//           <div className="flex items-center justify-center space-x-2 mb-4">
//             <div className="relative">
//               <BookOpen className="h-10 w-10 text-primary animate-pulse-glow" />
//               <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl"></div>
//             </div>
//             <span className="text-2xl font-bold gradient-text">LearnHub</span>
//           </div>
//           <p className="text-muted-foreground">
//             Join thousands of learners and start your journey today!
//           </p>
//         </div>

//         <Card className="border-2 border-border/50 shadow-2xl bg-card/95 backdrop-blur-sm">
//           <CardHeader className="space-y-2 text-center">
//             <CardTitle className="text-2xl font-bold">Create Account</CardTitle>
//             <CardDescription>
//               Sign up to access premium courses and features
//             </CardDescription>
//           </CardHeader>
//           <CardContent>
//             <form onSubmit={onSubmit} className="space-y-6">
//               {/* Full Name */}
//               <div className="space-y-2">
//                 <Label htmlFor="fullName" className="text-sm font-medium">
//                   Full Name
//                 </Label>
//                 <div className="relative">
//                   <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//                   <Input
//                     id="fullName"
//                     name="fullName"
//                     type="text"
//                     placeholder="Enter your full name"
//                     value={formData.fullName}
//                     onChange={handleInputChange}
//                     className="pl-10 border-2 focus:border-primary transition-colors"
//                     required
//                   />
//                 </div>
//               </div>

//               {/* Email */}
//               <div className="space-y-2">
//                 <Label htmlFor="email" className="text-sm font-medium">
//                   Email
//                 </Label>
//                 <div className="relative">
//                   <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//                   <Input
//                     id="email"
//                     name="email"
//                     type="email"
//                     placeholder="Enter your email"
//                     value={formData.email}
//                     onChange={handleInputChange}
//                     className="pl-10 border-2 focus:border-primary transition-colors"
//                     required
//                   />
//                 </div>
//               </div>

//               {/* Phone */}
//               <div className="space-y-2">
//                 <Label htmlFor="phone" className="text-sm font-medium">
//                   Phone Number
//                 </Label>
//                 <div className="relative">
//                   <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//                   <Input
//                     id="phone"
//                     name="phone"
//                     type="tel"
//                     placeholder="Enter your phone number"
//                     value={formData.phone}
//                     onChange={handleInputChange}
//                     className="pl-10 border-2 focus:border-primary transition-colors"
//                     required
//                   />
//                 </div>
//               </div>

//               {/* Password */}
//               <div className="space-y-2">
//                 <Label htmlFor="password" className="text-sm font-medium">
//                   Password
//                 </Label>
//                 <div className="relative">
//                   <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//                   <Input
//                     id="password"
//                     name="password"
//                     type={showPassword ? "text" : "password"}
//                     placeholder="Create a password"
//                     value={formData.password}
//                     onChange={handleInputChange}
//                     className="pl-10 pr-10 border-2 focus:border-primary transition-colors"
//                     required
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowPassword(!showPassword)}
//                     className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
//                   >
//                     {showPassword ? (
//                       <EyeOff className="h-4 w-4" />
//                     ) : (
//                       <Eye className="h-4 w-4" />
//                     )}
//                   </button>
//                 </div>
//               </div>

//               {/* Confirm Password */}
//               <div className="space-y-2">
//                 <Label
//                   htmlFor="confirmPassword"
//                   className="text-sm font-medium"
//                 >
//                   Confirm Password
//                 </Label>
//                 <div className="relative">
//                   <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//                   <Input
//                     id="confirmPassword"
//                     name="confirmPassword"
//                     type={showConfirmPassword ? "text" : "password"}
//                     placeholder="Confirm your password"
//                     value={formData.confirmPassword}
//                     onChange={handleInputChange}
//                     className="pl-10 pr-10 border-2 focus:border-primary transition-colors"
//                     required
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                     className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
//                   >
//                     {showConfirmPassword ? (
//                       <EyeOff className="h-4 w-4" />
//                     ) : (
//                       <Eye className="h-4 w-4" />
//                     )}
//                   </button>
//                 </div>
//               </div>

//               {/*
//               {/* Avatar */}
//               <div className="space-y-2">
//                 <Label htmlFor="avatar" className="text-sm font-medium">
//                   Profile Picture (Optional)
//                 </Label>
//                 <div className="relative">
//                   <input
//                     id="avatar"
//                     type="file"
//                     accept="image/*"
//                     onChange={handleAvatarChange}
//                     className="hidden"
//                   />
//                   <label
//                     htmlFor="avatar"
//                     className="flex items-center space-x-2 p-3 border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-primary transition-colors"
//                   >
//                     <Upload className="h-4 w-4 text-muted-foreground" />
//                     <span className="text-sm text-muted-foreground">
//                       {avatar ? avatar.name : "Click to upload profile picture"}
//                     </span>
//                   </label>
//                 </div>
//               </div>

//               {/* Submit */}
//               <Button
//                 type="submit"
//                 disabled={loading}
//                 className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-primary-foreground hover:shadow-lg hover:scale-105 transition-all duration-300"
//               >
//                 {loading ? (
//                   <div className="flex items-center space-x-2">
//                     <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin"></div>
//                     <span>Creating account...</span>
//                   </div>
//                 ) : (
//                   <div className="flex items-center space-x-2">
//                     <span>Create Account</span>
//                     <ArrowRight className="h-4 w-4" />
//                   </div>
//                 )}
//               </Button>
//             </form>

//             <div className="mt-6 text-center">
//               <p className="text-sm text-muted-foreground">
//                 Already have an account?{" "}
//                 <Link
//                   href="/login"
//                   className="text-primary hover:underline font-medium"
//                 >
//                   Sign in
//                 </Link>
//               </p>
//             </div>
//           </CardContent>
//         </Card>

//         <div className="text-center mt-6">
//           <Link
//             href="/"
//             className="text-sm text-muted-foreground hover:text-primary transition-colors"
//           >
//             ← Back to home
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }

// "use client";

// import { useState } from "react";
// import axios from "axios";
// import { useRouter } from "next/navigation";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import Image from "next/image";
// import {
//   BookOpen,
//   Eye,
//   EyeOff,
//   Mail,
//   Lock,
//   User,
//   Upload,
//   ArrowRight,
//   Phone,
// } from "lucide-react";
// import {
//   Select,
//   SelectTrigger,
//   SelectValue,
//   SelectContent,
//   SelectItem,
// } from "@/components/ui/select";
// import { toast } from "sonner";
// import { Player } from "@lottiefiles/react-lottie-player";

// export default function RegisterPage() {
//   const router = useRouter();
//   const [form, setForm] = useState({
//     fullName: "",
//     gender: "",
//     country: "",
//     phoneNumber: "",
//     email: "",
//     password: "",
//   });

//   const [avatar, setAvatar] = useState(null);
//   const [avatarPreview, setAvatarPreview] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSelectChange = (field, value) => {
//     setForm({ ...form, [field]: value });
//   };

//   const handleAvatarChange = (e) => {
//     setAvatar(e.target.files[0]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       const data = new FormData();
//       Object.keys(form).forEach((key) => data.append(key, form[key]));
//       if (avatar) data.append("avatar", avatar);

//       await axios.post("http://localhost:8050/api/v1/auth/register", data, {
//         headers: { "Content-Type": "multipart/form-data" },
//         withCredentials: true,
//       });

//       toast.success("Registration successful!");
//       router.push("/login");
//     } catch (err) {
//       toast.error(err?.response?.data?.message || "Registration failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="relative flex-grow flex items-center h-[100vh] justify-center bg-gradient-to-br from-slate-100 to-white overflow-hidden pt-20 group">
//       {/* Blobs */}
//       <div className="absolute top-[-6rem] left-[-6rem] w-[30rem] h-[30rem] bg-[#0c5c55]  opacity-10 rounded-full blur-[120px] mix-blend-multiply animate-blob-fast transition duration-300 ease-in-out group-hover:scale-110 group-hover:opacity-60"></div>
//       <div className="absolute bottom-[-6rem] right-[-6rem] w-[30rem] h-[30rem] bg-[#0c5c55] opacity-20 rounded-full blur-[120px] mix-blend-multiply animate-blob-slow transition duration-300 ease-in-out group-hover:scale-110 group-hover:opacity-60"></div>

//       <div className="z-10 w-full max-w-screen-xl px-4 md:px-10 flex flex-col lg:flex-row items-center justify-between pb-12 pt-0 md:pt-10">
//         {/* Lottie */}
//         <div className="hidden lg:flex flex-1 items-center justify-center">
//           <Player
//             //src="https://lottie.host/16634aab-1f36-4ab9-acec-b604846b1fa4/hkJYGxwafl.json"
//             src="/animation/register.json"
//             autoplay
//             loop
//             style={{ width: "90%", maxWidth: "450px" }}
//           />
//         </div>

//         {/* Register Form */}
//         <div className="flex-1 w-full max-w-md bg-white shadow-xl rounded-2xl p-8 border border-gray-200">
//           <h1 className="text-3xl font-bold text-primary text-center mb-6">
//             Create Account
//           </h1>
//           <form className="space-y-4" onSubmit={handleSubmit}>
//             <div>
//               <Label htmlFor="fullName" className="pb-1">
//                 Full Name
//               </Label>
//              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//               <Input
//                 name="fullName"
//                 value={form.fullName}
//                 onChange={handleChange}
//                 required
//               />
//             </div>

//             <div>
//               <Label htmlFor="gender" className="pb-1">
//                 Gender
//               </Label>
//               <Select
//                 onValueChange={(val) => handleSelectChange("gender", val)}
//               >
//                 <SelectTrigger className="w-full">
//                   <SelectValue placeholder="Select gender" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="male">Male</SelectItem>
//                   <SelectItem value="female">Female</SelectItem>
//                   <SelectItem value="other">Other</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>

//             <div>
//               <Label htmlFor="avatar" className="pb-1">
//                 Avatar
//               </Label>
//               <Input
//                 type="file"
//                 accept="image/*"
//                 onChange={handleAvatarChange}
//                 className="cursor-pointer"
//               />
//             </div>

//             <div>
//               <Label htmlFor="phoneNumber" className="pb-1">
//                 Phone Number
//               </Label>
//               <Input
//                 name="phoneNumber"
//                 value={form.phoneNumber}
//                 onChange={handleChange}
//                 required
//               />
//             </div>

//             <div>
//               <Label htmlFor="email" className="pb-1">
//                 Email
//               </Label>
//               <Input
//                 type="email"
//                 name="email"
//                 value={form.email}
//                 onChange={handleChange}
//                 required
//               />
//             </div>

//             <div>
//               <Label htmlFor="password" className="pb-1">
//                 Password
//               </Label>
//               <Input
//                 type="password"
//                 name="password"
//                 value={form.password}
//                 onChange={handleChange}
//                 required
//               />
//             </div>

//             <Button
//               type="submit"
//               disabled={loading}
//               className="w-full bg-primary text-white hover:bg-primary/90"
//             >
//               {loading ? "Registering..." : "Sign Up"}
//             </Button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BookOpen, Mail, Lock, User, Upload, Phone } from "lucide-react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Player } from "@lottiefiles/react-lottie-player";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    fullName: "",
    gender: "",
    country: "",
    phoneNumber: "",
    email: "",
    password: "",
  });

  const [avatar, setAvatar] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const handleAvatarChange = (e) => {
    setAvatar(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = new FormData();
      Object.keys(form).forEach((key) => data.append(key, form[key]));
      if (avatar) data.append("avatar", avatar);

      await axios.post("http://localhost:8050/api/v1/auth/register", data, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      toast.success("Registration successful!");
      router.push("/login");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex-grow flex items-center h-[100vh] justify-center bg-gradient-to-br from-slate-100 to-white overflow-hidden pt-20 group">
      {/* Blobs */}
      <div className="absolute top-[-6rem] left-[-6rem] w-[30rem] h-[30rem] bg-[#0c5c55]  opacity-10 rounded-full blur-[120px] mix-blend-multiply animate-blob-fast"></div>
      <div className="absolute bottom-[-6rem] right-[-6rem] w-[30rem] h-[30rem] bg-[#0c5c55] opacity-20 rounded-full blur-[120px] mix-blend-multiply animate-blob-slow"></div>

      <div className="z-10 w-full max-w-screen-xl px-4 md:px-10 flex flex-col lg:flex-row items-center justify-between pb-12 pt-0 md:pt-10">
        {/* Lottie */}
        <div className="hidden lg:flex flex-1 items-center justify-center">
          <Player
            src="/animation/register.json"
            autoplay
            loop
            style={{ width: "90%", maxWidth: "450px" }}
          />
        </div>

        {/* Register Form */}
        <div className="flex-1 w-full max-w-md bg-white shadow-xl rounded-2xl p-8 border border-gray-200">
          <h1 className="text-3xl font-bold text-primary text-center mb-6">
            Create Account
          </h1>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Full Name */}
            <div className="relative">
              <Label htmlFor="fullName" className="pb-1">
                Full Name
              </Label>

              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center">
                  <User className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <Input
                  id="fullName"
                  name="fullName"
                  placeholder="Enter your full name"
                  value={form.fullName}
                  onChange={handleChange}
                  required
                  className="pl-10"
                />
              </div>
            </div>

            {/* Gender */}
            <div className="relative">
              <Label htmlFor="gender" className="pb-1">
                Gender
              </Label>

              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center">
                  <BookOpen
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </div>

                <Select
                  onValueChange={(val) => handleSelectChange("gender", val)}
                >
                  <SelectTrigger className="w-full pl-10">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Avatar Upload */}
            <div className="space-y-1">
              <Label htmlFor="avatar" className="text-sm font-medium">
                Profile Picture (Optional)
              </Label>
              <div className="relative">
                <input
                  id="avatar"
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="hidden"
                />
                <label
                  htmlFor="avatar"
                  className="flex items-center space-x-2 p-2 border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-primary transition-colors"
                >
                  <Upload className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    {avatar ? avatar.name : "Click to upload profile picture"}
                  </span>
                </label>
              </div>
            </div>

            {/* Phone Number */}
            <div className="relative">
              <Label htmlFor="phoneNumber" className="pb-1">
                Phone Number
              </Label>

              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center">
                  <Phone className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <Input
                  id="phoneNumber"
                  name="phoneNumber"
                  placeholder="Enter your phone number"
                  value={form.phoneNumber}
                  onChange={handleChange}
                  required
                  className="pl-10"
                />
              </div>
            </div>

            {/* Email */}
            <div className="relative">
              <Label htmlFor="email" className="pb-1">
                Email
              </Label>

              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center">
                  <Mail className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="pl-10"
                />
              </div>
            </div>

            {/* Password */}
            <div className="relative">
              <Label htmlFor="password" className="pb-1">
                Password
              </Label>

              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center">
                  <Lock className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <Input
                  id="password"
                  type="password"
                  name="password"
                  placeholder="Create a password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  className="pl-10"
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-white hover:bg-primary/90"
            >
              {loading ? "Registering..." : "Sign Up"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
