"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SearchX, SlidersHorizontal, X } from "lucide-react";
import type { Course, CourseFormat, Level } from "@/types";
import { courses as allCourses, levelOrder } from "@/data/courses";
import { languages } from "@/data/site";
import { CourseCard } from "@/components/courses/course-card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

export type CourseFilters = {
  language: string;
  level: string;
  format: string;
  duration: string;
};

const emptyFilters: CourseFilters = { language: "all", level: "all", format: "all", duration: "all" };

const formatLabels: Record<string, string> = {
  all: "All formats",
  online: "Online",
  "in-person": "In person",
};

const durationOptions = [
  { value: "all", label: "Any duration" },
  { value: "short", label: "Up to 6 weeks" },
  { value: "standard", label: "7–8 weeks" },
  { value: "extended", label: "9 weeks & more" },
];

const durationMatch = (weeks: number, filter: string) => {
  if (filter === "short") return weeks <= 6;
  if (filter === "standard") return weeks >= 7 && weeks <= 8;
  if (filter === "extended") return weeks >= 9;
  return true;
};

export function CourseBrowser({ initialFilters }: { initialFilters?: Partial<CourseFilters> }) {
  const [filters, setFilters] = React.useState<CourseFilters>({ ...emptyFilters, ...initialFilters });

  const update = <K extends keyof CourseFilters>(key: K, value: CourseFilters[K]) =>
    setFilters((current) => ({ ...current, [key]: value }));

  const filtered = React.useMemo(
    () =>
      allCourses.filter((course) => {
        if (filters.language !== "all" && course.languageSlug !== filters.language) return false;
        if (filters.level !== "all" && course.level !== filters.level) return false;
        if (filters.format !== "all" && course.format !== (filters.format as CourseFormat)) return false;
        if (!durationMatch(course.durationWeeks, filters.duration)) return false;
        return true;
      }),
    [filters]
  );

  const activeCount = Object.values(filters).filter((v) => v !== "all").length;
  const reset = () => setFilters(emptyFilters);

  return (
    <div className="space-y-8">
      <div className="rounded-3xl border border-border/70 bg-card p-5 shadow-soft sm:p-6">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <h2 className="inline-flex items-center gap-2 text-base font-extrabold">
            <SlidersHorizontal className="h-5 w-5 text-indigo-600" aria-hidden />
            Filter courses
          </h2>
          <div className="flex items-center gap-3">
            <p className="text-sm text-muted-foreground" aria-live="polite">
              <span className="font-bold text-slate-900">{filtered.length}</span> of {allCourses.length} courses
            </p>
            {activeCount > 0 && (
              <Button variant="ghost" size="sm" onClick={reset}>
                <X className="h-4 w-4" aria-hidden />
                Clear ({activeCount})
              </Button>
            )}
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          <div className="space-y-2">
            <label htmlFor="filter-language" className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
              Language
            </label>
            <Select value={filters.language} onValueChange={(v) => update("language", v)}>
              <SelectTrigger id="filter-language">
                <SelectValue placeholder="All languages" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All languages</SelectItem>
                {languages.map((language) => (
                  <SelectItem key={language.name} value={language.name.toLowerCase()}>
                    {language.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <fieldset className="space-y-2">
            <legend className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Level (CEFR)</legend>
            <div className="flex flex-wrap gap-2">
              <FilterChip active={filters.level === "all"} onClick={() => update("level", "all")}>
                All
              </FilterChip>
              {levelOrder.map((level) => (
                <FilterChip
                  key={level}
                  active={filters.level === level}
                  onClick={() => update("level", level as Level)}
                >
                  {level}
                </FilterChip>
              ))}
            </div>
          </fieldset>

          <fieldset className="space-y-2">
            <legend className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Format</legend>
            <div className="flex flex-wrap gap-2">
              {Object.entries(formatLabels).map(([value, label]) => (
                <FilterChip
                  key={value}
                  active={filters.format === value}
                  onClick={() => update("format", value)}
                >
                  {label}
                </FilterChip>
              ))}
            </div>
          </fieldset>

          <div className="space-y-2">
            <label htmlFor="filter-duration" className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
              Duration
            </label>
            <Select value={filters.duration} onValueChange={(v) => update("duration", v)}>
              <SelectTrigger id="filter-duration">
                <SelectValue placeholder="Any duration" />
              </SelectTrigger>
              <SelectContent>
                {durationOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {filtered.length > 0 ? (
        <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((course: Course, index) => (
              <CourseCard key={course.slug} course={course} index={index} />
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center rounded-3xl border border-dashed border-border bg-card/60 px-6 py-16 text-center"
        >
          <SearchX className="h-12 w-12 text-indigo-300" aria-hidden />
          <h3 className="mt-4 text-xl font-extrabold">No courses match those filters</h3>
          <p className="mt-2 max-w-md text-sm text-muted-foreground">
            Try removing a filter, or tell us what you are looking for and we will build a custom group for you.
          </p>
          <Button className="mt-6" onClick={reset}>
            Clear all filters
          </Button>
        </motion.div>
      )}
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "rounded-full border px-4 py-2 text-sm font-bold transition-all duration-200",
        active
          ? "border-transparent bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-card"
          : "border-border bg-card text-slate-600 hover:border-indigo-300 hover:text-indigo-700"
      )}
    >
      {children}
    </button>
  );
}
