import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { languages } from "@/data/site";
import { Flag } from "@/components/flag";
import { Reveal, RevealGroup } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/shared/section-heading";

export function LanguagesGrid() {
  return (
    <section aria-labelledby="languages-heading" className="container-x pb-24">
      <SectionHeading
        eyebrow="Languages we teach"
        title={
          <span id="languages-heading">
            Twelve languages, <span className="text-gradient">one method</span>
          </span>
        }
        description="Every course is conversation-first, CEFR-aligned and taught by a specialist teacher. Pick your flag and start talking."
      />

      <RevealGroup className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {languages.map((language) => (
          <Link
            key={language.name}
            href={`/courses?language=${language.name.toLowerCase()}`}
            className="group relative flex flex-col items-start gap-3 overflow-hidden rounded-3xl border border-border/70 bg-card p-5 shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:border-indigo-200 hover:shadow-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <span className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-indigo-100/70 transition-transform duration-500 group-hover:scale-[2.6]" aria-hidden />
            <span className="relative flex h-12 w-16 items-center justify-center rounded-2xl bg-white p-1 shadow-sm ring-1 ring-slate-200/70">
              <Flag code={language.flag} title={language.name} className="h-full w-auto" />
            </span>
            <span className="relative">
              <span className="block font-extrabold text-slate-900 transition-colors group-hover:text-indigo-700">
                {language.name}
              </span>
              <span className="block text-xs text-muted-foreground">{language.native}</span>
            </span>
            <span className="relative mt-auto flex w-full items-center justify-between gap-2 pt-1 text-[11px] font-semibold text-slate-500">
              <span className="line-clamp-1">{language.blurb}</span>
              <ArrowRight className="h-4 w-4 shrink-0 text-indigo-500 transition-transform group-hover:translate-x-1" aria-hidden />
            </span>
          </Link>
        ))}
      </RevealGroup>

      <Reveal delay={0.15} className="mt-8 text-center">
        <p className="text-sm font-semibold text-muted-foreground">
          {`Can't find your language?`}{" "}
          <Link href="/contact" className="text-indigo-700 underline-offset-4 hover:underline">
            Tell us and we build groups on demand.
          </Link>
        </p>
      </Reveal>
    </section>
  );
}
