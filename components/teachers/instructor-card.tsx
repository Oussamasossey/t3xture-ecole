"use client";

import * as React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Award, BookOpen, Clock, Star } from "lucide-react";
import type { Teacher } from "@/types";
import { Flag } from "@/components/flag";
import { cn } from "@/lib/utils";

function initialsOf(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("");
}

export function InstructorCard({ teacher, index = 0 }: { teacher: Teacher; index?: number }) {
  const [expanded, setExpanded] = React.useState(false);
  const [imageFailed, setImageFailed] = React.useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
      className="group flex h-full flex-col overflow-hidden rounded-3xl border border-border/70 bg-card shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:border-indigo-200 hover:shadow-card"
    >
      <div className="relative h-64 overflow-hidden bg-gradient-to-br from-indigo-400 via-blue-400 to-purple-400">
        <span className="absolute inset-0 flex items-center justify-center text-5xl font-extrabold text-white/80">
          {initialsOf(teacher.name)}
        </span>
        {!imageFailed && (
          <Image
            src={teacher.photo}
            alt={teacher.photoAlt}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            onError={() => setImageFailed(true)}
          />
        )}
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-slate-950/80 to-transparent" aria-hidden />

        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5">
          <div>
            <h3 className="text-lg font-extrabold text-white drop-shadow">{teacher.name}</h3>
            <p className="text-xs font-semibold text-indigo-100">{teacher.title}</p>
          </div>
          <span className="inline-flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-xs font-bold text-slate-900">
            <Star className="h-3 w-3 fill-amber-400 text-amber-400" aria-hidden />
            {teacher.rating.toFixed(1)}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-6">
        <ul className="flex flex-wrap gap-1.5">
          {teacher.languages.map((language) => (
            <li
              key={language.name}
              className="inline-flex items-center gap-1.5 rounded-full bg-muted px-2.5 py-1 text-[11px] font-bold text-slate-600"
            >
              <Flag code={language.flag} title={language.name} className="h-3 w-4" />
              {language.name}
            </li>
          ))}
        </ul>

        <ul className="grid grid-cols-3 gap-2 text-center text-xs">
          <li className="rounded-2xl bg-indigo-50/70 py-2.5">
            <Clock className="mx-auto mb-1 h-4 w-4 text-indigo-500" aria-hidden />
            <span className="block font-extrabold text-slate-900">{teacher.experienceYears} yrs</span>
            <span className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">exp.</span>
          </li>
          <li className="rounded-2xl bg-purple-50/70 py-2.5">
            <BookOpen className="mx-auto mb-1 h-4 w-4 text-purple-500" aria-hidden />
            <span className="block font-extrabold text-slate-900">
              {teacher.lessonsTaught.toLocaleString("en-US")}
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">lessons</span>
          </li>
          <li className="rounded-2xl bg-sky-50/70 py-2.5">
            <Award className="mx-auto mb-1 h-4 w-4 text-sky-500" aria-hidden />
            <span className="block font-extrabold text-slate-900">{teacher.courseSlugs.length}</span>
            <span className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">courses</span>
          </li>
        </ul>

        <div
          className={cn(
            "grid transition-all duration-500 ease-out",
            "max-md:grid-rows-[1fr] max-md:opacity-100",
            expanded
              ? "grid-rows-[1fr] opacity-100"
              : "grid-rows-[0fr] opacity-0 md:group-hover:grid-rows-[1fr] md:group-hover:opacity-100 md:group-focus-within:grid-rows-[1fr] md:group-focus-within:opacity-100"
          )}
        >
          <div className="overflow-hidden">
            <div className="space-y-3 border-t border-border pt-4 text-sm leading-relaxed text-muted-foreground">
              <p>{teacher.bio}</p>
              <ul className="flex flex-wrap gap-2">
                {teacher.specialties.map((specialty) => (
                  <li
                    key={specialty}
                    className="rounded-full border border-indigo-100 bg-indigo-50 px-2.5 py-1 text-[11px] font-semibold text-indigo-700"
                  >
                    {specialty}
                  </li>
                ))}
              </ul>
              <p className="text-xs font-semibold text-slate-500">{teacher.education}</p>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
          className="mt-auto self-start text-sm font-bold text-indigo-700 underline-offset-4 hover:underline md:hidden"
        >
          {expanded ? "Hide bio" : "Read full bio"}
        </button>
      </div>
    </motion.article>
  );
}
