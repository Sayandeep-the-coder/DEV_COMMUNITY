import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "./components/SmoothScroll";
import SectionSnapper from "./components/SectionSnapper";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

const SITE_URL = "https://devcommunitykgec.in";
const SITE_NAME = "Dev Community KGEC";
const SITE_DESCRIPTION =
  "Dev Community KGEC is a student-driven developer community at Kalyani Government Engineering College focused on technology, innovation, open source, Web3, AI, hackathons, workshops, and real-world development.";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
    { media: "(prefers-color-scheme: light)", color: "#000000" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Dev Community KGEC — Student Developer Community at Kalyani Government Engineering College",
    template: "%s | Dev Community KGEC",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "Dev Community KGEC",
    "KGEC developer community",
    "Kalyani Government Engineering College",
    "student developer community",
    "hackathons KGEC",
    "coding community Kalyani",
    "open source KGEC",
    "Web3 community",
    "AI ML community",
    "web development KGEC",
    "competitive programming KGEC",
    "tech community Bengal",
    "KGEC workshops",
    "developer bootcamps",
    "blockchain community KGEC",
    "FOSS contributions",
    "college tech club",
    "engineering college developer club",
    "KGEC coding club",
    "student-led tech community India",
  ],
  authors: [{ name: "Dev Community KGEC", url: SITE_URL }],
  creator: "Dev Community KGEC",
  publisher: "Dev Community KGEC",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: "Dev Community KGEC — Build. Learn. Collaborate.",
    description: SITE_DESCRIPTION,
    images: [
      {
        url: "/logo.jpg",
        width: 512,
        height: 512,
        alt: "Dev Community KGEC — Student Developer Community Logo",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dev Community KGEC — Build. Learn. Collaborate.",
    description: SITE_DESCRIPTION,
    images: ["/logo.jpg"],
    creator: "@devcommunitykgec",
    site: "@devcommunitykgec",
  },
  icons: {
    icon: [
      { url: "/logo.jpg", type: "image/jpeg" },
    ],
    apple: [
      { url: "/logo.jpg", type: "image/jpeg" },
    ],
  },
  category: "technology",
};

/** JSON-LD Organization structured data for rich search results */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/logo.jpg`,
  description: SITE_DESCRIPTION,
  foundingDate: "2024",
  sameAs: [
    "https://www.linkedin.com/company/dc-kgec?originalSubdomain=in",
    "https://www.instagram.com/dc_kgec/",
    "https://twitter.com/devcommunitykgec",
    "https://github.com/devcommunitykgec",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    email: "contact@devcommunitykgec.in",
    contactType: "general",
  },
  memberOf: {
    "@type": "EducationalOrganization",
    name: "Kalyani Government Engineering College",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Kalyani",
      addressRegion: "West Bengal",
      addressCountry: "IN",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}>
      <body className="min-h-screen flex flex-col">
        {/* JSON-LD Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <SmoothScroll>
          <SectionSnapper>{children}</SectionSnapper>
        </SmoothScroll>
      </body>
    </html>
  );
}
