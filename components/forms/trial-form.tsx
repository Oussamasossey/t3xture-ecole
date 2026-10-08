"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { ArrowRight, CalendarCheck, CheckCircle2, Loader2 } from "lucide-react";
import { languages, levelPath } from "@/data/site";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TrialFormProps {
  courseTitle?: string;
  language?: string;
}

const timeSlots = ["Weekday mornings", "Weekday afternoons", "Weekday evenings", "Saturday"];

export function TrialForm({ courseTitle, language }: TrialFormProps) {
  const [status, setStatus] = React.useState<"idle" | "submitting" | "done">("idle");
  const [consent, setConsent] = React.useState(false);
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!consent) return;
    setStatus("submitting");
    // No backend request is made yet.
    window.setTimeout(() => setStatus("done"), 900);
  };

  if (status === "done") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col items-center rounded-3xl border border-emerald-200 bg-emerald-50/70 p-10 text-center"
        role="status"
      >
        <CheckCircle2 className="h-14 w-14 text-emerald-500" aria-hidden />
        <h3 className="mt-5 text-2xl font-extrabold text-slate-900">Request received, {name.split(" ")[0] || "friend"}!</h3>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-slate-600">
          A teacher will confirm your free {courseTitle ? `“${courseTitle}” ` : ""}trial lesson at{" "}
          <span className="font-semibold">{email}</span> within one working day.
        </p>
        <Button variant="outline" className="mt-6" onClick={() => setStatus("idle")}>
          Send another request
        </Button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="rounded-3xl border border-border/70 bg-card p-6 shadow-soft sm:p-8">
      {courseTitle && (
        <p className="mb-5 inline-flex items-center gap-2 rounded-full bg-indigo-50 px-4 py-2 text-xs font-bold text-indigo-700">
          <CalendarCheck className="h-4 w-4" aria-hidden />
          Trial for: {courseTitle}
        </p>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="trial-name">Full name *</Label>
          <Input
            id="trial-name"
            name="name"
            required
            autoComplete="name"
            placeholder="Alex Moreau"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="trial-email">Email *</Label>
          <Input
            id="trial-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="trial-phone">Phone (optional)</Label>
          <Input id="trial-phone" name="phone" type="tel" autoComplete="tel" placeholder="+32 …" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="trial-language">Language *</Label>
          <Select name="language" required defaultValue={language}>
            <SelectTrigger id="trial-language" aria-label="Language you want to learn">
              <SelectValue placeholder="Choose a language" />
            </SelectTrigger>
            <SelectContent>
              {languages.map((language) => (
                <SelectItem key={language.name} value={language.name.toLowerCase()}>
                  {language.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="trial-level">Current level *</Label>
          <Select name="level" required>
            <SelectTrigger id="trial-level" aria-label="Your current level">
              <SelectValue placeholder="Select your level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="not-sure">Not sure, please assess me</SelectItem>
              {levelPath.map((level) => (
                <SelectItem key={level.level} value={level.level}>
                  {level.level} · {level.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="trial-format">Preferred format *</Label>
          <Select name="format" required defaultValue="online">
            <SelectTrigger id="trial-format" aria-label="Preferred course format">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="online">Online</SelectItem>
              <SelectItem value="in-person">In person (Brussels)</SelectItem>
              <SelectItem value="either">Either works</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="trial-time">Best time slot *</Label>
          <Select name="time" required defaultValue={timeSlots[2]}>
            <SelectTrigger id="trial-time" aria-label="Preferred time slot">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {timeSlots.map((slot) => (
                <SelectItem key={slot} value={slot.toLowerCase()}>
                  {slot}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="trial-date">Preferred start date</Label>
          <Input id="trial-date" name="date" type="date" />
        </div>
      </div>

      <div className="mt-5 space-y-2">
        <Label htmlFor="trial-goals">Your goal (optional)</Label>
        <Textarea
          id="trial-goals"
          name="goals"
          placeholder="e.g. I move to Berlin in April and need B1 for my workplace…"
        />
      </div>

      <label className="mt-6 flex cursor-pointer items-start gap-3 text-sm text-muted-foreground">
        <Checkbox
          checked={consent}
          onCheckedChange={(value) => setConsent(value === true)}
          aria-label="I agree to be contacted about my trial lesson"
        />
        <span>
          I agree that {`Lingua`} may contact me about this request. *
        </span>
      </label>

      <Button type="submit" size="lg" className="mt-6 w-full" disabled={status === "submitting" || !consent}>
        {status === "submitting" ? (
          <>
            <Loader2 className="animate-spin" aria-hidden />
            Sending…
          </>
        ) : (
          <>
            Book my free trial lesson
            <ArrowRight aria-hidden />
          </>
        )}
      </Button>
      <p className="mt-3 text-center text-xs text-muted-foreground">Free · 45 minutes · No card required</p>
    </form>
  );
}
