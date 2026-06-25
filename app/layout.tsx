import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickyCalculatorCTA from "@/components/StickyCalculatorCTA";
import AffiliateClickTracker from "@/components/AffiliateClickTracker";

export const metadata: Metadata = {
  title: {
    default: "PetCost – Know the Real Cost Before You Commit",
    template: "%s | PetCost",
  },
  description:
    "The most comprehensive pet cost calculator online. Calculate first-year costs, lifetime ownership costs, and breed-specific expenses for 300+ dog and cat breeds.",
  keywords: ["pet cost calculator", "dog cost calculator", "cat cost calculator", "pet ownership cost", "how much does a dog cost"],
  authors: [{ name: "PetCost" }],
  creator: "PetCost",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://petcost-calculator.com",
    siteName: "PetCost",
    title: "PetCost – Know the Real Cost Before You Commit",
    description: "Calculate the real cost of pet ownership. First-year costs, lifetime expenses, breed comparisons, and personalised budgets.",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "PetCost – Know the Real Cost Before You Commit",
    description: "Calculate the real cost of pet ownership. First-year costs, lifetime expenses, breed comparisons, and personalised budgets.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  metadataBase: new URL("https://petcost-calculator.com"),
  other: {
    "fo-verify": "64400e6a-c9d5-4704-b600-fbacddd3ad6f",
  },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? "G-XXXXXXXXXX";
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" />
        {/* Google AdSense */}
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3275113356221002" crossOrigin="anonymous" />
        {/* Google Analytics 4 */}
        <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_ID}', { page_path: window.location.pathname });
            `,
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-white antialiased">
        {/* Hidden forms for Netlify Forms detection */}
        <form name="email-subscribe" data-netlify="true" hidden>
          <input type="email" name="email" />
          <input type="hidden" name="source" />
        </form>
        <form name="contact" data-netlify="true" hidden>
          <input type="text" name="name" />
          <input type="email" name="email" />
          <input type="text" name="topic" />
          <textarea name="message" />
        </form>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <StickyCalculatorCTA />
        <AffiliateClickTracker />
      </body>
    </html>
  );
}