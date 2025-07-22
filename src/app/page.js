"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import FeatureCard from "@/components/FeatureCard";
import HowItWorksStep from "@/components/HowItWorksStep";
import Image from "next/image";

export default function HomePage() {
  return (
    <main className="bg-background text-textPrimary">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Empower Your Learning Journey with{" "}
            <span className="text-primary">LMS Platform</span>
          </h1>
          <p className="text-lg text-textSecondary mb-8">
            Learn new skills anytime, anywhere with expert-led video courses.
          </p>
          <div className="flex gap-4">
            <Link href="/student/course">
              <Button size="lg">Browse Courses</Button>
            </Link>
            <Link href="/instructor/dashboard">
              <Button variant="outline" size="lg">
                Become an Instructor
              </Button>
            </Link>
          </div>
        </div>
        <div className="flex justify-center">
          <Image
            src="/hero.svg"
            alt="Learning Illustration"
            width={500}
            height={400}
            className="w-full max-w-md"
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-card">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-semibold mb-12">Why Choose Us?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              title="Expert Instructors"
              description="Learn from professionals with years of industry experience."
              icon="🎓"
            />
            <FeatureCard
              title="Flexible Learning"
              description="Access courses anytime with lifetime access and mobile support."
              icon="📱"
            />
            <FeatureCard
              title="Secure Payments"
              description="Fast and secure checkout with Razorpay integration."
              icon="🔐"
            />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-background">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-semibold mb-12">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <HowItWorksStep
              step="1"
              title="Browse"
              description="Explore a wide range of curated courses."
            />
            <HowItWorksStep
              step="2"
              title="Enroll"
              description="Sign up and purchase courses securely."
            />
            <HowItWorksStep
              step="3"
              title="Learn"
              description="Access course videos and track your progress."
            />
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-primary text-lightText text-center">
        <h2 className="text-3xl font-semibold mb-4">
          Ready to start learning?
        </h2>
        <p className="mb-8 text-lg">Join thousands of learners today.</p>
        <Link href="/register">
          <Button
            variant="secondary"
            size="lg"
            className="bg-lightText text-primary hover:bg-background"
          >
            Sign Up Now
          </Button>
        </Link>
      </section>
    </main>
  );
}
