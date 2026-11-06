import type { Metadata } from "next";
import localFont from "next/font/local";
import "../styles/kumo.css";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import MinimalLayout from "@/components/layout/MinimalLayout";
import { Analytics } from "@vercel/analytics/next";

const portfolioSans = localFont({src:"./fonts/FigtreeVariable.woff2", variable:"--font-portfolio",weight:"300 900",display:"swap"});
const manrope = localFont({src:"./fonts/ManropeVariable.woff2",variable:"--font-manrope",weight:"200 800",display:"swap"});
const devanagari = localFont({src:"./fonts/NotoSansDevanagari.woff2",variable:"--font-devanagari",display:"swap"});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://github.com/ameya2401"),
  title: "Ameya Bhagat · Backend & Systems Engineer",
  description:
    "Backend & Systems Engineer. Experienced in Python, SQL, full-stack development, applied AI systems, and database-driven architecture.",
  openGraph: {
    title: "Ameya Bhagat · Backend & Systems Engineer",
    description:
      "Backend & Systems Engineer. Experienced in Python, SQL, full-stack development, applied AI systems, and database-driven architecture.",
    type: "website",
    url: "https://github.com/ameya2401",
    siteName: "Ameya Bhagat",
  },
  twitter: {
    card: "summary_large_image",
    site: "@notbakkro",
    creator: "@notbakkro",
    title: "Ameya Bhagat · Backend & Systems Engineer",
    description:
      "Backend & Systems Engineer. Experienced in Python, SQL, full-stack development, applied AI systems, and database-driven architecture.",
  },
};

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#faf8f3" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${portfolioSans.variable} ${manrope.variable} ${devanagari.variable}`}
      suppressHydrationWarning
    >
      <head>{/* Fonts are bundled locally to avoid external requests. */}</head>
      <body className="font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
        >
          <MinimalLayout>{children}</MinimalLayout>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
