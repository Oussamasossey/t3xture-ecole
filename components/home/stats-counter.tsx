"use client";

import { BookOpen, Globe2, HeartHandshake, Users } from "lucide-react";
import { stats } from "@/data/site";
import { AnimatedCounter } from "@/components/motion/animated-counter";
import { Reveal } from "@/components/motion/reveal";

const icons = [Users, Globe2, BookOpen, HeartHandshake];

export function StatsCounter() {
  return (
    <section aria-labelledby="stats-heading" className="container-x pb-24">
      <h2 id="stats-heading" className="sr-only">
        Lingua in numbers
      </h2>
      <Reveal>
        <div className="relative overflow-hidden rounded-[2rem] border border-border/70 bg-card p-8 shadow-soft sm:p-12">
          <div className="blob -right-16 -top-16 h-56 w-56 bg-indigo-200/50" aria-hidden />
          <div className="blob -bottom-20 left-1/4 h-56 w-56 bg-purple-200/40" aria-hidden />

          <dl className="relative grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, i) => {
              const Icon = icons[i];
              return (
                <div key={stat.label} className="text-center lg:border-r lg:border-border/70 lg:last:border-r-0">
                  <span className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
                    <Icon className="h-6 w-6" aria-hidden />
                  </span>
                  <dt className="order-2 text-sm font-semibold text-muted-foreground">{stat.label}</dt>
                  <dd className="order-1 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
                    <AnimatedCounter to={stat.value} suffix={stat.suffix} decimals={stat.decimals} />
                  </dd>
                </div>
              );
            })}
          </dl>
        </div>
      </Reveal>
    </section>
  );
}
