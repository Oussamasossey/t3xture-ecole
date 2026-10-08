import type { Metadata } from "next";
import { courses } from "@/data/courses";
import { PageHeader } from "@/components/shared/section-heading";
import { CourseBrowser, type CourseFilters } from "@/components/courses/course-browser";
import { TrialCtaBand } from "@/components/shared/cta-band";

export const metadata: Metadata = {
  title: "Language Courses | Online & In Person",
  description:
    "Browse 12 language courses from A1 to C2. Filter by language, level, format and duration, then book a free trial lesson.",
  alternates: { canonical: "/courses" },
  openGraph: {
    title: "Lingua language courses, A1 to C2",
    description: "Filter 12 live courses by language, level, format and duration.",
    url: "/courses",
  },
};

interface CoursesPageProps {
  searchParams: { language?: string };
}

export default function CoursesPage({ searchParams }: CoursesPageProps) {
  const language = searchParams.language?.toLowerCase();
  const knownLanguage = courses.some((c) => c.languageSlug === language);
  const initialFilters: Partial<CourseFilters> | undefined = knownLanguage && language ? { language } : undefined;

  return (
    <>
      <PageHeader
        eyebrow="All courses"
        title={
          <>
            Find your course in <span className="text-gradient">under a minute</span>
          </>
        }
        description="Filter by language, CEFR level, format and duration. Every course is live, small-group and ends with a certificate."
      >
        <div className="mt-6 flex flex-wrap gap-2 text-xs font-semibold text-slate-600">
          <span className="rounded-full bg-white px-4 py-1.5 shadow-sm">12 live courses</span>
          <span className="rounded-full bg-white px-4 py-1.5 shadow-sm">Groups of 8 max</span>
          <span className="rounded-full bg-white px-4 py-1.5 shadow-sm">A1 → C2 pathways</span>
        </div>
      </PageHeader>

      <section className="container-x py-14" aria-label="Course catalogue">
        <CourseBrowser initialFilters={initialFilters} />
      </section>

      <TrialCtaBand
        title="Still deciding which course fits?"
        text="Book a free trial lesson and we will place your level honestly and recommend the right course, or build a group around you."
      />
    </>
  );
}
