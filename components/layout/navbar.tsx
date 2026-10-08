"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { GraduationCap, Menu, X } from "lucide-react";
import { navLinks, site } from "@/data/site";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { LanguageSwitcher } from "@/components/language-switcher";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-all duration-300",
        scrolled ? "bg-white/85 shadow-soft backdrop-blur-lg" : "bg-transparent"
      )}
    >
      <div className="container-x flex h-20 items-center justify-between gap-4">
        <Link href="/" className="group flex items-center gap-3" aria-label={`${site.name} home`}>
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-gradient text-white shadow-card transition-transform group-hover:-rotate-6">
            <GraduationCap className="h-6 w-6" aria-hidden />
          </span>
          <span className="leading-none">
            <span className="block text-xl font-extrabold tracking-tight">{site.name}</span>
            <span className="block text-[11px] font-semibold uppercase tracking-[0.2em] text-indigo-600">
              {site.tagline}
            </span>
          </span>
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "relative rounded-full px-4 py-2 text-sm font-semibold transition-colors",
                      active ? "text-indigo-700" : "text-foreground/80 hover:text-indigo-700"
                    )}
                  >
                    {link.label}
                    {active && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute inset-x-3 -bottom-0.5 h-1 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500"
                        transition={{ type: "spring", stiffness: 400, damping: 32 }}
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <LanguageSwitcher />
          <Button asChild className="hidden sm:inline-flex">
            <Link href="/contact#trial">Enroll now</Link>
          </Button>

          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <button
                type="button"
                aria-label="Open navigation menu"
                className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-border bg-card transition-colors hover:border-indigo-300 hover:text-indigo-700 lg:hidden"
              >
                <Menu className="h-5 w-5" aria-hidden />
              </button>
            </DialogTrigger>
            <DialogContent className="top-6 max-w-md -translate-y-0 p-0 sm:rounded-3xl">
              <DialogTitle className="sr-only">Navigation menu</DialogTitle>
              <div className="flex items-center justify-between border-b border-border py-4 pl-6 pr-14">
                <span className="text-lg font-extrabold">{site.name}</span>
                <span className="text-xs font-semibold uppercase tracking-widest text-indigo-600">
                  {site.tagline}
                </span>
              </div>
              <nav aria-label="Mobile" className="px-4 pb-2">
                <ul className="space-y-1">
                  {navLinks.map((link) => {
                    const active = pathname === link.href;
                    return (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          aria-current={active ? "page" : undefined}
                          className={cn(
                            "flex items-center justify-between rounded-2xl px-4 py-3.5 text-base font-semibold transition-colors",
                            active ? "bg-indigo-50 text-indigo-700" : "hover:bg-muted"
                          )}
                        >
                          {link.label}
                          {active && <X className="h-4 w-4 rotate-45" aria-hidden />}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>
              <div className="space-y-3 border-t border-border px-6 py-5">
                <LanguageSwitcher compact />
                <Button asChild size="lg" className="w-full">
                  <Link href="/contact#trial">Enroll now</Link>
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </header>
  );
}
