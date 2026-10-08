"use client";

import * as React from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
import { testimonials } from "@/data/testimonials";
import { RatingStars } from "@/components/shared/rating-stars";
import { SectionHeading } from "@/components/shared/section-heading";
import { cn } from "@/lib/utils";

export function TestimonialCarousel() {
  const [index, setIndex] = React.useState(0);
  const [paused, setPaused] = React.useState(false);
  const reduce = useReducedMotion();
  const active = testimonials[index];

  const go = React.useCallback(
    (direction: 1 | -1) =>
      setIndex((current) => (current + direction + testimonials.length) % testimonials.length),
    []
  );

  React.useEffect(() => {
    if (paused) return;
    const timer = window.setInterval(() => go(1), 7000);
    return () => window.clearInterval(timer);
  }, [paused, go]);

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  return (
    <section
      aria-labelledby="testimonials-heading"
      className="relative overflow-hidden bg-soft-gradient py-24"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="blob -left-24 top-10 h-72 w-72 bg-blue-300/40" aria-hidden />
      <div className="blob -right-10 bottom-0 h-72 w-72 bg-purple-300/40" aria-hidden />
      <div className="grid-dots absolute inset-0 opacity-50" aria-hidden />

      <div className="container-x relative">
        <SectionHeading
          eyebrow="Student stories"
          title={
            <span id="testimonials-heading">
              Loved by <span className="text-gradient">12,500+ learners</span>
            </span>
          }
          description="Real reviews from people who started exactly where you are now."
        />

        <div className="relative mx-auto mt-12 max-w-4xl">
          <div className="flex items-center justify-between gap-4">
            <div className="flex gap-2" role="tablist" aria-label="Choose a testimonial">
              {testimonials.map((item, i) => (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={i === index}
                  aria-label={`Testimonial ${i + 1} from ${item.name}`}
                  onClick={() => setIndex(i)}
                  className={cn(
                    "h-2.5 rounded-full transition-all duration-300",
                    i === index ? "w-8 bg-indigo-600" : "w-2.5 bg-slate-300 hover:bg-indigo-300"
                  )}
                />
              ))}
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label="Previous testimonial"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card transition-colors hover:border-indigo-300 hover:text-indigo-700"
              >
                <ArrowLeft className="h-5 w-5" aria-hidden />
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                aria-label="Next testimonial"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card transition-colors hover:border-indigo-300 hover:text-indigo-700"
              >
                <ArrowRight className="h-5 w-5" aria-hidden />
              </button>
            </div>
          </div>

          <div className="relative mt-6 min-h-[340px] sm:min-h-[300px]">
            <AnimatePresence mode="wait" initial={false}>
              <motion.figure
                key={active.id}
                initial={{ opacity: 0, x: reduce ? 0 : 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: reduce ? 0 : -40 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="rounded-[2rem] border border-border/70 bg-card p-8 shadow-soft sm:p-10"
              >
                <Quote className="h-9 w-9 text-indigo-200" aria-hidden />
                <blockquote className="mt-4 text-lg font-medium leading-relaxed text-slate-700 sm:text-xl">
                  {active.quote}
                </blockquote>
                <figcaption className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6">
                  <div className="flex items-center gap-4">
                    <span
                      className={cn(
                        "flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br text-sm font-extrabold text-white",
                        active.accent
                      )}
                      aria-hidden
                    >
                      {active.initials}
                    </span>
                    <span>
                      <span className="block font-bold text-slate-900">{active.name}</span>
                      <span className="block text-sm text-muted-foreground">
                        {active.role} · {active.course}
                      </span>
                    </span>
                  </div>
                  <RatingStars rating={active.rating} />
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
