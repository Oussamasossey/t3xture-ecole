import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";

export function TrialCtaBand({
  title = "Your first lesson is on us",
  text = "Book a free 45-minute trial lesson, get an honest level assessment and a personalised learning plan. No card, no commitment.",
}: {
  title?: string;
  text?: string;
}) {
  return (
    <section className="container-x pb-24">
      <Reveal>
        <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 px-6 py-14 shadow-2xl sm:px-12 sm:py-16">
          <div className="blob -right-10 -top-16 h-64 w-64 bg-white/20" aria-hidden />
          <div className="blob -bottom-24 left-10 h-72 w-72 bg-sky-300/30" aria-hidden />
          <div className="grid-dots absolute inset-0 opacity-20" aria-hidden />

          <div className="relative flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
            <div className="max-w-2xl">
              <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur">
                <Sparkles className="h-3.5 w-3.5" /> Free trial lesson
              </span>
              <h2 className="text-3xl font-extrabold leading-tight text-white sm:text-4xl">{title}</h2>
              <p className="mt-4 text-base leading-relaxed text-white/85 sm:text-lg">{text}</p>
            </div>

            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row lg:w-auto">
              <Button asChild size="lg" className="bg-white text-indigo-700 shadow-lg hover:bg-white/90">
                <Link href="/contact#trial">
                  Book free trial
                  <ArrowRight />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/40 bg-transparent text-white hover:border-white hover:bg-white/10 hover:text-white"
              >
                <Link href="/courses">Browse courses</Link>
              </Button>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
