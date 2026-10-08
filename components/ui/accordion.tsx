"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

type AccordionContextValue = {
  value: string | null;
  toggle: (value: string) => void;
};

const AccordionContext = React.createContext<AccordionContextValue | null>(null);

const useAccordion = () => {
  const ctx = React.useContext(AccordionContext);
  if (!ctx) throw new Error("Accordion components must be used inside <Accordion>");
  return ctx;
};

interface AccordionProps {
  defaultValue?: string | null;
  className?: string;
  id?: string;
  children?: React.ReactNode;
}

function Accordion({ defaultValue = null, className, id, children }: AccordionProps) {
  const [value, setValue] = React.useState<string | null>(defaultValue);

  const ctx = React.useMemo<AccordionContextValue>(
    () => ({ value, toggle: (v) => setValue((current) => (current === v ? null : v)) }),
    [value]
  );

  return (
    <AccordionContext.Provider value={ctx}>
      <div id={id} className={cn("divide-y divide-border rounded-3xl border border-border/70 bg-card shadow-soft", className)}>
        {children}
      </div>
    </AccordionContext.Provider>
  );
}

function AccordionItem({ value, className, children }: { value: string; className?: string; children: React.ReactNode }) {
  const { toggle } = useAccordion();
  const id = React.useId();

  return (
    <div className={cn("px-5 sm:px-6", className)}>
      <AccordionItemContext.Provider value={{ value, itemId: id, onChange: () => toggle(value) }}>
        {children}
      </AccordionItemContext.Provider>
    </div>
  );
}

type ItemContextValue = { value: string; itemId: string; onChange: () => void };
const AccordionItemContext = React.createContext<ItemContextValue | null>(null);

function useAccordionItem() {
  const item = React.useContext(AccordionItemContext);
  const { value: openValue } = useAccordion();
  if (!item) throw new Error("AccordionItem components must be used inside <AccordionItem>");
  return { ...item, open: openValue === item.value };
}

function AccordionTrigger({ className, children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { itemId, open, onChange } = useAccordionItem();
  return (
    <button
      type="button"
      aria-expanded={open}
      aria-controls={`${itemId}-content`}
      id={`${itemId}-trigger`}
      onClick={onChange}
      className={cn(
        "flex w-full items-center justify-between gap-4 py-5 text-left text-base font-semibold transition-colors hover:text-indigo-700 [&[data-state=open]>svg]:rotate-180",
        className
      )}
      {...props}
    >
      {children}
      <ChevronDown
        className={cn("h-5 w-5 shrink-0 text-indigo-500 transition-transform duration-300", open && "rotate-180")}
      />
    </button>
  );
}

function AccordionContent({ className, children }: { className?: string; children: React.ReactNode }) {
  const { itemId, open } = useAccordionItem();
  return (
    <AnimatePresence initial={false}>
      {open && (
        <motion.div
          id={`${itemId}-content`}
          role="region"
          aria-labelledby={`${itemId}-trigger`}
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
          className="overflow-hidden"
        >
          <div className={cn("pb-5 pr-8 text-sm leading-relaxed text-muted-foreground", className)}>{children}</div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
