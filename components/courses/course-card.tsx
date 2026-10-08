"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen, Clock, Star, Users, Video, MapPin } from "lucide-react";
import type { Course } from "@/types";
import { levelNames } from "@/data/courses";
import { Flag } from "@/components/flag";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const languageGradients: Record<string, string> = {
  english: "from-blue-500 via-indigo-500 to-purple-500",
  spanish: "from-orange-400 via-rose-500 to-pink-500",
  french: "from-indigo-500 via-blue-500 to-cyan-500",
  german: "from-amber-400 via-orange-500 to-red-500",
  italian: "from-emerald-400 via-teal-500 to-green-600",
  portuguese: "from-lime-400 via-emerald-500 to-teal-600",
  dutch: "from-orange-400 via-red-500 to-rose-500",
  russian: "from-sky-400 via-blue-600 to-indigo-600",
  japanese: "from-rose-400 via-pink-500 to-fuchsia-500",
  korean: "from-violet-400 via-purple-500 to-indigo-500",
  chinese: "from-red-400 via-rose-500 to-orange-500",
  arabic: "from-teal-400 via-emerald-500 to-green-600",
};

export function CourseCard({ course, index = 0 }: { course: Course; index?: number }) {
  const gradient = languageGradients[course.languageSlug] ?? "from-blue-500 to-purple-500";

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.3), ease: [0.16, 1, 0.3, 1] }}
      className="h-full"
    >
      <Link
        href={`/courses/${course.slug}`}
        className="group flex h-full flex-col overflow-hidden rounded-3xl border border-border/70 bg-card shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:border-indigo-200 hover:shadow-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        aria-label={`${course.title}: ${course.language}, level ${course.level}, ${course.format} course`}
      >
        <div className={cn("relative h-44 overflow-hidden bg-gradient-to-br", gradient)}>
          <div className="grid-dots absolute inset-0 opacity-25" aria-hidden />
          <span className="absolute -right-6 -top-6 h-32 w-32 rounded-full bg-white/20 blur-2xl" aria-hidden />

          <div className="absolute left-4 top-4 flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1 text-xs font-extrabold text-slate-900 shadow-sm">
              {course.level} · {levelNames[course.level]}
            </span>
          </div>
          <span className="absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-slate-950/40 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
            {course.format === "online" ? <Video className="h-3.5 w-3.5" aria-hidden /> : <MapPin className="h-3.5 w-3.5" aria-hidden />}
            {course.format === "online" ? "Online" : "In person"}
          </span>

          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5">
            <Flag code={course.flag} title={course.language} className="h-9 w-auto drop-shadow-lg" />
            <span className="rounded-2xl bg-white/15 px-3 py-1.5 text-xs font-bold text-white backdrop-blur">
              {course.language}
            </span>
          </div>
        </div>

        <div className="flex flex-1 flex-col p-6">
          <div className="flex items-center justify-between gap-3">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">{course.language}</span>
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-500">
              <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" aria-hidden />
              {course.rating.toFixed(1)}
            </span>
          </div>

          <h3 className="mt-2 text-lg font-extrabold leading-snug transition-colors group-hover:text-indigo-700">
            {course.title}
          </h3>
          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">{course.summary}</p>

          <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-xs font-semibold text-slate-500">
            <li className="inline-flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-indigo-500" aria-hidden />
              {course.durationWeeks} weeks
            </li>
            <li className="inline-flex items-center gap-1.5">
              <BookOpen className="h-3.5 w-3.5 text-indigo-500" aria-hidden />
              {course.lessons} lessons
            </li>
            <li className="inline-flex items-center gap-1.5">
              <Users className="h-3.5 w-3.5 text-indigo-500" aria-hidden />
              Max {course.groupSize}
            </li>
          </ul>

          <div className="mt-auto flex items-center justify-between gap-3 border-t border-border pt-5">
            <span>
              <span className="block text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                Group course from
              </span>
              <span className="text-xl font-extrabold text-slate-900">
                {course.currency}
                {course.price}
              </span>
            </span>
            <span className="inline-flex items-center gap-1.5 text-sm font-bold text-indigo-700">
              <Badge variant="soft" className="hidden sm:inline-flex">
                Next: {course.nextStart}
              </Badge>
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-50 transition-all group-hover:bg-indigo-600 group-hover:text-white">
                <ArrowRight className="h-4 w-4" aria-hidden />
              </span>
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
