import { Hero } from "@/components/home/hero";
import { LanguagesGrid } from "@/components/home/languages-grid";
import { LearningPath } from "@/components/home/learning-path";
import { TeachingMethod } from "@/components/home/teaching-method";
import { StatsCounter } from "@/components/home/stats-counter";
import { TestimonialCarousel } from "@/components/home/testimonials-carousel";
import { TrialCtaBand } from "@/components/shared/cta-band";

export default function HomePage() {
  return (
    <>
      <Hero />
      <LanguagesGrid />
      <LearningPath />
      <TeachingMethod />
      <StatsCounter />
      <TestimonialCarousel />
      <TrialCtaBand />
    </>
  );
}
