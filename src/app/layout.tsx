import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Matt Vinall · Full-Stack AI Engineer",
  description:
    "Building AI products that ship, from prompt to production. 8 years of full-stack engineering, currently shipping AI agents.",
  metadataBase: new URL("https://matt-dev.vercel.app"),
  openGraph: {
    title: "Matt Vinall · Full-Stack AI Engineer",
    description: "Building AI products that ship, from prompt to production.",
    url: "https://matt-dev.vercel.app",
    siteName: "Matt Vinall",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Matt Vinall · Full-Stack AI Engineer",
    description: "Building AI products that ship, from prompt to production.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable}`}
    >
      <body className="bg-bg text-text antialiased">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
