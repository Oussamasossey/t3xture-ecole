"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, Check, GraduationCap, Instagram, Linkedin, Youtube } from "lucide-react";
import { site, navLinks, languages } from "@/data/site";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const socials = [
  { label: "Instagram", href: "https://www.instagram.com", icon: Instagram },
  { label: "LinkedIn", href: "https://www.linkedin.com", icon: Linkedin },
  { label: "YouTube", href: "https://www.youtube.com", icon: Youtube },
];

export function Footer() {
  const [email, setEmail] = React.useState("");
  const [subscribed, setSubscribed] = React.useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) return;
    setSubscribed(true);
  };

  return (
    <footer className="relative overflow-hidden bg-slate-950 text-slate-300">
      <div className="blob -left-20 top-0 h-72 w-72 bg-indigo-600/30" aria-hidden />
      <div className="blob right-0 -bottom-24 h-80 w-80 bg-purple-600/20" aria-hidden />

      <div className="container-x relative grid gap-12 py-16 lg:grid-cols-[1.4fr_1fr_1fr_1.3fr]">
        <div>
          <Link href="/" className="flex items-center gap-3" aria-label={`${site.name} home`}>
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-gradient text-white">
              <GraduationCap className="h-6 w-6" aria-hidden />
            </span>
            <span className="leading-none">
              <span className="block text-xl font-extrabold text-white">{site.name}</span>
              <span className="block text-[11px] font-semibold uppercase tracking-[0.2em] text-indigo-400">
                {site.tagline}
              </span>
            </span>
          </Link>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-slate-400">
            Conversation-first language teaching in 12 languages, online and on campus in Brussels. Groups of
            eight, teachers who care, progress you can measure.
          </p>
          <ul className="mt-6 flex gap-3">
            {socials.map(({ label, href, icon: Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-colors hover:border-indigo-400 hover:text-white"
                >
                  <Icon className="h-4 w-4" aria-hidden />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <nav aria-label="Footer navigation">
          <h2 className="text-sm font-bold uppercase tracking-widest text-white">Explore</h2>
          <ul className="mt-5 space-y-3 text-sm">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="transition-colors hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/contact#trial" className="transition-colors hover:text-white">
                Free trial lesson
              </Link>
            </li>
          </ul>
        </nav>

        <nav aria-label="Languages">
          <h2 className="text-sm font-bold uppercase tracking-widest text-white">Languages</h2>
          <ul className="mt-5 grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
            {languages.slice(0, 8).map((language) => (
              <li key={language.name}>
                <Link href="/courses" className="transition-colors hover:text-white">
                  {language.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-sm font-bold uppercase tracking-widest text-white">A phrase a week</h2>
          <p className="mt-5 text-sm leading-relaxed text-slate-400">
            One useful expression, one cultural note. No spam. Unsubscribe any time.
          </p>
          {subscribed ? (
            <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-4 py-2 text-sm font-semibold text-emerald-400">
              <Check className="h-4 w-4" aria-hidden /> You&apos;re on the list. Check your inbox.
            </p>
          ) : (
            <form onSubmit={onSubmit} className="mt-4 flex gap-2">
              <label htmlFor="footer-email" className="sr-only">
                Email address
              </label>
              <Input
                id="footer-email"
                type="email"
                required
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border-white/10 bg-white/5 text-white placeholder:text-slate-500"
              />
              <Button type="submit" size="icon" aria-label="Subscribe">
                <ArrowRight aria-hidden />
              </Button>
            </form>
          )}
          <address className="mt-6 space-y-1 text-sm not-italic text-slate-400">
            <span className="block text-white">{site.address.line1}</span>
            <span className="block">{site.address.line2}</span>
            <a href={`mailto:${site.email}`} className="block transition-colors hover:text-white">
              {site.email}
            </a>
            <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="block transition-colors hover:text-white">
              {site.phone}
            </a>
          </address>
        </div>
      </div>

      <div className="relative border-t border-white/10">
        <div className="container-x flex flex-col items-center justify-between gap-3 py-6 text-xs text-slate-500 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {site.name} {site.tagline}. All rights reserved.
          </p>
          <p>
            {site.hours}
            <span className="mx-2" aria-hidden>
              ·
            </span>
            Demo Website · Made by T3xture
          </p>
        </div>
      </div>
    </footer>
  );
}
