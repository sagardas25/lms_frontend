"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Card, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import Image from "next/image";

const PAGE_SIZE = 4;

export default function MyCreatedCoursesPage() {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [filter, setFilter] = useState("all"); 
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchCourses = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8050/api/v1/course/get-my-created-courses",
        {
          withCredentials: true,
        }
      );
      const all = res?.data?.data || [];
      setCourses(all);
      setFilteredCourses(all);
    } catch (err) {
      toast.error("Failed to load courses");
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (type) => {
    setFilter(type);
    setCurrentPage(1);

    if (type === "published") {
      setFilteredCourses(courses.filter((course) => course.isPublished));
    } else if (type === "unpublished") {
      setFilteredCourses(courses.filter((course) => !course.isPublished));
    } else {
      setFilteredCourses(courses);
    }
  };

  const paginatedCourses = filteredCourses.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const totalPages = Math.ceil(filteredCourses.length / PAGE_SIZE);

  useEffect(() => {
    fetchCourses();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  gap-6 p-4">
        {Array(6)
          .fill(0)
          .map((_, i) => (
            <Card key={i} className="p-4">
              <Skeleton className="h-[140px] w-full mb-4" />
              <Skeleton className="h-6 w-2/3 mb-2" />
              <Skeleton className="h-4 w-1/2" />
            </Card>
          ))}
      </div>
    );
  }

  return (
    <div className="p-6 ">
      <h3 className="text-3xl font-bold text-center  text-primary mb-8">
        My Created Courses
      </h3>

      <div className="flex justify-center gap-4 mb-8">
        <Button
          variant={filter === "all" ? "default" : "outline"}
          onClick={() => handleFilterChange("all")}
        >
          All
        </Button>
        <Button
          variant={filter === "published" ? "default" : "outline"}
          onClick={() => handleFilterChange("published")}
        >
          Published
        </Button>
        <Button
          variant={filter === "unpublished" ? "default" : "outline"}
          onClick={() => handleFilterChange("unpublished")}
        >
          Unpublished
        </Button>
      </div>

      {paginatedCourses.length === 0 ? (
        <p className="text-center text-muted-foreground">No courses found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0">
          {paginatedCourses.map((course) => (
            <Card
              key={course._id}
              className="hover:shadow-md w-[80%] h-[90%] my-auto mx-1 py-4 px-1 bg-white/60   transition duration-200 border cursor-pointer flex flex-col  "
              // onClick={() => router.push(`/instructor/courses/${course._id}`)}
            >
              {/* Thumbnail */}
              <div className="relative w-[90%] h-42 mx-auto  py-0">
                <Image
                  src={course.thumbnail}
                  alt={course.title}
                  fill
                  className="object-fill rounded-xl"
                />
              </div>

              {/* Title */}
              <div className="px-2 py-0 flex-1 m-0">
                <CardTitle className="text-base  font-semibold truncate">
                  {course.title}
                </CardTitle>
              </div>

              {/* Footer */}
              <CardContent className="flex items-center justify-between px-2 py-0 my-0 ">
                <Badge
                  variant={course.isPublished ? "success" : "outline"}
                  className={
                    course.isPublished
                      ? "bg-green-600 text-white"
                      : "text-muted-foreground"
                  }
                >
                  {course.isPublished ? "Published" : "Unpublished"}
                </Badge>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    router.push(`/instructor/courses/${course._id}`);
                  }}
                >
                  Manage
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-8 space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>

          <span className="px-3 text-muted-foreground text-sm">
            Page {currentPage} of {totalPages}
          </span>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}
