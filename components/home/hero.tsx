"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Award, PlayCircle, Sparkles, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Flag } from "@/components/flag";
import { RatingStars } from "@/components/shared/rating-stars";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const } },
};

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-soft-gradient pb-24 pt-36 sm:pt-44">
      <div className="blob -left-32 top-10 h-96 w-96 bg-blue-300/50" aria-hidden />
      <div className="blob right-0 -top-20 h-80 w-80 bg-purple-300/50" aria-hidden />
      <div className="blob bottom-0 left-1/3 h-72 w-72 bg-pink-200/40" aria-hidden />
      <div className="grid-dots absolute inset-0 opacity-60" aria-hidden />

      <div className="container-x relative grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.span
            variants={item}
            className="inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-white/80 px-4 py-2 text-xs font-bold text-indigo-700 shadow-sm backdrop-blur"
          >
            <Sparkles className="h-3.5 w-3.5" aria-hidden />
            New: free AI-assisted placement test
          </motion.span>

          <motion.h1
            variants={item}
            className="mt-6 text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl"
          >
            Speak a new language
            <br />
            with <span className="text-gradient">real confidence.</span>
          </motion.h1>

          <motion.p variants={item} className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
            Lingua is a modern language school for busy people. Live classes in 12 languages, groups of just 8,
            and a method built around speaking from day one, online or on campus in Brussels.
          </motion.p>

          <motion.div variants={item} className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/contact#trial">
                Start your free trial
                <ArrowRight aria-hidden />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/courses">
                <PlayCircle aria-hidden />
                Explore 12 courses
              </Link>
            </Button>
          </motion.div>

          <motion.div variants={item} className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
            <div className="flex items-center gap-3">
              <div className="flex -space-x-3" aria-hidden>
                {["EM", "DO", "LV", "HS"].map((initials, i) => (
                  <span
                    key={initials}
                    className={`flex h-10 w-10 items-center justify-center rounded-full border-2 border-white text-xs font-extrabold text-white ring-1 ring-white/40 ${
                      ["from-rose-400 to-orange-400", "from-blue-400 to-indigo-500", "from-violet-400 to-purple-500", "from-emerald-400 to-teal-500"][i]
                    }`}
                  >
                    {initials}
                  </span>
                ))}
              </div>
              <div>
                <RatingStars rating={5} />
                <p className="text-xs font-semibold text-muted-foreground">
                  4.9 average from 1,240 learner reviews
                </p>
              </div>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-xs font-bold text-slate-700 shadow-sm">
              <Award className="h-4 w-4 text-indigo-600" aria-hidden />
              CELTA · DELF · Goethe · JLPT exam prep
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto w-full max-w-md lg:max-w-none"
        >
          <div className="rounded-[2rem] border border-white/70 bg-white/85 p-6 shadow-2xl backdrop-blur">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-widest text-indigo-600">Today&apos;s lesson</span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-[11px] font-bold text-emerald-700">
                <span className="h-2 w-2 animate-pulse-soft rounded-full bg-emerald-500" aria-hidden />
                Live in 12 min
              </span>
            </div>

            <div className="mt-5 flex items-center gap-4 rounded-2xl bg-gradient-to-br from-indigo-50 to-purple-50 p-4">
              <Flag code="ES" title="Spanish" className="h-9 w-auto shadow" />
              <div className="flex-1">
                <p className="text-sm font-extrabold text-slate-900">Everyday Spanish · A2</p>
                <p className="text-xs text-muted-foreground">Mateo Rodríguez · Room 3</p>
              </div>
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-indigo-600 shadow-sm">
                <TrendingUp className="h-5 w-5" aria-hidden />
              </div>
            </div>

            <div className="mt-6">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
                <span>Course progress</span>
                <span className="text-indigo-600">68%</span>
              </div>
              <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-slate-100">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "68%" }}
                  transition={{ duration: 1.4, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="h-full rounded-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"
                />
              </div>
            </div>

            <ul className="mt-6 grid grid-cols-3 gap-3 text-center">
              {[
                { label: "Streak", value: "14 d" },
                { label: "New words", value: "326" },
                { label: "Speaking", value: "72%" },
              ].map((stat) => (
                <li key={stat.label} className="rounded-2xl border border-border/70 bg-card py-3">
                  <span className="block text-lg font-extrabold text-slate-900">{stat.value}</span>
                  <span className="text-[10px] font-bold uppercase tracking-wide text-muted-foreground">
                    {stat.label}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="animate-float absolute -left-4 top-16 hidden rounded-2xl border border-border/70 bg-card px-4 py-3 shadow-soft sm:block lg:-left-12">
            <div className="flex items-center gap-3">
              <Flag code="FR" title="French" className="h-5 w-auto" />
              <div>
                <p className="text-xs font-extrabold text-slate-900">French B1 · 8 weeks</p>
                <p className="text-[11px] text-muted-foreground">Starts 14 Dec</p>
              </div>
            </div>
          </div>

          <div
            className="animate-float-slow absolute -right-2 bottom-10 hidden rounded-2xl border border-border/70 bg-card px-4 py-3 shadow-soft sm:block lg:-right-8"
            style={{ animationDelay: "1.2s" }}
          >
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-100 text-amber-600">
                <Award className="h-5 w-5" aria-hidden />
              </span>
              <div>
                <p className="text-xs font-extrabold text-slate-900">A1 certificate earned</p>
                <p className="text-[11px] text-muted-foreground">Emily Carter · Level up!</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
