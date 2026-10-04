import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";
import ThemeProvider from "@/components/ThemeProvider";
import SmoothScroll from "@/components/SmoothScroll";
import { site } from "@/lib/data";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

const siteUrl = "https://www.ilyankhan.tech";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Ilyan Khan — Software Developer & AI Engineer",
  description:
    "Portfolio of Ilyan Khan — Computer Systems Engineering student at QUEST Nawabshah specializing in GenAI integration, real-time NLP pipelines, LoRA fine-tuning, and clean Next.js/React full-stack web engineering.",
  keywords: [
    "Ilyan Khan",
    "AI Engineer Pakistan",
    "GenAI Developer",
    "LoRA Fine-Tuning",
    "RAG FAISS LangChain",
    "Next.js Developer",
    "QUEST Nawabshah",
    "Machine Learning Engineer",
  ],
  authors: [{ name: site.name }],
  alternates: { canonical: siteUrl },
  openGraph: {
    title: "Ilyan Khan — Software Developer & AI Engineer",
    description:
      "Software Developer & AI Engineer. Real-time NLP pipelines, LoRA fine-tuning, RAG architectures & high-speed full-stack web applications.",
    url: siteUrl,
    siteName: "Ilyan Khan — Portfolio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ilyan Khan — Software Developer & AI Engineer",
    description:
      "Software Developer & AI Engineer specializing in GenAI integration, RAG pipelines, and full-stack engineering.",
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  jobTitle: "Software Developer & AI Engineer",
  url: siteUrl,
  email: `mailto:${site.email}`,
  sameAs: [site.github, site.linkedin, site.huggingface],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body className="font-body antialiased selection:bg-accent selection:text-bg">
        <ThemeProvider>
          <SmoothScroll>{children}</SmoothScroll>
        </ThemeProvider>
        <GoogleAnalytics gaId="G-SYC3BYGN7J" />
      </body>
    </html>
  );
}
