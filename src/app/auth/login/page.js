// "use client";

// import { useState ,useEffect } from "react";
// import axios from "axios";
// import AuthForm from "@/components/AuthForm";
// import { Button } from "@/components/ui/button";
// import { useRouter } from "next/navigation";

// export default function LoginPage() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [msg, setMsg] = useState("");
//   const [checkingAuth, setCheckingAuth] = useState(true);
//   const router = useRouter();

//   useEffect(() => {
//     const checkAuth = async () => {
//       try {
//         const res = await axios.get(
//           "http://localhost:8050/api/v1/user/current-user-profile",
//           {
//             withCredentials: true,
//           }
//         );

//         if (res.data?.data) {
//           // User is logged in
//           router.replace("/"); // redirect to homepage
//         } else {
//           setCheckingAuth(false);
//         }
//       } catch (err) {
//         // Not logged in
//         setCheckingAuth(false);
//       }
//     };

//     checkAuth();
//   }, [router]);

//   if (checkingAuth) return null;

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setMsg("");
//     try {
//       await axios.post(
//         "http://localhost:8050/api/v1/auth/login",
//         { email, password },
//         { withCredentials: true }
//       );
//       // router.push("/");
//       window.location.href = "/";
//     } catch (err) {
//       setMsg(err.response?.data?.message || "Login failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <AuthForm>
//       <h2 className="text-2xl font-semibold text-primary mb-6">Welcome Back</h2>
//       {msg && <p className="mb-4 text-textSecondary">{msg}</p>}
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <input
//           type="email"
//           placeholder="Email Address"
//           required
//           className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-light"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           required
//           className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-light"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <Button
//           type="submit"
//           className="w-full bg-primary text-white hover:bg-primaryLight !py-3"
//           disabled={loading}
//         >
//           {loading ? "Logging in..." : "Login"}
//         </Button>
//       </form>
//       <div className="flex justify-between items-center mt-4 text-textSecondary">
//         <a href="/auth/forgot-password" className="text-primary underline">
//           Forgot password?
//         </a>
//         <a href="register" className="text-primary underline">
//           Sign Up
//         </a>
//       </div>
//     </AuthForm>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Player } from "@lottiefiles/react-lottie-player";
import { toast } from "sonner";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8050/api/v1/user/current-user-profile",
          { withCredentials: true }
        );

        if (res.data?.data) {
          router.replace("/");
        } else {
          setCheckingAuth(false);
        }
      } catch (err) {
        setCheckingAuth(false);
      }
    };

    checkAuth();
  }, [router]);

  if (checkingAuth) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(
        "http://localhost:8050/api/v1/auth/login",
        { email, password },
        { withCredentials: true }
      );
      toast.success("Login successful!");
      window.location.href = "/";
    } catch (err) {
      toast.error(err?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex-grow flex items-center justify-center bg-gradient-to-br h-[100vh] from-slate-100 to-white overflow-hidden pt-20 group">
      {/* Blobs */}
      <div className="absolute top-[-6rem] left-[-6rem] w-[30rem] h-[30rem] bg-[#0c5c55] opacity-10 rounded-full blur-[120px] mix-blend-multiply animate-blob-fast transition duration-300 ease-in-out group-hover:scale-110 group-hover:opacity-60"></div>
      <div className="absolute bottom-[-6rem] right-[-6rem] w-[30rem] h-[30rem] bg-[#0c5c55] opacity-20 rounded-full blur-[120px] mix-blend-multiply animate-blob-slow transition duration-300 ease-in-out group-hover:scale-110 group-hover:opacity-60"></div>

      <div className="z-10 w-full max-w-screen-xl px-4 md:px-10 flex flex-col lg:flex-row items-center justify-between h-full py-12 pt-2">
        {/* Lottie */}
        <div className="hidden lg:flex flex-1 items-center justify-center">
          <Player
            // src="https://lottie.host/d81a46f5-7641-422d-8253-ca30d3321ab0/xVRM7P6Px8.json"
            src="/animation/login.json"
            autoplay
            loop
            style={{ width: "90%", maxWidth: "450px" }}
          />
        </div>

        {/* Login Form */}
        <div className="flex-1 w-full max-w-md bg-white shadow-xl rounded-2xl p-8 border border-gray-200">
          <h1 className="text-3xl font-bold text-primary text-center mb-6">
            Welcome Back
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email" className="pb-1">
                Email
              </Label>
              <Input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-white hover:bg-primary/90"
            >
              {loading ? "Logging in..." : "Login"}
            </Button>
          </form>

          <div className="flex justify-between items-center mt-4 text-sm text-muted-foreground">
            <a href="/auth/forgot-password" className="text-primary underline">
              Forgot password?
            </a>
            <a href="/auth/register" className="text-primary underline">
              Sign Up
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
