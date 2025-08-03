
"use client";

import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function CreateCoursePage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    level: "",
    category: "",
    thumbnail: null,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "thumbnail") {
      setFormData((prev) => ({ ...prev, thumbnail: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.thumbnail) {
      return toast.error("Please upload a course thumbnail.");
    }

    const payload = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      payload.append(key, value);
    });

    try {
      setLoading(true);
      const { data } = await axios.post("http://localhost:8050/api/v1/course/create-new-course", payload); 
      toast.success("Course created successfully!");
      router.push(`/instructor/course/${data.courseId}/edit`);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create course.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen p-6 text-[#0c5c55]">
      {/* Blobs background */}
      <div className="absolute -z-10 inset-0 overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[400px] h-[400px] bg-[#0c5c55] opacity-30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[400px] h-[400px] bg-[#fb7185] opacity-30 rounded-full blur-3xl animate-pulse" />
      </div>

      <h1 className="text-3xl font-semibold mb-6">Create a New Course</h1>

      <form onSubmit={handleSubmit} className="bg-white/50 backdrop-blur-lg border border-white/30 p-6 rounded-2xl shadow-xl max-w-3xl mx-auto space-y-5">
        <div>
          <Label htmlFor="title">Title</Label>
          <Input id="title" name="title" value={formData.title} onChange={handleChange} required />
        </div>

        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea id="description" name="description" value={formData.description} onChange={handleChange} required />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="price">Price (₹)</Label>
            <Input id="price" name="price" type="number" value={formData.price} onChange={handleChange} required />
          </div>

          <div>
            <Label htmlFor="level">Level</Label>
            <Select onValueChange={(value) => setFormData({ ...formData, level: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="beginner">Beginner</SelectItem>
                <SelectItem value="intermediate">Intermediate</SelectItem>
                <SelectItem value="advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <Label htmlFor="category">Category</Label>
          <Input id="category" name="category" value={formData.category} onChange={handleChange} required />
        </div>

        <div>
          <Label htmlFor="thumbnail">Thumbnail</Label>
          <Input id="thumbnail" name="thumbnail" type="file" accept="image/*" onChange={handleChange} required />
        </div>

        <Button type="submit" disabled={loading} className="bg-[#0c5c55] text-white hover:bg-[#0a4e49]">
          {loading ? "Creating..." : "Create Course"}
        </Button>
      </form>
    </div>
  );
}
