import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { getSiteUrl } from "@/lib/site-url";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = getSiteUrl();
const socialImageUrl = siteUrl
  ? new URL("/api/og", siteUrl).toString()
  : undefined;

export const metadata: Metadata = {
  ...(siteUrl
    ? {
        metadataBase: siteUrl,
        alternates: { canonical: siteUrl },
      }
    : {}),
  title: {
    default: "Syed Mujtaba Abbas | Software Engineer & Agentic AI Developer",
    template: "%s | Syed Mujtaba Abbas",
  },
  description:
    "Syed Mujtaba Abbas is a software engineer in Karachi, Pakistan building thoughtful full-stack products, agentic AI systems, and robotics applications.",
  applicationName: "Syed Mujtaba Abbas — Portfolio",
  keywords: [
    "Syed Mujtaba Abbas",
    "Software Engineer Karachi",
    "Full-stack developer Pakistan",
    "Agentic AI developer",
    "AI engineer Pakistan",
    "Next.js developer",
    "Robotics AI",
    "RAG systems",
  ],
  authors: [{ name: "Syed Mujtaba Abbas" }],
  creator: "Syed Mujtaba Abbas",
  openGraph: {
    type: "website",
    locale: "en_PK",
    title: "Syed Mujtaba Abbas — Software Engineer & Agentic AI Developer",
    description:
      "Full-stack engineering, agentic AI, and robotics — thoughtfully built in Karachi, Pakistan.",
    siteName: "Syed Mujtaba Abbas",
    ...(socialImageUrl
      ? {
          images: [
            {
              url: socialImageUrl,
              width: 1200,
              height: 630,
              alt: "Syed Mujtaba Abbas — Software Engineer and Agentic AI Developer",
            },
          ],
        }
      : {}),
  },
  twitter: {
    card: "summary_large_image",
    title: "Syed Mujtaba Abbas — Software Engineer & Agentic AI Developer",
    description:
      "Full-stack engineering, agentic AI, and robotics — thoughtfully built in Karachi, Pakistan.",
    ...(socialImageUrl ? { images: [socialImageUrl] } : {}),
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
