import type { Metadata } from "next";
import { Inter, Cairo, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  variable: "--font-cairo",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "WeDev — Solutions Digitales Premium",
    template: "%s | WeDev",
  },
  description:
    "WeDev — Logiciels métier sur mesure : POS, CRM, ERP, E-learning. Solutions testées et supportées au Maroc.",
  keywords: ["logiciel", "POS", "CRM", "ERP", "Maroc", "développeur", "SaaS"],
  authors: [{ name: "WeDev" }],
  openGraph: {
    type: "website",
    siteName: "WeDev",
    title: "WeDev — Solutions Digitales Premium",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      suppressHydrationWarning
      className={`${inter.variable} ${cairo.variable} ${spaceGrotesk.variable}`}
    >
      <body className="min-h-screen bg-[hsl(var(--background))] text-[hsl(var(--foreground))] antialiased transition-colors duration-300">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange={false}
          storageKey="wedev-theme"
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
