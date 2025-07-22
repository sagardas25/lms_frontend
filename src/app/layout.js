import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar.js";



const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "LMS Platform",
  description: "Learn. Create. Succeed.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <main className="min-h-screen">{children}</main>
      </body>
    </html>
  );
}