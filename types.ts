export type Level = "A1" | "A2" | "B1" | "B2" | "C1" | "C2";

export type CourseFormat = "online" | "in-person";

export interface CurriculumModule {
  id: string;
  title: string;
  summary: string;
  lessons: string[];
}

export interface ScheduleSlot {
  day: string;
  time: string;
  type: "Live class" | "Conversation lab" | "Self-paced";
  location: string;
}

export interface PricingTier {
  id: "group" | "semi-private" | "private";
  name: string;
  seats: string;
  price: number;
  perSession: number;
  perks: string[];
  highlighted?: boolean;
}

export interface Course {
  slug: string;
  title: string;
  language: string;
  languageSlug: string;
  flag: string;
  level: Level;
  format: CourseFormat;
  durationWeeks: number;
  lessons: number;
  hours: number;
  price: number;
  currency: string;
  nextStart: string;
  startDate: string;
  rating: number;
  students: number;
  instructorId: string;
  summary: string;
  description: string;
  highlights: string[];
  outcomes: string[];
  curriculum: CurriculumModule[];
  schedule: ScheduleSlot[];
  tags: string[];
  groupSize: string;
  certificate: boolean;
  updated: string;
}

export interface Teacher {
  id: string;
  name: string;
  title: string;
  photo: string;
  photoAlt: string;
  languages: { name: string; flag: string }[];
  experienceYears: number;
  specialties: string[];
  bio: string;
  education: string;
  certifications: string[];
  rating: number;
  lessonsTaught: number;
  courseSlugs: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  course: string;
  quote: string;
  rating: number;
  initials: string;
  accent: string;
}
