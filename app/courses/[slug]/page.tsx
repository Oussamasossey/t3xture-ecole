import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Award,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Clock,
  Users,
  Video,
  MapPin,
  Star,
} from "lucide-react";
import { courses, getCourse, getPricingTiers, getRelatedCourses, levelNames } from "@/data/courses";
import { getTeacher } from "@/data/teachers";
import { site } from "@/data/site";
import { Flag } from "@/components/flag";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CourseCard } from "@/components/courses/course-card";
import { InstructorCard } from "@/components/teachers/instructor-card";
import { SectionHeading } from "@/components/shared/section-heading";
import { TrialCtaBand } from "@/components/shared/cta-band";
import { Reveal, RevealGroup } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

interface CourseDetailPageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return courses.map((course) => ({ slug: course.slug }));
}

export async function generateMetadata({ params }: CourseDetailPageProps): Promise<Metadata> {
  const course = getCourse(params.slug);
  if (!course) return { title: "Course not found" };

  const title = `${course.title} | ${course.language} ${course.level}`;
  const description = `${course.summary} ${course.durationWeeks} weeks, ${course.lessons} live lessons, ${course.format} · from ${course.currency}${course.price}.`;

  return {
    title,
    description,
    keywords: [
      course.language,
      `${course.language} course`,
      `${course.language} ${course.level}`,
      course.level,
      course.format === "online" ? "online language course" : "in-person language course",
      "CEFR",
      site.name,
    ],
    alternates: { canonical: `/courses/${course.slug}` },
    openGraph: {
      type: "article",
      title: `${title} | ${site.name}`,
      description,
      url: `/courses/${course.slug}`,
      siteName: `${site.name} | ${site.tagline}`,
      publishedTime: course.startDate,
      modifiedTime: course.updated,
      locale: "en_GB",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${site.name}`,
      description,
    },
  };
}

export default function CourseDetailPage({ params }: CourseDetailPageProps) {
  const course = getCourse(params.slug);
  if (!course) notFound();

  const teacher = getTeacher(course.instructorId);
  const tiers = getPricingTiers(course);
  const related = getRelatedCourses(course.slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: course.title,
    description: course.summary,
    url: `${site.url}/courses/${course.slug}`,
    inLanguage: course.language,
    educationalLevel: course.level,
    provider: { "@type": "EducationalOrganization", name: site.name, url: site.url },
    instructor: teacher ? { "@type": "Person", name: teacher.name, jobTitle: teacher.title } : undefined,
    offers: {
      "@type": "Offer",
      price: course.price,
      priceCurrency: "EUR",
      availability: "https://schema.org/InStock",
      url: `${site.url}/courses/${course.slug}`,
    },
    courseMode: course.format === "online" ? "online" : "onsite",
    timeRequired: `PT${course.hours}H`,
    aggregateRating:
      course.students > 0
        ? { "@type": "AggregateRating", ratingValue: course.rating, ratingCount: course.students }
        : undefined,
  };

  const facts = [
    { icon: Clock, label: "Duration", value: `${course.durationWeeks} weeks` },
    { icon: BookOpen, label: "Live lessons", value: `${course.lessons} × 90 min` },
    { icon: Users, label: "Group size", value: `Max ${course.groupSize}` },
    { icon: CalendarDays, label: "Next start", value: course.nextStart },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="relative overflow-hidden bg-soft-gradient pb-20 pt-32 sm:pt-36">
        <div className="blob -left-24 top-8 h-80 w-80 bg-blue-300/40" aria-hidden />
        <div className="blob right-0 -top-16 h-72 w-72 bg-purple-300/40" aria-hidden />
        <div className="grid-dots absolute inset-0 opacity-50" aria-hidden />

        <div className="container-x relative">
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-1.5 text-sm font-semibold text-muted-foreground">
              <li>
                <Link href="/" className="transition-colors hover:text-indigo-700">
                  Home
                </Link>
              </li>
              <li aria-hidden className="flex items-center gap-1.5">
                <ChevronRight className="h-4 w-4" />
                <Link href="/courses" className="transition-colors hover:text-indigo-700">
                  Courses
                </Link>
              </li>
              <li aria-hidden className="flex items-center gap-1.5">
                <ChevronRight className="h-4 w-4" />
                <span aria-current="page" className="text-slate-900">
                  {course.title}
                </span>
              </li>
            </ol>
          </nav>

          <div className="mt-8 grid items-start gap-10 lg:grid-cols-[1.4fr_1fr]">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <Badge>
                  {course.level} · {levelNames[course.level]}
                </Badge>
                <Badge variant="outline" className="gap-1.5">
                  <Flag code={course.flag} title={course.language} className="h-3 w-4" />
                  {course.language}
                </Badge>
                <Badge variant="soft" className="gap-1.5">
                  {course.format === "online" ? <Video className="h-3.5 w-3.5" /> : <MapPin className="h-3.5 w-3.5" />}
                  {course.format === "online" ? "Online" : "In person"}
                </Badge>
                {course.tags.slice(0, 2).map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>

              <h1 className="mt-5 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
                {course.title}
              </h1>
              <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">{course.summary}</p>

              <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm font-semibold text-slate-600">
                <span className="inline-flex items-center gap-1.5">
                  <Star className="h-4 w-4 fill-amber-400 text-amber-400" aria-hidden />
                  {course.rating.toFixed(1)} · {course.students} learners
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="h-4 w-4 text-indigo-500" aria-hidden />
                  {course.hours} hours of live teaching
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Award className="h-4 w-4 text-indigo-500" aria-hidden />
                  Certificate included
                </span>
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button asChild size="lg">
                  <Link href={`/contact?course=${course.slug}#trial`}>
                    Enroll now · {course.currency}
                    {course.price}
                    <ChevronRight aria-hidden />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="/contact#trial">Book a free trial first</Link>
                </Button>
                <p className="text-xs text-muted-foreground sm:ml-2">
                  Next group starts {course.nextStart}
                  <br />
                  Seats left: 3
                </p>
              </div>
            </div>

            <Reveal delay={0.15}>
              <div className="rounded-[2rem] border border-border/70 bg-card p-6 shadow-soft">
                <h2 className="text-sm font-bold uppercase tracking-widest text-indigo-600">At a glance</h2>
                <ul className="mt-5 divide-y divide-border">
                  {facts.map((fact) => (
                    <li key={fact.label} className="flex items-center gap-4 py-3.5">
                      <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
                        <fact.icon className="h-5 w-5" aria-hidden />
                      </span>
                      <span className="flex-1 text-sm text-muted-foreground">{fact.label}</span>
                      <span className="text-sm font-extrabold text-slate-900">{fact.value}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-5 rounded-2xl bg-gradient-to-br from-indigo-50 to-purple-50 p-4 text-sm">
                  <p className="font-bold text-slate-900">Course materials included</p>
                  <p className="mt-1 text-muted-foreground">
                    Digital workbook, audio library and progress tracker, no hidden fees.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section aria-labelledby="outcomes-heading" className="container-x py-16">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <h2 id="outcomes-heading" className="text-2xl font-extrabold sm:text-3xl">
              What you&apos;ll be able to do
            </h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">{course.description}</p>

            <ul className="mt-6 space-y-3">
              {course.highlights.map((highlight) => (
                <li key={highlight} className="flex items-start gap-3 text-sm font-semibold text-slate-700">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500" aria-hidden />
                  {highlight}
                </li>
              ))}
            </ul>
          </div>

          <RevealGroup className="grid gap-3 sm:grid-cols-2">
            {course.outcomes.map((outcome) => (
              <div
                key={outcome}
                className="flex h-full items-start gap-3 rounded-2xl border border-border/70 bg-card p-4 shadow-sm"
              >
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-[11px] font-extrabold text-indigo-700">
                  ✓
                </span>
                <span className="text-sm font-semibold leading-snug text-slate-700">{outcome}</span>
              </div>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section aria-labelledby="curriculum-heading" className="container-x pb-16">
        <SectionHeading
          eyebrow="Curriculum"
          title={<span id="curriculum-heading">Week by week, module by module</span>}
          description={`${course.lessons} live lessons across ${course.curriculum.length} modules, and every module ends with a speaking task.`}
          align="left"
          className="max-w-2xl"
        />

        <Reveal delay={0.1} className="mt-8">
          <Accordion defaultValue="m1" className="max-w-4xl">
            {course.curriculum.map((module, index) => (
              <AccordionItem key={module.id} value={module.id}>
                <AccordionTrigger>
                  <span className="flex items-center gap-4">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 text-sm font-extrabold text-white">
                      {index + 1}
                    </span>
                    <span>
                      <span className="block">{module.title}</span>
                      <span className="block text-xs font-medium text-muted-foreground">
                        {module.lessons.length} lessons · {module.summary}
                      </span>
                    </span>
                  </span>
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="grid gap-2 sm:grid-cols-2">
                    {module.lessons.map((lesson, i) => (
                      <li
                        key={lesson}
                        className="flex items-center gap-3 rounded-2xl bg-muted/70 px-4 py-3 text-sm font-medium text-slate-700"
                      >
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white text-[11px] font-bold text-indigo-600 shadow-sm">
                          {i + 1}
                        </span>
                        {lesson}
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </section>

      <section aria-labelledby="schedule-heading" className="container-x pb-16">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <h2 id="schedule-heading" className="text-2xl font-extrabold sm:text-3xl">
              Weekly schedule
            </h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Two live sessions per week plus an optional conversation lab. Classes run in{" "}
              <span className="font-semibold text-slate-700">Central European Time (CET)</span>; recordings stay
              available for 14 days.
            </p>
            <div className="mt-6 rounded-3xl border border-indigo-100 bg-indigo-50/70 p-5 text-sm">
              <p className="font-bold text-indigo-900">Cohort {course.nextStart}</p>
              <p className="mt-1 text-indigo-800/80">
                {course.lessons} lessons over {course.durationWeeks} weeks · starts {course.startDate}
              </p>
            </div>
          </div>

          <Reveal delay={0.1}>
            <div className="overflow-x-auto rounded-3xl border border-border/70 bg-card shadow-soft">
              <table className="w-full min-w-[520px] text-left text-sm">
                <caption className="sr-only">Weekly schedule for {course.title}</caption>
                <thead>
                  <tr className="border-b border-border bg-muted/60 text-xs font-bold uppercase tracking-wide text-muted-foreground">
                    <th scope="col" className="px-5 py-3.5">
                      Day
                    </th>
                    <th scope="col" className="px-5 py-3.5">
                      Time (CET)
                    </th>
                    <th scope="col" className="px-5 py-3.5">
                      Type
                    </th>
                    <th scope="col" className="px-5 py-3.5">
                      Where
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {course.schedule.map((slot) => (
                    <tr key={`${slot.day}-${slot.type}`} className="transition-colors hover:bg-indigo-50/40">
                      <td className="px-5 py-4 font-bold text-slate-900">{slot.day}</td>
                      <td className="px-5 py-4 text-slate-600">{slot.time}</td>
                      <td className="px-5 py-4">
                        <span
                          className={cn(
                            "inline-flex rounded-full px-2.5 py-1 text-[11px] font-bold",
                            slot.type === "Live class" && "bg-indigo-100 text-indigo-700",
                            slot.type === "Conversation lab" && "bg-emerald-100 text-emerald-700",
                            slot.type === "Self-paced" && "bg-slate-100 text-slate-600"
                          )}
                        >
                          {slot.type}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-slate-600">{slot.location}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>
      </section>

      <section aria-labelledby="pricing-heading" className="relative overflow-hidden bg-slate-950 py-20 text-white">
        <div className="blob -left-20 top-10 h-72 w-72 bg-indigo-600/40" aria-hidden />
        <div className="blob right-0 bottom-0 h-80 w-80 bg-purple-600/30" aria-hidden />
        <div className="container-x relative">
          <SectionHeading
            eyebrow="Pricing"
            title={<span id="pricing-heading" className="text-white">Choose how you want to learn</span>}
            description="Same curriculum, three ways to experience it. Materials, certificate and conversation lab included in every tier."
            className="[&_h2]:text-white [&_p]:text-slate-300 [&_span]:text-indigo-300"
          />

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {tiers.map((tier, index) => (
              <Reveal key={tier.id} delay={index * 0.08} className="h-full">
                <article
                  className={cn(
                    "flex h-full flex-col rounded-[2rem] border p-7 transition-transform duration-300 hover:-translate-y-1.5",
                    tier.highlighted
                      ? "border-transparent bg-gradient-to-b from-indigo-500 to-purple-600 text-white shadow-2xl lg:scale-[1.03]"
                      : "border-white/10 bg-white/5 backdrop-blur"
                  )}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className={cn("text-lg font-extrabold", tier.highlighted ? "text-white" : "text-white")}>
                        {tier.name}
                      </h3>
                      <p className={cn("text-sm", tier.highlighted ? "text-white/80" : "text-slate-400")}>
                        {tier.seats}
                      </p>
                    </div>
                    {tier.highlighted && (
                      <span className="rounded-full bg-white px-3 py-1 text-[11px] font-extrabold text-indigo-700">
                        Most popular
                      </span>
                    )}
                  </div>

                  <p className="mt-6 flex items-end gap-1">
                    <span className="text-4xl font-extrabold">{course.currency}{tier.price}</span>
                    <span className={cn("pb-1 text-sm", tier.highlighted ? "text-white/80" : "text-slate-400")}>
                      total
                    </span>
                  </p>
                  <p className={cn("mt-1 text-sm", tier.highlighted ? "text-white/80" : "text-slate-400")}>
                    {course.currency}
                    {tier.perSession} per lesson · {course.lessons} lessons
                  </p>

                  <ul className="mt-6 flex-1 space-y-3 text-sm">
                    {tier.perks.map((perk) => (
                      <li key={perk} className="flex items-start gap-2.5">
                        <CheckCircle2
                          className={cn("mt-0.5 h-4 w-4 shrink-0", tier.highlighted ? "text-emerald-300" : "text-emerald-400")}
                          aria-hidden
                        />
                        <span className={cn(tier.highlighted ? "text-white/90" : "text-slate-300")}>{perk}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    asChild
                    size="lg"
                    className={cn(
                      "mt-8 w-full",
                      tier.highlighted ? "bg-white text-indigo-700 hover:bg-white/90" : ""
                    )}
                    variant={tier.highlighted ? "default" : "outline"}
                  >
                    <Link href={`/contact?course=${course.slug}&plan=${tier.id}#trial`}>
                      Enroll in {tier.name.toLowerCase()}
                    </Link>
                  </Button>
                </article>
              </Reveal>
            ))}
          </div>

          <p className="mt-8 text-center text-sm text-slate-400">
            Payment in 3 instalments available · 14-day satisfaction guarantee · Prices include VAT
          </p>
        </div>
      </section>

      {teacher && (
        <section aria-labelledby="teacher-heading" className="container-x py-20">
          <div className="grid items-start gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-indigo-600">Your teacher</p>
              <h2 id="teacher-heading" className="mt-3 text-3xl font-extrabold sm:text-4xl">
                {teacher.name}
              </h2>
              <p className="mt-1 font-semibold text-indigo-700">{teacher.title}</p>
              <p className="mt-5 leading-relaxed text-muted-foreground">{teacher.bio}</p>

              <dl className="mt-6 grid grid-cols-2 gap-4 text-sm">
                <div className="rounded-2xl border border-border/70 bg-card p-4">
                  <dt className="text-muted-foreground">Experience</dt>
                  <dd className="text-lg font-extrabold">{teacher.experienceYears} years</dd>
                </div>
                <div className="rounded-2xl border border-border/70 bg-card p-4">
                  <dt className="text-muted-foreground">Lessons taught</dt>
                  <dd className="text-lg font-extrabold">{teacher.lessonsTaught.toLocaleString("en-US")}</dd>
                </div>
                <div className="rounded-2xl border border-border/70 bg-card p-4">
                  <dt className="text-muted-foreground">Education</dt>
                  <dd className="font-bold">{teacher.education}</dd>
                </div>
                <div className="rounded-2xl border border-border/70 bg-card p-4">
                  <dt className="text-muted-foreground">Certifications</dt>
                  <dd className="font-bold">{teacher.certifications.join(" · ")}</dd>
                </div>
              </dl>

              <Button asChild variant="outline" className="mt-6">
                <Link href="/teachers">Meet all teachers</Link>
              </Button>
            </div>

            <div className="lg:max-w-md">
              <InstructorCard teacher={teacher} />
            </div>
          </div>
        </section>
      )}

      <section aria-labelledby="related-heading" className="container-x pb-8">
        <SectionHeading
          eyebrow="Keep exploring"
          title={<span id="related-heading">Related courses</span>}
          description="Other courses at your level or in the same format."
          align="left"
        />
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((item, index) => (
            <CourseCard key={item.slug} course={item} index={index} />
          ))}
        </div>
      </section>

      <TrialCtaBand
        title={`Try ${course.title} before you commit`}
        text="One free 45-minute lesson with your future teacher, an honest level assessment and a clear plan. No card required."
      />
    </>
  );
}
