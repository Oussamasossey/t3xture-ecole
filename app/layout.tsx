import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { MotionConfig } from "framer-motion";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { site } from "@/data/site";
import "./globals.css";

const sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Lingua | Language School in Brussels & Online",
    template: "%s | Lingua Language School",
  },
  description: site.description,
  keywords: [
    "language school",
    "learn languages",
    "online language courses",
    "English course",
    "Spanish course",
    "French course",
    "Brussels language school",
    "CEFR courses",
    "language classes online",
  ],
  applicationName: site.name,
  authors: [{ name: site.name }],
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: site.url,
    siteName: `${site.name} | ${site.tagline}`,
    title: "Lingua | Learn a new language with real confidence",
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: "Lingua | Language School",
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#4f46e5",
  width: "device-width",
  initialScale: 1,
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": ["EducationalOrganization", "Organization"],
  name: site.name,
  url: site.url,
  email: site.email,
  telephone: site.phone,
  description: site.description,
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.line1,
    addressLocality: "Brussels",
    postalCode: "1210",
    addressCountry: "BE",
  },
  sameAs: ["https://www.instagram.com", "https://www.linkedin.com", "https://www.youtube.com"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={sans.variable}>
      <body className="font-sans">
        <a
          href="#main-content"
          className="sr-only left-4 top-4 z-[60] rounded-full bg-indigo-600 px-5 py-3 text-sm font-bold text-white focus:not-sr-only focus:fixed"
        >
          Skip to main content
        </a>
        <MotionConfig reducedMotion="user">
          <Navbar />
          <main id="main-content">{children}</main>
          <Footer />
        </MotionConfig>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </body>
    </html>
  );
}
