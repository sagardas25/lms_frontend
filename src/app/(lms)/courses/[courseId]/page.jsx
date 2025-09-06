"use client"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Users, Clock, Star, Play, ArrowLeft, CheckCircle } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"

export default function CourseDetailsPage() {
  const params = useParams()
  const [course, setCourse] = useState(null)
  const [loading, setLoading] = useState(true)
  const [enrolled, setEnrolled] = useState(false)

  useEffect(() => {
    fetchCourseDetails()
  }, [params.courseId])

  const fetchCourseDetails = async () => {
    try {
      // Mock data
      const mockCourse = {
        _id: params.courseId,
        title: "Complete React Development Course",
        subtitle: "Master React from fundamentals to advanced concepts",
        description: "This comprehensive course covers everything you need to know about React development.",
        price: 299,
        level: "Intermediate",
        duration: "15 hours",
        studentsEnrolled: 1250,
        rating: 4.8,
        totalRatings: 89
      }
      setCourse(mockCourse)
    } catch (err) {
      console.error("Failed to fetch course details:", err)
    } finally {
      setLoading(false)
    }
  }

  const handleEnroll = async () => {
    try {
      console.log("Enrolling in course:", params.courseId)
      setEnrolled(true)
    } catch (err) {
      console.error("Enrollment failed:", err)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-primary/5 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-primary/5 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-8">
          <Link href="/courses">
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Courses
            </Button>
          </Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Course Header */}
            <Card className="border-2 border-border/50 shadow-2xl bg-card/95 backdrop-blur-sm">
              <CardContent className="p-8">
                <div className="flex items-start space-x-6">
                  <div className="w-32 h-32 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center">
                    <BookOpen className="h-16 w-16 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h1 className="text-3xl font-bold mb-2">{course?.title}</h1>
                        <p className="text-muted-foreground text-lg mb-4">{course?.subtitle}</p>
                        <div className="flex items-center space-x-4 mb-4">
                          <Badge variant="secondary" className="bg-primary/10 text-primary">
                            {course?.level}
                          </Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-3xl font-bold text-primary">${course?.price}</div>
                        <div className="text-sm text-muted-foreground">One-time payment</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                      <span className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        {course?.studentsEnrolled} students
                      </span>
                      <span className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {course?.duration}
                      </span>
                      <span className="flex items-center">
                        <Star className="h-4 w-4 mr-1" />
                        {course?.rating} ({course?.totalRatings} reviews)
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Course Description */}
            <Card className="border-2 border-border/50 shadow-2xl bg-card/95 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-2xl">About this course</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">{course?.description}</p>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Enroll Card */}
            <Card className="border-2 border-border/50 shadow-2xl bg-card/95 backdrop-blur-sm sticky top-8">
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-primary mb-2">${course?.price}</div>
                  <div className="text-sm text-muted-foreground">One-time payment • Lifetime access</div>
                </div>
                
                {enrolled ? (
                  <div className="text-center">
                    <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-3" />
                    <h3 className="font-semibold mb-2">You're enrolled!</h3>
                    <Link href={`/courses/${course?._id}/learn`}>
                      <Button className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90">
                        <Play className="h-4 w-4 mr-2" />
                        Start Learning
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <Button 
                    onClick={handleEnroll}
                    className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-primary-foreground hover:shadow-lg hover:scale-105 transition-all duration-300"
                  >
                    Enroll Now
                  </Button>
                )}

                <div className="mt-6 space-y-3 text-sm">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Lifetime access</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Certificate of completion</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>30-day money-back guarantee</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}