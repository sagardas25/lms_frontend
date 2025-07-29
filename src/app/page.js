// "use client";

// import Link from "next/link";
// import { Button } from "@/components/ui/button";
// import Image from "next/image";

// export default function HomePage() {
//   return (
//     <main className="bg-[#f7fdfc] text-[#0c5c55] group">
//       <div className="absolute top-[-6rem] left-[-6rem] w-[30rem] h-[30rem] bg-[rgb(12,92,85)]  opacity-10 rounded-full blur-[120px] mix-blend-multiply animate-blob-fast transition duration-300 ease-in-out group-hover:scale-110 group-hover:opacity-60"></div>
//       <div className="absolute bottom-[-6rem] right-[-6rem] w-[30rem] h-[30rem] bg-[rgb(12,92,85)]  opacity-20 rounded-full blur-[120px] mix-blend-multiply animate-blob-slow transition duration-300 ease-in-out group-hover:scale-110 group-hover:opacity-60"></div>

//       <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 grid grid-cols-1 md:grid-cols-2 gap-16 items-center min-h-screen">
//         {/* Text Section */}
//         <div className="space-y-6 text-center md:text-left">
//           <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
//             Empower Your Learning Journey with{" "}
//             <span className="text-primary">LMS Platform</span>
//           </h1>

//           <p className="text-base sm:text-lg text-[#4b635f] max-w-xl mx-auto md:mx-0">
//             Learn from industry experts. Flexible, affordable, and effective
//             online courses — built just for you.
//           </p>

//           <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4 pt-4">
//             <Link href="/student/course">
//               <Button
//                 className="bg-primary text-white hover:bg-[#0a4e49] w-full sm:w-auto"
//                 size="lg"
//               >
//                 Browse Courses
//               </Button>
//             </Link>
//             <Link href="/instructor/dashboard">
//               <Button
//                 variant="outline"
//                 className="border-primary text-primary hover:bg-[#e0f2f1] w-full sm:w-auto"
//                 size="lg"
//               >
//                 Teach on LMS
//               </Button>
//             </Link>
//           </div>
//         </div>

//         {/* Illustration Section */}
//         <div className="flex justify-center">
//           <Image
//             src="/hero.png"
//             alt="Online learning"
//             width={1000}
//             height={1000}
//             className="w-full max-w-sm sm:max-w-md md:max-w-lg h-auto"
//             priority
//           />
//         </div>
//       </section>
//     </main>
//   );
// }


"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Player } from "@lottiefiles/react-lottie-player";

export default function HomePage() {
  return (
    <main className="bg-[#f7fdfc] text-[#0c5c55] group">
      {/* Blobs */}
      <div className="absolute top-[-6rem] left-[-6rem] w-[30rem] h-[30rem] bg-[rgb(12,92,85)] opacity-10 rounded-full blur-[120px] mix-blend-multiply animate-blob-fast transition duration-300 ease-in-out group-hover:scale-110 group-hover:opacity-60"></div>
      <div className="absolute bottom-[-6rem] right-[-6rem] w-[30rem] h-[30rem] bg-[rgb(12,92,85)] opacity-20 rounded-full blur-[120px] mix-blend-multiply animate-blob-slow transition duration-300 ease-in-out group-hover:scale-110 group-hover:opacity-60"></div>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 grid grid-cols-1 md:grid-cols-2 gap-16 items-center min-h-screen">
        {/* Text Section */}
        <div className="space-y-6 text-center md:text-left">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
            Empower Your Learning Journey with{" "}
            <span className="text-primary">LMS Platform</span>
          </h1>

          <p className="text-base sm:text-lg text-[#4b635f] max-w-xl mx-auto md:mx-0">
            Learn from industry experts. Flexible, affordable, and effective
            online courses — built just for you.
          </p>

          <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4 pt-4">
            <Link href="/student/course">
              <Button
                className="bg-primary text-white hover:bg-[#0a4e49] w-full sm:w-auto"
                size="lg"
              >
                Browse Courses
              </Button>
            </Link>
            <Link href="/instructor/dashboard">
              <Button
                variant="outline"
                className="border-primary text-primary hover:bg-[#e0f2f1] w-full sm:w-auto"
                size="lg"
              >
                Teach on LMS
              </Button>
            </Link>
          </div>
        </div>

        {/* Lottie Animation Section */}
        <div className="flex justify-center">
          <Player
            src="https://lottie.host/f48d55ce-59a4-4b52-b835-3a1520bf521a/7QhjFSIFXC.json"
            autoplay
            loop
            className="w-full max-w-sm sm:max-w-md md:max-w-lg h-auto"
          />
        </div>
      </section>
    </main>
  );
}
