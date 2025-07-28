// "use client";

// import { useState } from "react";
// import axios from "axios";
// import { useRouter } from "next/navigation";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
//   Select,
//   SelectTrigger,
//   SelectValue,
//   SelectContent,
//   SelectItem,
// } from "@/components/ui/select";
// import { toast } from "sonner";
// import Image from "next/image";

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

//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSelectChange = (field, value) => {
//     setForm({ ...form, [field]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       await axios.post("http://localhost:8050/api/v1/auth/register", form, {
//         withCredentials: true,
//       });
//       toast.success("Registration successful!");
//       router.push("/auth/login");
//     } catch (err) {
//       toast.error(err?.response?.data?.message || "Registration failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex flex-col lg:flex-row items-center justify-center bg-gradient-to-br from-slate-100 to-white pt-20">
//       {/* Left: Illustration (hidden on mobile) */}
//       <div className="hidden lg:flex w-1/2 h-full items-center justify-center bg-muted">
//         <Image
//           src="/illustrations/register.png"
//           alt="Signup Illustration"
//           width={500}
//           height={500}
//           className="max-w-[80%] h-auto object-contain"
//           priority
//         />
//       </div>

//       {/* Right: Form */}
//       <div className="w-full lg:w-1/2 px-6 py-12  pt-1 flex items-center justify-center">
//         <div className="w-full max-w-md space-y-6 bg-white shadow-xl rounded-2xl p-8 border border-gray-200">
//           <h1 className="text-3xl font-bold text-primary text-center">
//             Create Account
//           </h1>
//           <form className="space-y-4" onSubmit={handleSubmit}>
//             <div>
//               <Label htmlFor="fullName">Full Name</Label>
//               <Input name="fullName" value={form.fullName} onChange={handleChange} required />
//             </div>

//             <div>
//               <Label htmlFor="gender">Gender</Label>
//               <Select onValueChange={(val) => handleSelectChange("gender", val)}>
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
//               <Label htmlFor="country">Country</Label>
//               <Input name="country" value={form.country} onChange={handleChange} required />
//             </div>

//             <div>
//               <Label htmlFor="phoneNumber">Phone Number</Label>
//               <Input name="phoneNumber" value={form.phoneNumber} onChange={handleChange} required />
//             </div>

//             <div>
//               <Label htmlFor="email">Email</Label>
//               <Input type="email" name="email" value={form.email} onChange={handleChange} required />
//             </div>

//             <div>
//               <Label htmlFor="password">Password</Label>
//               <Input type="password" name="password" value={form.password} onChange={handleChange} required />
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

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("http://localhost:8050/api/v1/auth/register", form, {
        withCredentials: true,
      });
      toast.success("Registration successful!");
      router.push("/auth/login");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex-grow flex items-center justify-center bg-gradient-to-br from-slate-100 to-white overflow-hidden pt-20 group">
      <div className="absolute top-[-6rem] left-[-6rem] w-[30rem] h-[30rem] bg-[#0c5c55]  opacity-10 rounded-full blur-[120px] mix-blend-multiply animate-blob-fast transition duration-300 ease-in-out group-hover:scale-110 group-hover:opacity-60"></div>
       <div className="absolute bottom-[-6rem] right-[-6rem] w-[30rem] h-[30rem] bg-[#0c5c55] opacity-20 rounded-full blur-[120px] mix-blend-multiply animate-blob-slow transition duration-300 ease-in-out group-hover:scale-110 group-hover:opacity-60"></div> 


      {/* Content Container */}
      <div className="z-10 w-full max-w-screen-xl px-4 md:px-10 flex flex-col lg:flex-row items-center justify-between h-full py-12 pt-2">
        {/* Lottie Animation */}
        <div className="hidden lg:flex flex-1 items-center justify-center">
          <Player
            src="https://lottie.host/16634aab-1f36-4ab9-acec-b604846b1fa4/hkJYGxwafl.json"
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
            <div>
              <Label htmlFor="fullName" className="pb-1">
                Full Name
              </Label>
              <Input
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label htmlFor="gender" className="pb-1">
                Gender
              </Label>
              <Select
                onValueChange={(val) => handleSelectChange("gender", val)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="country" className="pb-1">
                Country
              </Label>
              <Input
                name="country"
                value={form.country}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label htmlFor="phoneNumber" className="pb-1">
                Phone Number
              </Label>
              <Input
                name="phoneNumber"
                value={form.phoneNumber}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label htmlFor="email" className="pb-1">
                Email
              </Label>
              <Input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label htmlFor="password" className="pb-1">
                Password
              </Label>
              <Input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
              />
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
