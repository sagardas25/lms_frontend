"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "@/components/Sidebar";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  BookOpen,
  Play,
  Star,
  Clock,
  ChevronRightIcon,
  ChevronLeftIcon,
} from "lucide-react";

const categories = [
  "All",
  "Web Development",
  "Mobile Development",
  "Data Science",
  "Programming Languages",
  "Machine Learning",
  "AI",
  "UI/UX Design",
  "Cybersecurity",
  "Business",
  "Other",
];

function EnrolledCoursesPage() {
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedCategory, setSelectedCategory] = useState("All");

  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 3;

  // Filter courses by category
  const filteredCourses =
    selectedCategory === "All"
      ? enrolledCourses
      : enrolledCourses.filter(
          (course) => course.category === selectedCategory
        );

  const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = filteredCourses.slice(
    indexOfFirstCourse,
    indexOfLastCourse
  );

  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      try {
        const userRes = await axios.get(
          "http://localhost:8050/api/v1/user/current-user-profile",
          { withCredentials: true }
        );

        const courses = userRes.data?.data?.enrolledCourses || [];

        const detailedCourses = await Promise.all(
          courses.map(async (c) => {
            const courseRes = await axios.get(
              `http://localhost:8050/api/v1/course/c/${c.course}`,
              { withCredentials: true }
            );
            return courseRes.data?.data;
          })
        );

        setEnrolledCourses(detailedCourses);
      } catch (err) {
        console.error("Failed to fetch enrolled courses", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEnrolledCourses();
  }, []);

  // Reset to page 1 when category changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory]);

  return (
    <div className="flex h-full bg-background">
      <Sidebar />

      <main className="flex-1 px-10 space-y-6 mt-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-foreground">
            My Enrolled Courses
          </h1>
          <p className="text-muted-foreground">
            Here are all the courses you’ve enrolled in
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-3 mb-4">
          {categories.map((cat) => (
            <Button
              key={cat}
              variant={selectedCategory === cat ? "default" : "outline"}
              onClick={() => setSelectedCategory(cat)}
              className="rounded-full text-sm"
            >
              {cat}
            </Button>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" /> Enrolled Courses
            </CardTitle>
            <CardDescription>
              Continue learning from your enrolled courses
            </CardDescription>
          </CardHeader>

          <CardContent>
            {loading ? (
              <p>Loading your courses...</p>
            ) : filteredCourses.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {currentCourses.map((course, idx) => (
                    <div
                      key={idx}
                      className="bg-card border border-border rounded-2xl shadow-md hover:shadow-lg transition-shadow overflow-hidden flex flex-col"
                    >
                      {/* Thumbnail */}
                      <div className="relative">
                        <img
                          src={course.thumbnail}
                          alt={course.title}
                          className="w-full h-40 object-cover"
                        />
                        <div className="absolute top-2 left-2 flex gap-2">
                          <span className="bg-primary/80 text-primary-foreground text-xs px-2 py-0.5 rounded-full">
                            {course.category}
                          </span>
                          <span className="bg-secondary/80 text-secondary-foreground text-xs px-2 py-0.5 rounded-full">
                            {course.level}
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-4 flex-1 flex flex-col">
                        <h3 className="text-lg font-semibold text-foreground mb-1 line-clamp-1">
                          {course.title}
                        </h3>

                        {/* Instructor */}
                        <div className="flex items-center gap-2 mb-3">
                          <img
                            src={course.instructor?.avatar}
                            alt={course.instructor?.fullName}
                            className="w-8 h-8 rounded-full border border-border"
                          />
                          <p className="text-xs text-muted-foreground">
                            {course.instructor?.fullName}
                          </p>
                        </div>

                        {/* Stats */}
                        <div className="flex justify-between items-center text-xs text-muted-foreground mb-4 border-y pb-2 border-border pt-3">
                          <div className="flex items-center gap-1">
                            <BookOpen className="h-4 w-4 text-primary" />
                            <span className="font-medium text-foreground">
                              {course.totalLectures}
                            </span>
                            <span className="ml-1">Lectures</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4 text-secondary" />
                            <span className="font-medium text-foreground">
                              {course.totalDuration}
                            </span>
                            <span className="ml-1">min</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 text-yellow-500" />
                            <span className="font-medium text-foreground">
                              {course.averageRating}
                            </span>
                            <span className="ml-1">
                              ({course.totalRatings})
                            </span>
                          </div>
                        </div>

                        {/* Action */}
                        <Button
                          variant="default"
                          className="mt-auto w-full flex items-center justify-center gap-2"
                          onClick={() =>
                            (window.location.href = `/courses/${
                              course._id
                            }/learn/${
                              course.sections?.[0]?.lectures?.[0]?._id ?? ""
                            }`)
                          }
                        >
                          <Play className="h-4 w-4" /> Continue
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pagination Controls */}
                <div className="flex justify-center items-center gap-2 mt-8">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handlePrev}
                    disabled={currentPage === 1}
                    className="rounded-full border-gray-400"
                  >
                    <ChevronLeftIcon />
                  </Button>

                  <span className="text-sm text-muted-foreground">
                    Page {currentPage} of {totalPages}
                  </span>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleNext}
                    disabled={currentPage === totalPages}
                    className="rounded-full border-gray-400"
                  >
                    <ChevronRightIcon />
                  </Button>
                </div>
              </>
            ) : (
              <p className="text-muted-foreground">
                No courses found for this category.
              </p>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

export default EnrolledCoursesPage;
