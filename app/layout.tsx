import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "./components/SmoothScroll";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Dev Community KGEC",
  description:
    "A student-driven developer community at Kalyani Government Engineering College focused on technology, innovation, open source, Web3, AI, and real-world development.",
  openGraph: {
    title: "Dev Community KGEC",
    description:
      "A student-driven developer community at Kalyani Government Engineering College focused on technology, innovation, open source, Web3, AI, and real-world development.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dev Community KGEC",
    description:
      "A student-driven developer community at Kalyani Government Engineering College focused on technology, innovation, open source, Web3, AI, and real-world development.",
  },
  icons: {
    icon: "/logo.jpg",
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
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
