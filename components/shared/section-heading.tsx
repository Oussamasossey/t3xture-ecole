import * as React from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/motion/reveal";

interface SectionHeadingProps {
  eyebrow?: string;
  title: React.ReactNode;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({ eyebrow, title, description, align = "center", className }: SectionHeadingProps) {
  return (
    <Reveal className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && (
        <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-indigo-600">{eyebrow}</p>
      )}
      <h2 className="text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl lg:text-[2.75rem]">
        {title}
      </h2>
      {description && <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">{description}</p>}
    </Reveal>
  );
}

interface PageHeaderProps {
  eyebrow?: string;
  title: React.ReactNode;
  description?: string;
  children?: React.ReactNode;
  className?: string;
}

export function PageHeader({ eyebrow, title, description, children, className }: PageHeaderProps) {
  return (
    <header className={cn("relative overflow-hidden bg-soft-gradient pt-32 pb-16 sm:pt-36 sm:pb-20", className)}>
      <div className="blob -left-24 -top-24 h-72 w-72 bg-blue-300/40" aria-hidden />
      <div className="blob -right-16 top-10 h-64 w-64 bg-purple-300/40" aria-hidden />
      <div className="grid-dots absolute inset-0 opacity-60" aria-hidden />
      <div className="container-x relative">
        <Reveal>
          {eyebrow && (
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-indigo-600">{eyebrow}</p>
          )}
          <h1 className="max-w-4xl text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
            {title}
          </h1>
          {description && (
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              {description}
            </p>
          )}
          {children}
        </Reveal>
      </div>
    </header>
  );
}
