import { CheckCheck, MessagesSquare, Mic, Route, Sparkles } from "lucide-react";
import { methodSteps } from "@/data/site";
import { Reveal, RevealGroup } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/shared/section-heading";

const guarantees = [
  "70% of lesson time spent speaking",
  "Live corrections without breaking your flow",
  "Homework you can finish in 20 minutes",
  "Recorded feedback you can rewatch",
  "Monthly progress report for students & parents",
  "Free reschedule when life happens",
];

export function TeachingMethod() {
  return (
    <section aria-labelledby="method-heading" className="container-x pb-24">
      <SectionHeading
        eyebrow="How we teach"
        title={
          <span id="method-heading">
            A method built for <span className="text-gradient">people who want to talk</span>
          </span>
        }
        description="Four steps, zero busywork. We diagnose, plan, speak and measure, then repeat until the language sticks."
      />

      <RevealGroup className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {methodSteps.map((step) => (
          <article
            key={step.step}
            className="group relative h-full overflow-hidden rounded-3xl border border-border/70 bg-card p-6 shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:border-indigo-200 hover:shadow-card"
          >
            <span className="absolute right-4 top-3 text-6xl font-extrabold text-indigo-50 transition-transform duration-300 group-hover:scale-110 group-hover:text-indigo-100" aria-hidden>
              {step.step}
            </span>
            <span className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-500 text-white shadow-card">
              {step.step === "01" ? <Sparkles className="h-5 w-5" aria-hidden /> : null}
              {step.step === "02" ? <Route className="h-5 w-5" aria-hidden /> : null}
              {step.step === "03" ? <MessagesSquare className="h-5 w-5" aria-hidden /> : null}
              {step.step === "04" ? <Mic className="h-5 w-5" aria-hidden /> : null}
            </span>
            <h3 className="relative mt-5 text-lg font-extrabold">{step.title}</h3>
            <p className="relative mt-2 text-sm leading-relaxed text-muted-foreground">{step.text}</p>
          </article>
        ))}
      </RevealGroup>

      <Reveal delay={0.1} className="mt-8">
        <div className="grid items-center gap-8 overflow-hidden rounded-[2rem] border border-border/70 bg-soft-gradient p-8 sm:p-10 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-xs font-bold text-indigo-700 shadow-sm">
              <CheckCheck className="h-3.5 w-3.5" aria-hidden />
              In every single lesson
            </span>
            <h3 className="mt-4 text-2xl font-extrabold leading-snug sm:text-3xl">
              No worksheets. No silent classrooms.
              <span className="block text-indigo-600">Just structured, joyful speaking time.</span>
            </h3>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
              Each session follows the same rhythm: a warm-up that retrieves last week&apos;s language, a task
              that forces new language, and a five-minute wrap-up where you name what you improved.
            </p>
          </div>

          <ul className="grid gap-3">
            {guarantees.map((guarantee) => (
              <li
                key={guarantee}
                className="flex items-start gap-3 rounded-2xl border border-border/70 bg-card px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm"
              >
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                  <CheckCheck className="h-3 w-3" aria-hidden />
                </span>
                {guarantee}
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </section>
  );
}
