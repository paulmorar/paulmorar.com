import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";
import ParticlesComponent from "@/components/particles";

export const metadata: Metadata = {
  title: "paulmorar.com",
  description: "Need help driving your next project to the next level?",
  keywords:
    "Software Engineer, Paul Morar, Paul, Morar, PaulMorar, Paul Morar Software Engineer, Paul Morar Software Engineer",
  openGraph: {
    title: "Hi, I’m Paul",
    siteName: "paulmorar.com",
    description: "Need help driving your next project to the next level?",
    type: "website",
    url: "https://paulmorar.com",
    locale: "en_US",
    images: [
      {
        url: "/web-social.png",
      },
    ],
  },
  twitter: {
    creator: "@paulmorar",
    site: "@paulmorar",
    card: "summary_large_image",
    images: "/web-social.png",
  },
  robots: "follow, index",
  manifest: "/manifest.webmanifest",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <ParticlesComponent />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
