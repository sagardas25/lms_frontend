// "use client"
// import { useState } from "react"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { BookOpen, Lock, Eye, EyeOff, CheckCircle, ArrowRight } from "lucide-react"
// import Link from "next/link"
// import { useRouter } from "next/navigation"

// export default function ResetPasswordTokenPage({ params }) {
//   const router = useRouter()
//   const [formData, setFormData] = useState({
//     newPassword: "",
//     confirmPassword: ""
//   })
//   const [showPassword, setShowPassword] = useState(false)
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false)
//   const [loading, setLoading] = useState(false)
//   const [message, setMessage] = useState("")
//   const [error, setError] = useState("")

//   const handleInputChange = (e) => {
//     setFormData(prev => ({
//       ...prev,
//       [e.target.name]: e.target.value
//     }))
//   }

//   async function onSubmit(e) {
//     e.preventDefault()
//     setLoading(true)
//     setMessage("")
//     setError("")

//     // Validation
//     if (formData.newPassword !== formData.confirmPassword) {
//       setError("Passwords do not match")
//       setLoading(false)
//       return
//     }

//     if (formData.newPassword.length < 6) {
//       setError("Password must be at least 6 characters")
//       setLoading(false)
//       return
//     }

//     try {
//       // TODO: Replace with actual API call
//       // await api.post("/auth/reset-password", { 
//       //   token: params.token, 
//       //   newPassword: formData.newPassword 
//       // })
//       console.log("Reset password attempt:", { token: params.token, newPassword: formData.newPassword })
//       setMessage("Password updated successfully! Redirecting to login...")
//       setTimeout(() => {
//         router.push("/login")
//       }, 2000)
//     } catch (err) {
//       setError(err?.response?.data?.message || "Failed to reset password")
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
//           <p className="text-muted-foreground">Create a new password for your account.</p>
//         </div>

//         <Card className="border-2 border-border/50 shadow-2xl bg-card/95 backdrop-blur-sm">
//           <CardHeader className="space-y-2 text-center">
//             <CardTitle className="text-2xl font-bold">Reset Password</CardTitle>
//             <CardDescription>
//               Enter your new password below
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
//                 <Label htmlFor="newPassword" className="text-sm font-medium">New Password</Label>
//                 <div className="relative">
//                   <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//                   <Input
//                     id="newPassword"
//                     name="newPassword"
//                     type={showPassword ? "text" : "password"}
//                     placeholder="Enter your new password"
//                     value={formData.newPassword}
//                     onChange={handleInputChange}
//                     className="pl-10 pr-10 border-2 focus:border-primary transition-colors"
//                     required
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowPassword(!showPassword)}
//                     className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
//                   >
//                     {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
//                   </button>
//                 </div>
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="confirmPassword" className="text-sm font-medium">Confirm New Password</Label>
//                 <div className="relative">
//                   <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//                   <Input
//                     id="confirmPassword"
//                     name="confirmPassword"
//                     type={showConfirmPassword ? "text" : "password"}
//                     placeholder="Confirm your new password"
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
//                     {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
//                   </button>
//                 </div>
//               </div>

//               {/* Password requirements */}
//               <div className="space-y-2">
//                 <p className="text-xs text-muted-foreground">Password requirements:</p>
//                 <ul className="text-xs text-muted-foreground space-y-1">
//                   <li className={`flex items-center space-x-2 ${formData.newPassword.length >= 6 ? 'text-green-600' : ''}`}>
//                     <div className={`w-1.5 h-1.5 rounded-full ${formData.newPassword.length >= 6 ? 'bg-green-600' : 'bg-muted-foreground'}`}></div>
//                     <span>At least 6 characters</span>
//                   </li>
//                   <li className={`flex items-center space-x-2 ${formData.newPassword === formData.confirmPassword && formData.newPassword.length > 0 ? 'text-green-600' : ''}`}>
//                     <div className={`w-1.5 h-1.5 rounded-full ${formData.newPassword === formData.confirmPassword && formData.newPassword.length > 0 ? 'bg-green-600' : 'bg-muted-foreground'}`}></div>
//                     <span>Passwords match</span>
//                   </li>
//                 </ul>
//               </div>

//               <Button
//                 type="submit"
//                 disabled={loading || formData.newPassword !== formData.confirmPassword || formData.newPassword.length < 6}
//                 className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-primary-foreground hover:shadow-lg hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
//               >
//                 {loading ? (
//                   <div className="flex items-center space-x-2">
//                     <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin"></div>
//                     <span>Updating password...</span>
//                   </div>
//                 ) : (
//                   <div className="flex items-center space-x-2">
//                     <span>Update Password</span>
//                     <ArrowRight className="h-4 w-4" />
//                   </div>
//                 )}
//               </Button>
//             </form>

//             <div className="mt-6 text-center">
//               <p className="text-sm text-muted-foreground">
//                 Remember your password?{" "}
//                 <Link href="/login" className="text-primary hover:underline font-medium">
//                   Sign in
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

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import axios from "axios";
import AuthForm from "@/components/AuthForm";
import { Button } from "@/components/ui/button";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/api/v1/auth/reset-password", {
        token,
        password,
      });
      setMsg("Password reset successful! Redirecting to login...");
      setTimeout(() => router.push("/login"), 2000);
    } catch {
      setMsg("Error resetting password.");
    }
  };

  return (
    <AuthForm>
      <h2 className="text-2xl font-semibold text-primary mb-6">Reset Password</h2>
      {msg && <p className="mb-4 text-textSecondary">{msg}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="password"
          placeholder="New Password"
          required
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-light"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button className="w-full bg-primary text-white hover:bg-primaryLight !py-3">
          Reset Password
        </Button>
      </form>
    </AuthForm>
  );
}
