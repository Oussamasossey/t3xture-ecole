import Link from "next/link";
import { ArrowLeft, Compass } from "lucide-react";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[70vh] items-center overflow-hidden bg-soft-gradient pt-32">
      <div className="blob -left-20 top-10 h-72 w-72 bg-blue-300/40" aria-hidden />
      <div className="blob right-0 bottom-0 h-72 w-72 bg-purple-300/40" aria-hidden />
      <div className="grid-dots absolute inset-0 opacity-60" aria-hidden />

      <div className="container-x relative text-center">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-brand-gradient text-white shadow-card">
          <Compass className="h-8 w-8" aria-hidden />
        </span>
        <p className="mt-6 text-sm font-bold uppercase tracking-[0.2em] text-indigo-600">Error 404</p>
        <h1 className="mt-3 text-4xl font-extrabold sm:text-5xl">This page lost its translation</h1>
        <p className="mx-auto mt-4 max-w-md text-muted-foreground">
          The page you were looking for does not exist. Let&apos;s get you back to a language that works.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 px-7 py-3 text-sm font-bold text-white shadow-card transition hover:brightness-110"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            Back home
          </Link>
          <Link
            href="/courses"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-7 py-3 text-sm font-bold transition hover:border-indigo-300 hover:text-indigo-700"
          >
            Browse courses
          </Link>
        </div>
      </div>
    </section>
  );
}
