import type { Metadata } from "next";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { contactChannels, faqs, site, trialSteps } from "@/data/site";
import { getCourse } from "@/data/courses";
import { PageHeader, SectionHeading } from "@/components/shared/section-heading";
import { TrialForm } from "@/components/forms/trial-form";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Reveal } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: "Contact & Free Trial Lesson",
  description:
    "Book a free 45-minute trial lesson at Lingua. Visit our Brussels campus, call us or email. We reply within one working day.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact Lingua | Book a free trial lesson",
    description: "Free 45-minute trial lesson, honest level assessment, personalised learning plan.",
    url: "/contact",
  },
};

const icons: Record<string, typeof MapPin> = {
  "map-pin": MapPin,
  phone: Phone,
  mail: Mail,
  clock: Clock,
};

interface ContactPageProps {
  searchParams: { course?: string; plan?: string };
}

export default function ContactPage({ searchParams }: ContactPageProps) {
  const course = searchParams.course ? getCourse(searchParams.course) : undefined;

  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title={
          <>
            Let&apos;s find your <span className="text-gradient">first lesson</span>
          </>
        }
        description="Send a trial request and a teacher will confirm your slot within one working day. Prefer to talk? We answer the phone during office hours."
      />

      <section aria-label="Contact details" className="container-x -mt-8 relative z-10">
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {contactChannels.map((channel) => {
            const Icon = icons[channel.icon];
            return (
              <li key={channel.title}>
                <Reveal className="h-full">
                  <div className="h-full rounded-3xl border border-border/70 bg-card p-5 shadow-soft">
                    <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
                      <Icon className="h-5 w-5" aria-hidden />
                    </span>
                    <h2 className="mt-4 font-extrabold">{channel.title}</h2>
                    <div className="mt-1 text-sm text-muted-foreground">
                      {channel.lines.map((line) => (
                        <p key={line}>{line}</p>
                      ))}
                    </div>
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </section>

      <section id="trial" aria-labelledby="trial-heading" className="container-x scroll-mt-28 py-16">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.25fr_1fr]">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-indigo-600">Free trial lesson</p>
            <h2 id="trial-heading" className="mt-3 text-3xl font-extrabold leading-tight sm:text-4xl">
              45 minutes, zero commitment
            </h2>
            <p className="mt-4 max-w-xl leading-relaxed text-muted-foreground">
              Tell us what you want to learn and when. We will match you with the right teacher and confirm your
              trial slot by email. No payment details, no auto-renewal, no catch.
            </p>

            <div className="mt-8">
              <TrialForm courseTitle={course?.title} language={course?.language.toLowerCase()} />
            </div>
          </div>

          <aside className="space-y-6" aria-label="What happens next">
            <Reveal>
              <div className="rounded-3xl border border-border/70 bg-soft-gradient p-6 shadow-soft">
                <h2 className="text-lg font-extrabold">What happens next</h2>
                <ol className="mt-5 space-y-5">
                  {trialSteps.map((step, index) => (
                    <li key={step.title} className="flex gap-4">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 text-sm font-extrabold text-white shadow-card">
                        {index + 1}
                      </span>
                      <span>
                        <span className="block text-sm font-extrabold text-slate-900">{step.title}</span>
                        <span className="mt-1 block text-sm leading-relaxed text-muted-foreground">{step.text}</span>
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div
                role="img"
                aria-label="Map showing the Lingua campus at Rue du Progrès 42, Brussels"
                className="relative flex h-56 items-end overflow-hidden rounded-3xl border border-border/70 bg-gradient-to-br from-indigo-100 via-white to-purple-100 p-5 shadow-soft"
              >
                <div className="grid-dots absolute inset-0 opacity-70" aria-hidden />
                <span className="absolute left-1/2 top-1/3 flex h-12 w-12 -translate-x-1/2 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-purple-600 text-white shadow-card">
                  <MapPin className="h-6 w-6" aria-hidden />
                </span>
                <div className="relative w-full rounded-2xl bg-white/90 p-4 backdrop-blur">
                  <p className="text-sm font-extrabold text-slate-900">{site.name} campus</p>
                  <p className="text-xs text-muted-foreground">
                    {site.address.line1} · {site.address.line2}
                  </p>
                  <p className="mt-1 text-xs font-semibold text-indigo-700">{site.hours}</p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="rounded-3xl border border-border/70 bg-card p-6 shadow-soft">
                <h2 className="text-lg font-extrabold">Prefer direct contact?</h2>
                <div className="mt-4 space-y-2 text-sm">
                  <a
                    href={`mailto:${site.email}`}
                    className="flex items-center gap-3 rounded-2xl bg-muted px-4 py-3 font-semibold transition-colors hover:bg-indigo-50 hover:text-indigo-700"
                  >
                    <Mail className="h-4 w-4 text-indigo-600" aria-hidden />
                    {site.email}
                  </a>
                  <a
                    href={`tel:${site.phone.replace(/\s/g, "")}`}
                    className="flex items-center gap-3 rounded-2xl bg-muted px-4 py-3 font-semibold transition-colors hover:bg-indigo-50 hover:text-indigo-700"
                  >
                    <Phone className="h-4 w-4 text-indigo-600" aria-hidden />
                    {site.phone}
                  </a>
                </div>
              </div>
            </Reveal>
          </aside>
        </div>
      </section>

      <section aria-labelledby="faq-heading" className="container-x pb-24">
        <SectionHeading
          eyebrow="FAQ"
          title={<span id="faq-heading">Questions we hear every week</span>}
          description="Anything else? Just ask in the form above and a human will reply."
        />
        <Reveal delay={0.1} className="mx-auto mt-10 max-w-3xl">
          <Accordion defaultValue="q1">
            {faqs.map((faq, index) => (
              <AccordionItem key={faq.q} value={`q${index + 1}`}>
                <AccordionTrigger>{faq.q}</AccordionTrigger>
                <AccordionContent>{faq.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </section>
    </>
  );
}
