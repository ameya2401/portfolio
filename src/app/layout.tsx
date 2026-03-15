import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import CursorCat from "@/components/CursorCat";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ameya Bhagat | Full-Stack Developer",
  description:
    "Portfolio of Ameya Sanjay Bhagat — full-stack developer focused on scalable web systems, AI-powered products, and data-driven engineering.",
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        suppressHydrationWarning
        className={`${inter.variable} antialiased font-sans`}
      >
        {children}
        <CursorCat />
      </body>
    </html>
  );
}
