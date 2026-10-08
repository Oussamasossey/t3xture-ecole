import { ArrowRight, CheckCircle2 } from "lucide-react";
import { levelPath } from "@/data/site";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/shared/section-heading";

export function LearningPath() {
  return (
    <section aria-labelledby="path-heading" className="relative overflow-hidden bg-slate-950 py-24 text-white">
      <div className="blob -left-24 top-0 h-80 w-80 bg-indigo-600/40" aria-hidden />
      <div className="blob right-0 bottom-0 h-96 w-96 bg-purple-600/30" aria-hidden />
      <div className="grid-dots absolute inset-0 opacity-20" aria-hidden />

      <div className="container-x relative">
        <SectionHeading
          eyebrow="Your learning path"
          title={
            <span id="path-heading" className="text-white">
              From <span className="text-gradient">A1 to C2</span>, one clear step at a time
            </span>
          }
          description="Every Lingua course maps to the Common European Framework of Reference. You always know where you are, what comes next and how long it takes."
          className="[&_h2]:text-white [&_p]:text-slate-300 [&_span]:text-indigo-300"
        />

        <ol className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {levelPath.map((level, index) => (
            <li key={level.level}>
              <Reveal delay={index * 0.06}>
                <article className="group relative h-full rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur transition-all duration-300 hover:-translate-y-1.5 hover:border-indigo-400/50 hover:bg-white/10">
                  <div className="flex items-start justify-between gap-3">
                    <span className="text-4xl font-extrabold tracking-tight text-indigo-300">{level.level}</span>
                    <Badge variant="glass">{level.name}</Badge>
                  </div>

                  <p className="mt-4 text-sm font-semibold text-white">{level.summary}</p>
                  <p className="mt-3 flex items-start gap-2 text-sm leading-relaxed text-slate-300">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" aria-hidden />
                    {level.outcome}
                  </p>

                  <span
                    className="absolute right-5 top-1/2 hidden h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-transform group-hover:translate-x-1 lg:flex"
                    aria-hidden
                  >
                    <ArrowRight className="h-4 w-4" />
                  </span>
                  <span className="sr-only">Step {index + 1} of 6</span>
                </article>
              </Reveal>
            </li>
          ))}
        </ol>

        <Reveal delay={0.2} className="mt-10 text-center">
          <p className="text-sm text-slate-300">
            Not sure where you start? The free trial includes a placement check, and most learners are surprised by
            how far along they already are.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
