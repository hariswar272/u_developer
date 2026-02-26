import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kotte Mohan Krishna | Full-Stack Web Developer",
  description:
    "Portfolio of Kotte Mohan Krishna — a passionate full-stack web developer specializing in modern web technologies, building performant and beautiful digital experiences.",
  keywords: [
    "Kotte Mohan Krishna",
    "Full-Stack Developer",
    "Web Developer",
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "Portfolio",
  ],
  authors: [{ name: "Kotte Mohan Krishna" }],
  openGraph: {
    title: "Kotte Mohan Krishna | Full-Stack Web Developer",
    description:
      "Portfolio of Kotte Mohan Krishna — a passionate full-stack web developer specializing in modern web technologies.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kotte Mohan Krishna | Full-Stack Web Developer",
    description:
      "Portfolio of Kotte Mohan Krishna — a passionate full-stack web developer specializing in modern web technologies.",
  },
  robots: {
    index: true,
    follow: true,
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
        className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
