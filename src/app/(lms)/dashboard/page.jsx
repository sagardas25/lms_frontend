"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import {
  BookOpen,
  Play,
  CheckCircle2,
  Award,
  ChevronRight,
  Clock,
} from "lucide-react";
import Sidebar from "@/components/Sidebar";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

export default function StudentDashboard() {
  const [stats, setStats] = useState(null);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [coursesData, setCoursesData] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8050/api/v1/user/current-user-profile",
          { withCredentials: true }
        );
        setStats(res.data?.data);
        setEnrolledCourses(res.data?.data?.enrolledCourses || []);
      } catch (err) {
        setStats(null);
      }
    };

    if (!stats) fetchUser();
  }, [stats]);

  useEffect(() => {
    const fetchAllCourses = async () => {
      try {
        const data = await Promise.all(
          enrolledCourses.map(async (courseItem) => {
            const res = await axios.get(
              `http://localhost:8050/api/v1/course/c/${courseItem.course}`,
              { withCredentials: true }
            );
            return res.data.data;
          })
        );
        setCoursesData(data);
      } catch (err) {
        console.error("Error fetching courses:", err);
      }
    };

    if (enrolledCourses.length > 0) fetchAllCourses();
  }, [enrolledCourses]);

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 p-6 space-y-6 mt-20">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Welcome back, {stats?.fullName?.split(" ")[0] || "Student"}!
            </h1>
            <p className="text-muted-foreground mt-1">
              Ready to continue your learning journey?
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            Last login: 2 hours ago
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-6 flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Enrolled Courses
                </p>
                <p className="text-2xl font-bold text-foreground">
                  {stats?.totalEnrolledCourses || 0}
                </p>
              </div>
              <BookOpen className="h-8 w-8 text-primary" />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Completed Courses
                </p>
                <p className="text-2xl font-bold text-foreground">
                  {stats?.completed || "-"}
                </p>
              </div>
              <CheckCircle2 className="h-8 w-8 text-chart-4" />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Certificates
                </p>
                <p className="text-2xl font-bold text-foreground">
                  {stats?.completed || "-"}
                </p>
              </div>
              <Award className="h-8 w-8 text-accent" />
            </CardContent>
          </Card>
        </div>

        {/* Current Courses */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" /> Current Courses
            </CardTitle>
            <CardDescription>Continue your learning progress</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {coursesData.length > 0 ? (
              coursesData.slice(0, 3).map((course, idx) => {
                // will add later with proper backend
                const totalLectures = course.sections.reduce(
                  (sum, section) => sum + section.lectures.length,
                  0
                );
                const progress = course.progress || 0;

                return (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <BookOpen className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">
                          {course.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {course.instructor?.fullName 
                            }
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <Progress value={progress} className="w-24 h-2" />
                          <span className="text-xs text-muted-foreground">
                            {progress}%
                          </span>
                        </div>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Play className="h-4 w-4 mr-2" /> Continue
                    </Button>
                  </div>
                );
              })
            ) : (
              <p className="text-gray-500">No current courses enrolled.</p>
            )}

            <Button variant="outline" className="w-full bg-transparent">
              View All Courses <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
