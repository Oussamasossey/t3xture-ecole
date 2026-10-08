export const site = {
  name: "Lingua",
  tagline: "Language School",
  description:
    "Lingua is a modern language school offering online and in-person courses in 12 languages. Small groups, expert teachers and a proven CEFR-aligned method.",
  url: "https://lingua.example.com",
  email: "hello@lingua.example.com",
  phone: "+32 2 555 01 40",
  address: {
    line1: "Rue du Progrès 42",
    line2: "1210 Brussels, Belgium",
  },
  hours: "Mon–Fri 09:00–20:00 · Sat 10:00–14:00",
};

export interface NavLink {
  label: string;
  href: string;
}

export const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Courses", href: "/courses" },
  { label: "Teachers", href: "/teachers" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export interface Language {
  name: string;
  flag: string;
  native: string;
  blurb: string;
  learners: string;
}

export const languages: Language[] = [
  { name: "English", flag: "GB", native: "English", blurb: "General, business & exam prep", learners: "4.2k learners" },
  { name: "Spanish", flag: "ES", native: "Español", blurb: "Conversation-first Latin American & European", learners: "2.8k learners" },
  { name: "French", flag: "FR", native: "Français", blurb: "From cafés to DELF exam success", learners: "2.1k learners" },
  { name: "German", flag: "DE", native: "Deutsch", blurb: "Technical, academic & everyday German", learners: "1.6k learners" },
  { name: "Italian", flag: "IT", native: "Italiano", blurb: "Culture, food and la bella lingua", learners: "1.1k learners" },
  { name: "Portuguese", flag: "PT", native: "Português", blurb: "Brazilian & European variants", learners: "860 learners" },
  { name: "Dutch", flag: "NL", native: "Nederlands", blurb: "Integration & daily-life fluency", learners: "740 learners" },
  { name: "Russian", flag: "RU", native: "Русский", blurb: "Cyrillic bootcamp to C2 polish", learners: "520 learners" },
  { name: "Japanese", flag: "JP", native: "日本語", blurb: "Kanji, keigo & JLPT coaching", learners: "980 learners" },
  { name: "Korean", flag: "KR", native: "한국어", blurb: "Hangul foundations to media Korean", learners: "610 learners" },
  { name: "Chinese", flag: "CN", native: "中文", blurb: "Mandarin tones & HSK preparation", learners: "690 learners" },
  { name: "Arabic", flag: "SA", native: "العربية", blurb: "MSA, script and dialect awareness", learners: "430 learners" },
];

export interface LevelMeta {
  level: string;
  name: string;
  summary: string;
  outcome: string;
}

export const levelPath: LevelMeta[] = [
  { level: "A1", name: "Beginner", summary: "Understand and use everyday expressions", outcome: "Introduce yourself, order food, ask simple questions" },
  { level: "A2", name: "Elementary", summary: "Handle routine tasks and short exchanges", outcome: "Describe your day, shop, travel and make plans" },
  { level: "B1", name: "Intermediate", summary: "Deal with most situations while travelling", outcome: "Tell stories, explain opinions, follow main conversations" },
  { level: "B2", name: "Upper-int.", summary: "Interact fluently and spontaneously", outcome: "Debate, write reports, understand complex arguments" },
  { level: "C1", name: "Advanced", summary: "Express ideas clearly and flexibly", outcome: "Negotiate, present, write nuanced academic texts" },
  { level: "C2", name: "Mastery", summary: "Understand virtually everything you hear or read", outcome: "Summarise, nuance and improvise with precision" },
];

export interface MethodStep {
  step: string;
  title: string;
  text: string;
}

export const methodSteps: MethodStep[] = [
  { step: "01", title: "Free placement test", text: "A 15-minute adaptive test and a chat with a teacher pin down exactly where you start." },
  { step: "02", title: "Personal learning plan", text: "Your goals, schedule and pace become a weekly plan with clear milestones up to your target level." },
  { step: "03", title: "Live, conversation-first classes", text: "70% of every lesson is you speaking. Teachers correct in real time without breaking your flow." },
  { step: "04", title: "Progress you can see", text: "Monthly level checks, recorded feedback and a certificate when you pass each CEFR stage." },
];

export const values = [
  { title: "Humans first", text: "Every course is taught by a trained native or near-native teacher, never by an app alone." },
  { title: "Small by design", text: "Groups cap at 8 learners so everyone speaks for a meaningful part of every lesson." },
  { title: "Real-world material", text: "Podcasts, workplace emails, menus and news clips instead of dusty textbook dialogues." },
  { title: "Transparent progress", text: "You always know your CEFR level, what is next and exactly what to practise this week." },
];

export const milestones = [
  { year: "2009", title: "Lingua opens its doors", text: "Three teachers, one classroom and a stubborn belief that speaking beats memorising." },
  { year: "2014", title: "First exam cohort", text: "94% of our DELF and IELTS candidates passed at their target band, and the number has only grown." },
  { year: "2018", title: "Hybrid classrooms", text: "Every in-person room got broadcast-grade audio so online learners join with the same experience." },
  { year: "2022", title: "12 languages, one campus", text: "We expanded to East Asian and Middle Eastern languages with new specialised teachers." },
  { year: "2026", title: "12,500 learners later", text: "Still capped at 8 seats per group, still conversation-first, still run by teachers." },
];

export const stats = [
  { value: 12500, suffix: "+", label: "Students taught", decimals: 0 },
  { value: 12, suffix: "", label: "Languages offered", decimals: 0 },
  { value: 85000, suffix: "+", label: "Lessons delivered", decimals: 0 },
  { value: 98, suffix: "%", label: "Would recommend us", decimals: 0 },
];

export const trialSteps = [
  { title: "Send your request", text: "Tell us your language, level and the time slots that suit you." },
  { title: "We match a teacher", text: "Within one working day you get a confirmation with your trial teacher." },
  { title: "Take the free lesson", text: "45 minutes of real teaching, plus an honest level assessment." },
  { title: "Get your plan", text: "If you like it, we send a learning plan and schedule. No pressure, ever." },
];

export const faqs = [
  {
    q: "Is the trial lesson really free?",
    a: "Yes. 45 minutes with a teacher, including a placement check and a written learning plan. No card details required.",
  },
  {
    q: "How big are the groups?",
    a: "Maximum 8 learners. Semi-private courses run with 3, and private tuition is one-to-one.",
  },
  {
    q: "Can I switch between online and in-person?",
    a: "Absolutely. Any course can be joined remotely, and hybrid learners keep the same teacher and group.",
  },
  {
    q: "Do you issue certificates?",
    a: "Every course ends with an internal certificate, and we prepare you for officially recognised exams such as DELF, Goethe, JLPT and HSK.",
  },
];

export const languagesOffered = languages.map((l) => l.name);

export const contactChannels = [
  { title: "Visit the campus", lines: ["Rue du Progrès 42", "1210 Brussels, Belgium"], icon: "map-pin" as const },
  { title: "Call us", lines: ["+32 2 555 01 40", "Mon–Fri, 09:00–20:00"], icon: "phone" as const },
  { title: "Email", lines: ["hello@lingua.example.com", "Reply within 1 working day"], icon: "mail" as const },
  { title: "Office hours", lines: ["Mon–Fri 09:00–20:00", "Sat 10:00–14:00"], icon: "clock" as const },
];
