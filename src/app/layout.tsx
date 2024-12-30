import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";
import ParticlesComponent from "@/components/particles";

export const metadata: Metadata = {
  title: "Hi, I’m Paul",
  description:
    "Paul is a software engineer who thrives on learning, building and leading high-performance teams.",
  keywords:
    "Software Engineer, Paul Morar, Paul, Morar, PaulMorar, Paul Morar Software Engineer, Paul Morar Software Engineer",
  openGraph: {
    title: "Hi, I’m Paul",
    siteName: "Hi, I’m Paul",
    description:
      "Paul is a software engineer who thrives on learning, building and leading high-performance teams.",
    type: "website",
    url: "https://paulmorar.com",
    locale: "en_US",
  },
  twitter: {
    creator: "@paulmorar",
    site: "@paulmorar",
    card: "summary_large_image",
  },
  robots: "follow, index",
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
