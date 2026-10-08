import * as React from "react";
import { GB, ES, FR, DE, IT, PT, NL, RU, JP, KR, CN, SA, US } from "country-flag-icons/react/3x2";
import { cn } from "@/lib/utils";

const flagMap: Record<string, React.ComponentType<{ title?: string; className?: string }>> = {
  GB,
  US,
  ES,
  FR,
  DE,
  IT,
  PT,
  NL,
  RU,
  JP,
  KR,
  CN,
  SA,
};

export function Flag({
  code,
  className,
  title,
}: {
  code: string;
  className?: string;
  title?: string;
}) {
  const Icon = flagMap[code];
  if (!Icon) return null;
  return (
    <span
      className={cn("inline-flex overflow-hidden rounded-[3px] ring-1 ring-slate-200/70", className)}
      aria-hidden={title ? undefined : true}
      role={title ? "img" : undefined}
      aria-label={title}
    >
      <Icon className="h-full w-auto" title={title} />
    </span>
  );
}
