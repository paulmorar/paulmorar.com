import type { Metadata, Viewport } from "next";
import { Caveat, DM_Sans, JetBrains_Mono } from "next/font/google";
import { site } from "@/lib/site";
import { JsonLd, personSchema, websiteSchema } from "@/lib/seo";
import { PageTransition } from "@/components/page-transition";
import "./globals.css";

const display = Caveat({
  subsets: ["latin"],
  variable: "--font-display-base",
  weight: ["400", "600", "700"],
  display: "swap",
});

const sans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans-base",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono-base",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.title,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.name,
  keywords: [...site.keywords],
  category: "technology",
  alternates: {
    canonical: site.url,
    types: {
      "application/rss+xml": [
        { url: "/writing/rss.xml", title: `${site.name} — Writing` },
      ],
    },
  },
  openGraph: {
    title: site.title,
    description: site.description,
    url: site.url,
    siteName: site.name,
    type: "website",
    locale: site.locale,
  },
  twitter: {
    card: "summary_large_image",
    creator: site.social.xHandle,
    site: site.social.xHandle,
    title: site.title,
    description: site.description,
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
  manifest: "/manifest.webmanifest",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FEFDF8" },
    { media: "(prefers-color-scheme: dark)", color: "#1B1B1F" },
  ],
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en-GB"
      className={`${display.variable} ${sans.variable} ${mono.variable}`}
    >
      <body>
        <JsonLd data={personSchema} />
        <JsonLd data={websiteSchema} />
        <PageTransition />
        {children}
      </body>
    </html>
  );
}
