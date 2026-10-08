import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Compass, HeartHandshake, ShieldCheck, Sparkles } from "lucide-react";
import { milestones, values, site } from "@/data/site";
import { teachers } from "@/data/teachers";
import { PageHeader, SectionHeading } from "@/components/shared/section-heading";
import { StatsCounter } from "@/components/home/stats-counter";
import { InstructorCard } from "@/components/teachers/instructor-card";
import { TrialCtaBand } from "@/components/shared/cta-band";
import { Reveal, RevealGroup } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "About Lingua | Why Conversation-First Works",
  description:
    "Founded in Brussels in 2009, Lingua is a small language school with a big obsession: getting people speaking from lesson one.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Lingua Language School",
    description: "Our story, our values and the method behind 12,500 confident speakers.",
    url: "/about",
  },
};

const valueIcons = [HeartHandshake, ShieldCheck, Sparkles, Compass];

export default function AboutPage() {
  const featuredTeachers = teachers.slice(0, 3);

  return (
    <>
      <PageHeader
        eyebrow="About us"
        title={
          <>
            A small school with a <span className="text-gradient">loud classroom</span>
          </>
        }
        description="Founded in Brussels in 2009, Lingua exists for one reason: to get people speaking a new language sooner, and enjoying it."
      />

      <section aria-labelledby="story-heading" className="container-x grid items-center gap-12 py-16 lg:grid-cols-2">
        <Reveal>
          <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 shadow-2xl">
            <div className="grid-dots absolute inset-0 opacity-25" aria-hidden />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-8 text-center text-white">
              <span className="text-7xl font-extrabold drop-shadow-lg">2009</span>
              <p className="max-w-xs text-sm font-semibold text-white/85">
                Three teachers, one classroom and a stubborn belief that speaking beats memorising.
              </p>
              <span className="rounded-full bg-white/15 px-4 py-2 text-xs font-bold backdrop-blur">
                Rue du Progrès 42 · Brussels
              </span>
            </div>
            <span className="animate-float absolute left-6 top-6 rounded-2xl bg-white/90 px-4 py-3 text-left shadow-lg">
              <span className="block text-xs font-bold uppercase tracking-wide text-indigo-600">Group size</span>
              <span className="block text-lg font-extrabold text-slate-900">Max 8 learners</span>
            </span>
            <span
              className="animate-float-slow absolute bottom-6 right-6 rounded-2xl bg-slate-950/85 px-4 py-3 text-left shadow-lg backdrop-blur"
              style={{ animationDelay: "0.8s" }}
            >
              <span className="block text-xs font-bold uppercase tracking-wide text-indigo-300">Speaking time</span>
              <span className="block text-lg font-extrabold text-white">70% of every lesson</span>
            </span>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-indigo-600">Our story</p>
          <h2 id="story-heading" className="mt-3 text-3xl font-extrabold leading-tight sm:text-4xl">
            We got tired of students who could pass an exam but freeze in a café.
          </h2>
          <div className="mt-5 space-y-4 leading-relaxed text-muted-foreground">
            <p>
              So we rebuilt the lesson around one measurable thing: how many minutes each learner actually speaks.
              Everything else (grammar, vocabulary, homework) exists to support that number.
            </p>
            <p>
              Seventeen years later, {site.name} teaches twelve languages to 12,500 learners, from absolute
              beginners to C2 candidates. We still cap groups at eight, still record speaking feedback every
              week, and still let you reschedule when life gets in the way.
            </p>
            <p className="font-semibold text-slate-700">
              Not bad for a school that started with a whiteboard and a coffee machine.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild>
              <Link href="/courses">
                See our courses
                <ArrowRight aria-hidden />
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/teachers">Meet the team</Link>
            </Button>
          </div>
        </Reveal>
      </section>

      <section aria-labelledby="values-heading" className="container-x pb-16">
        <SectionHeading
          eyebrow="What we stand for"
          title={<span id="values-heading">Four rules we never break</span>}
          description="They are written on the classroom wall and in every teacher's contract."
        />
        <RevealGroup className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((value, index) => {
            const Icon = valueIcons[index];
            return (
              <article
                key={value.title}
                className="h-full rounded-3xl border border-border/70 bg-card p-6 shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:border-indigo-200 hover:shadow-card"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-500 text-white shadow-card">
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <h3 className="mt-5 text-lg font-extrabold">{value.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{value.text}</p>
              </article>
            );
          })}
        </RevealGroup>
      </section>

      <section aria-labelledby="timeline-heading" className="relative overflow-hidden bg-slate-950 py-20 text-white">
        <div className="blob -right-16 top-0 h-72 w-72 bg-purple-600/30" aria-hidden />
        <div className="blob -left-16 bottom-0 h-72 w-72 bg-indigo-600/40" aria-hidden />
        <div className="container-x relative">
          <SectionHeading
            eyebrow="Milestones"
            title={<span id="timeline-heading" className="text-white">Seventeen years, five big moments</span>}
            description="From a single classroom to twelve languages, without ever growing our groups."
            className="[&_h2]:text-white [&_p]:text-slate-300 [&_span]:text-indigo-300"
          />

          <ol className="mt-12 space-y-4">
            {milestones.map((milestone, index) => (
              <li key={milestone.year}>
                <Reveal delay={index * 0.05}>
                  <article className="grid items-start gap-4 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur transition-colors hover:border-indigo-400/40 sm:grid-cols-[120px_1fr] sm:gap-8">
                    <span className="text-3xl font-extrabold text-indigo-300">{milestone.year}</span>
                    <div>
                      <h3 className="text-lg font-extrabold">{milestone.title}</h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-slate-300">{milestone.text}</p>
                    </div>
                  </article>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <StatsCounter />

      <section aria-labelledby="team-heading" className="container-x pb-8">
        <SectionHeading
          eyebrow="The people"
          title={<span id="team-heading">Some of the teachers you&apos;ll meet</span>}
          description="Hover a card to read the full story behind the lesson."
          align="left"
        />
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredTeachers.map((teacher, index) => (
            <InstructorCard key={teacher.id} teacher={teacher} index={index} />
          ))}
        </div>
        <Reveal delay={0.1} className="mt-8">
          <Button asChild variant="outline">
            <Link href="/teachers">
              View all teachers
              <ArrowRight aria-hidden />
            </Link>
          </Button>
        </Reveal>
      </section>

      <TrialCtaBand />
    </>
  );
}
