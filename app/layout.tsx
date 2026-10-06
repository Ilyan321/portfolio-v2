import type { Metadata, Viewport } from "next";
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

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#090a0f" },
    { media: "(prefers-color-scheme: dark)", color: "#090a0f" },
  ],
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Ilyan Khan — Software Developer & AI Engineer",
    template: "%s | Ilyan Khan",
  },
  description:
    "Portfolio of Ilyan Khan — Computer Systems Engineering student at QUEST Nawabshah specializing in GenAI integration, real-time NLP pipelines, LoRA fine-tuning, and clean Next.js/React full-stack web engineering.",
  keywords: [
    "Ilyan Khan",
    "Software Developer",
    "AI Engineer",
    "GenAI Specialist",
    "LoRA Fine-Tuning",
    "QLoRA",
    "RAG FAISS LangChain",
    "Next.js Developer",
    "React Developer",
    "Full-Stack Developer",
    "QUEST Nawabshah",
    "Machine Learning Engineer",
    "PyTorch Python",
  ],
  authors: [{ name: site.name, url: siteUrl }],
  creator: site.name,
  publisher: site.name,
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.svg", sizes: "any" },
    ],
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title: "Ilyan Khan — Software Developer & AI Engineer",
    description:
      "Software Developer & AI Engineer specializing in GenAI integration, real-time NLP pipelines, LoRA fine-tuning, RAG architectures & high-speed full-stack web applications.",
    url: siteUrl,
    siteName: "Ilyan Khan — Portfolio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Ilyan Khan — Software Developer & AI Engineer Portfolio",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ilyan Khan — Software Developer & AI Engineer",
    description:
      "Software Developer & AI Engineer specializing in GenAI integration, real-time NLP pipelines, LoRA fine-tuning, RAG architectures & full-stack web applications.",
    images: ["/og-image.png"],
    creator: "@ilyankhan",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "technology",
};

const jsonLdData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${siteUrl}/#person`,
      name: site.name,
      jobTitle: "Software Developer & AI Engineer",
      url: siteUrl,
      image: `${siteUrl}/Avatar.png`,
      email: `mailto:${site.email}`,
      telephone: site.phone,
      sameAs: [site.github, site.linkedin, site.huggingface],
      description: site.about,
      knowsAbout: [
        "Generative AI",
        "LoRA / QLoRA Fine-Tuning",
        "Retrieval-Augmented Generation (RAG)",
        "Natural Language Processing",
        "Next.js",
        "React",
        "TypeScript",
        "Python",
        "PyTorch",
        "LangChain",
        "FastAPI",
        "PostgreSQL",
      ],
      alumniOf: {
        "@type": "EducationalOrganization",
        name: "Quaid-e-Awam University of Engineering, Science & Technology (QUEST), Nawabshah",
      },
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "Ilyan Khan — Portfolio",
      publisher: {
        "@id": `${siteUrl}/#person`,
      },
      inLanguage: "en-US",
    },
  ],
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
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="alternate icon" href="/favicon.svg" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
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

