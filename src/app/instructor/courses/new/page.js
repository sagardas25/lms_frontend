"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

const categories = [
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

const levels = ["beginner", "intermediate", "advanced"];

export default function CreateCoursePage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    description: "",
    category: "",
    level: "",
    price: "",
  });

  const [thumbnail, setThumbnail] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFileChange = (e) => {
    setThumbnail(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!thumbnail) {
      toast.error("Thumbnail is required");
      return;
    }

    const form = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      form.append(key, value);
    });
    form.append("thumbnail", thumbnail);

    try {
      setLoading(true);
      await axios.post(
        "http://localhost:8050/api/v1/course/create-new-course",
        form,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success("Course created successfully!");
      // router.push("/instructor/courses");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to create course");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white/50 p-8 rounded-lg shadow-lg border border-gray-200 ">
      <h2 className="text-3xl font-bold mb-6 text-[#0c5c55] text-center">
        Create New Course
      </h2>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 "
      >
        {/* Blobs
        <div className="absolute inset-0 -z-10 pointer-events-none">
          <div className="absolute top-0 left-0 w-72 h-72 bg-gradient-to-br from-[#0c5c55] to-[#7ec8c4] rounded-full blur-[120px] opacity-50" />
          <div className="absolute bottom-0 right-0 w-72 h-72 bg-gradient-to-br from-[#0c5c55] to-[#7ec8c4] rounded-full blur-[120px] opacity-50" />
        </div> */}
        <div>
          <Label htmlFor="title" className="mb-1">
            Title
          </Label>
          <Input
            name="title"
            className="bg-white/30 border-white/70"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <Label htmlFor="subtitle" className="mb-1">
            Subtitle
          </Label>
          <Input
            name="subtitle"
            className="bg-white/30 border-white/70"
            value={formData.subtitle}
            onChange={handleChange}
            required
          />
        </div>

        <div className="md:col-span-2">
          <Label htmlFor="description" className="mb-1">
            Description
          </Label>
          <Textarea
            name="description"
            className="bg-white/30 border-white/70 resize-none" 
            value={formData.description}
            onChange={handleChange}
            rows={4}
            required
          />
        </div>

        <div>
          <Label className="mb-1">Category</Label>
          <Select
            className="bg-white/30 border-white/70"
            value={formData.category}
            onValueChange={(value) =>
              setFormData((prev) => ({ ...prev, category: value }))
            }
          >
            <SelectTrigger className="bg-white/30 border-white/70">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="mb-1">Level</Label>
          <Select
            value={formData.level}
            onValueChange={(value) =>
              setFormData((prev) => ({ ...prev, level: value }))
            }
          >
            <SelectTrigger className="bg-white/30 border-white/70">
              <SelectValue placeholder="Select level" />
            </SelectTrigger>
            <SelectContent>
              {levels.map((level) => (
                <SelectItem key={level} value={level}>
                  {level}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="price" className="mb-1">
            Price (₹)
          </Label>
          <Input
            className="bg-white/30 border-white/70"
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <Label htmlFor="thumbnail" className="mb-1">
            Thumbnail
          </Label>
          <Input
            className="bg-white/30 border-white/70"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            required
          />
        </div>

        <div className="md:col-span-2 flex justify-end">
          <Button
            type="submit"
            className="bg-[#0c5c55] text-white hover:bg-[#0b4d48]"
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Course"}
          </Button>
        </div>
      </form>
    </div>
  );
}
