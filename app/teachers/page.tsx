import type { Metadata } from "next";
import { teachers } from "@/data/teachers";
import { PageHeader } from "@/components/shared/section-heading";
import { InstructorCard } from "@/components/teachers/instructor-card";
import { TrialCtaBand } from "@/components/shared/cta-band";
import { Reveal } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: "Meet Our Teachers",
  description:
    "Eight specialist teachers of English, Spanish, French, German, Italian, Portuguese, Dutch, Russian, Japanese, Korean, Chinese and Arabic.",
  alternates: { canonical: "/teachers" },
  openGraph: {
    title: "Meet the Lingua teaching team",
    description: "Native and near-native specialists with CELTA, DELF, Goethe, JLPT and HSK credentials.",
    url: "/teachers",
  },
};

export default function TeachersPage() {
  return (
    <>
      <PageHeader
        eyebrow="Our teachers"
        title={
          <>
            Taught by people who <span className="text-gradient">love to teach</span>
          </>
        }
        description="Every Lingua teacher is a certified specialist in the language they teach. Hover a card to read the full bio."
      >
        <div className="mt-6 flex flex-wrap gap-2 text-xs font-semibold text-slate-600">
          <span className="rounded-full bg-white px-4 py-1.5 shadow-sm">8 specialist teachers</span>
          <span className="rounded-full bg-white px-4 py-1.5 shadow-sm">100% certified</span>
          <span className="rounded-full bg-white px-4 py-1.5 shadow-sm">4.8 average rating</span>
        </div>
      </PageHeader>

      <section aria-label="Teacher directory" className="container-x py-14">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {teachers.map((teacher, index) => (
            <InstructorCard key={teacher.id} teacher={teacher} index={index} />
          ))}
        </div>

        <Reveal delay={0.1} className="mt-12">
          <div className="rounded-[2rem] border border-border/70 bg-soft-gradient p-8 text-center sm:p-10">
            <h2 className="text-2xl font-extrabold sm:text-3xl">Want to join the team?</h2>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
              We hire certified, conversation-first teachers in all twelve languages, part-time and full-time,
              on campus and online.
            </p>
            <a
              href="mailto:jobs@lingua.example.com"
              className="mt-5 inline-block rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 px-7 py-3 text-sm font-bold text-white shadow-card transition hover:brightness-110"
            >
              jobs@lingua.example.com
            </a>
          </div>
        </Reveal>
      </section>

      <TrialCtaBand
        title="Meet your teacher for free"
        text="Your trial lesson is taught by the teacher who would actually run your course, not a salesperson."
      />
    </>
  );
}
