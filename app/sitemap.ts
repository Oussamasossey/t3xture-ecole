import type { MetadataRoute } from "next";
import { site } from "@/data/site";
import { courses } from "@/data/courses";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = ["", "/courses", "/teachers", "/about", "/contact"].map((path) => ({
    url: `${site.url}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const coursePages = courses.map((course) => ({
    url: `${site.url}/courses/${course.slug}`,
    lastModified: new Date(course.updated),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...coursePages];
}
