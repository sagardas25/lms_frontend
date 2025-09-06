// "use client"
// import { useState } from "react"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { BookOpen, Mail, ArrowLeft, CheckCircle, Send } from "lucide-react"
// import Link from "next/link"

// export default function ForgotPasswordPage() {
//   const [email, setEmail] = useState("")
//   const [loading, setLoading] = useState(false)
//   const [message, setMessage] = useState("")
//   const [error, setError] = useState("")

//   async function onSubmit(e) {
//     e.preventDefault()
//     setLoading(true)
//     setMessage("")
//     setError("")
//     try {
//       // TODO: Replace with actual API call
//       // await api.post("/auth/forgot-password", { email })
//       console.log("Forgot password request:", { email })
//       setMessage("If an account with this email exists, we've sent you a password reset link.")
//     } catch (err) {
//       setError(err?.response?.data?.message || "Failed to send reset link")
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-primary/5 flex items-center justify-center p-4">
//       {/* Background decoration */}
//       <div className="absolute inset-0 overflow-hidden">
//         <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-full blur-3xl animate-float"></div>
//         <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-secondary/5 to-primary/5 rounded-full blur-3xl animate-float" style={{ animationDelay: "1s" }}></div>
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
//           <p className="text-muted-foreground">No worries! We'll help you reset your password.</p>
//         </div>

//         <Card className="border-2 border-border/50 shadow-2xl bg-card/95 backdrop-blur-sm">
//           <CardHeader className="space-y-2 text-center">
//             <CardTitle className="text-2xl font-bold">Forgot Password?</CardTitle>
//             <CardDescription>
//               Enter your email address and we'll send you a link to reset your password
//             </CardDescription>
//           </CardHeader>
//           <CardContent>
//             <form onSubmit={onSubmit} className="space-y-6">
//               {error && (
//                 <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm">
//                   {error}
//                 </div>
//               )}
              
//               {message && (
//                 <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20 text-green-600 text-sm flex items-center space-x-2">
//                   <CheckCircle className="h-4 w-4" />
//                   <span>{message}</span>
//                 </div>
//               )}

//               <div className="space-y-2">
//                 <Label htmlFor="email" className="text-sm font-medium">Email Address</Label>
//                 <div className="relative">
//                   <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//                   <Input
//                     id="email"
//                     type="email"
//                     placeholder="Enter your email address"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     className="pl-10 border-2 focus:border-primary transition-colors"
//                     required
//                   />
//                 </div>
//               </div>

//               <Button
//                 type="submit"
//                 disabled={loading}
//                 className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-primary-foreground hover:shadow-lg hover:scale-105 transition-all duration-300"
//               >
//                 {loading ? (
//                   <div className="flex items-center space-x-2">
//                     <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin"></div>
//                     <span>Sending reset link...</span>
//                   </div>
//                 ) : (
//                   <div className="flex items-center space-x-2">
//                     <Send className="h-4 w-4" />
//                     <span>Send Reset Link</span>
//                   </div>
//                 )}
//               </Button>
//             </form>

//             <div className="mt-6 text-center space-y-4">
//               <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
//                 <ArrowLeft className="h-4 w-4" />
//                 <Link href="/login" className="hover:text-primary transition-colors">
//                   Back to sign in
//                 </Link>
//               </div>
              
//               <p className="text-sm text-muted-foreground">
//                 Don't have an account?{" "}
//                 <Link href="/register" className="text-primary hover:underline font-medium">
//                   Sign up
//                 </Link>
//               </p>
//             </div>
//           </CardContent>
//         </Card>

//         {/* Back to home */}
//         <div className="text-center mt-6">
//           <Link href="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
//             ← Back to home
//           </Link>
//         </div>
//       </div>
//     </div>
//   )
// }


"use client";

import { useState } from "react";
import axios from "axios";
import AuthForm from "@/components/AuthForm";
import { Button } from "@/components/ui/button";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/api/v1/auth/forgot-password", { email });
      setMsg("A reset link has been sent to your email.");
    } catch {
      setMsg("Error sending reset link.");
    }
  };

  return (
    <AuthForm>
      <h2 className="text-2xl font-semibold text-primary mb-6">Forgot Password</h2>
      {msg && <p className="mb-4 text-textSecondary">{msg}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Your Email"
          required
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-light"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button className="w-full bg-primary text-white hover:bg-primaryLight !py-3">
          Send Reset Link
        </Button>
      </form>
    </AuthForm>
  );
}

