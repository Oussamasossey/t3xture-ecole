"use client";

import * as React from "react";
import { Check, ChevronDown, Languages } from "lucide-react";
import { cn } from "@/lib/utils";
import { Flag } from "@/components/flag";

interface Option {
  code: string;
  label: string;
  native: string;
}

const options: Option[] = [
  { code: "EN", label: "English", native: "English" },
  { code: "FR", label: "French", native: "Français" },
  { code: "ES", label: "Spanish", native: "Español" },
  { code: "DE", label: "German", native: "Deutsch" },
  { code: "IT", label: "Italian", native: "Italiano" },
  { code: "JA", label: "Japanese", native: "日本語" },
];

const STORAGE_KEY = "lingua.ui.language";

export function LanguageSwitcher({ compact = false }: { compact?: boolean }) {
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<Option>(options[0]);
  const rootRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      const match = options.find((o) => o.code === stored);
      if (match) setSelected(match);
    } catch {
      /* storage unavailable — UI still works with the default */
    }
  }, []);

  React.useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const select = (option: Option) => {
    setSelected(option);
    setOpen(false);
    try {
      window.localStorage.setItem(STORAGE_KEY, option.code);
    } catch {
      /* ignore */
    }
  };

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`Interface language: ${selected.label}. Change language`}
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-2 text-sm font-semibold transition-colors hover:border-indigo-300 hover:text-indigo-700",
          compact && "w-full justify-center"
        )}
      >
        <Languages className="h-4 w-4 text-indigo-600" aria-hidden />
        <span className="hidden sm:inline">{selected.label}</span>
        <span className="sm:hidden">{selected.code}</span>
        <ChevronDown className={cn("h-4 w-4 transition-transform", open && "rotate-180")} aria-hidden />
      </button>

      {open && (
        <ul
          role="listbox"
          aria-label="Select interface language"
          className="absolute right-0 z-50 mt-2 w-52 overflow-hidden rounded-2xl border border-border bg-popover p-1.5 shadow-soft"
        >
          {options.map((option) => {
            const active = option.code === selected.code;
            return (
              <li key={option.code}>
                <button
                  type="button"
                  role="option"
                  aria-selected={active}
                  onClick={() => select(option)}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition-colors",
                    active ? "bg-indigo-50 font-semibold text-indigo-700" : "hover:bg-muted"
                  )}
                >
                  <Flag code={option.code === "JA" ? "JP" : option.code} className="h-3.5 w-5" title={option.label} />
                  <span className="flex-1">
                    {option.label}
                    <span className="block text-xs font-normal text-muted-foreground">{option.native}</span>
                  </span>
                  {active && <Check className="h-4 w-4" aria-hidden />}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
