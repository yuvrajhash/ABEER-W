import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import './tailwind.css';
import './globals.css';
import './styles/responsive-fixes.css';
import './styles/responsive-animations.css';
import './styles/responsive-utilities.css';
import './styles/touch-interactions.css';
import './styles/medical-theme.css';
import './styles/medical-icons.css';
import './styles/contrast.css';
import './styles/card-visibility-fix.css';
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Analytics } from "./components/Analytics";
import ThemeAnimations from "./components/ThemeAnimations";
import ResponsiveHandler from "./components/ResponsiveHandler";
import PerformanceOptimizer from "./components/PerformanceOptimizer";

import { Poppins, Montserrat, Inter, Open_Sans, Roboto } from "next/font/google";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: 'swap',
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: 'swap',
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: 'swap',
});

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
  display: 'swap',
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: 'swap',
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "AIPL Group | Premium Pharmaceutical Products",
  description: "Your trusted partner in healthcare, providing premium pharmaceutical products for humans and animals.",
  keywords: ["pharmaceutical", "healthcare", "medicine", "veterinary", "AIPL", "Vetonovia", "health products"],
  authors: [{ name: "AIPL Group" }],
  creator: "AIPL Group",
  publisher: "AIPL Group",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "AIPL Group | Premium Pharmaceutical Products",
    description: "Your trusted partner in healthcare, providing premium pharmaceutical products for humans and animals.",
    url: "https://AIPLgroup.com",
    siteName: "AIPL Group",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AIPL Group | Premium Pharmaceutical Products",
    description: "Your trusted partner in healthcare, providing premium pharmaceutical products for humans and animals.",
    creator: "@AIPLgroup",
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" }
    ],
    apple: [
      { url: "/favicon.svg", type: "image/svg+xml" }
    ],
    other: [
      { rel: "manifest", url: "/site.webmanifest" }
    ]
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "AIPL Group"
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  minimumScale: 1,
  userScalable: true,
  viewportFit: "cover",
  themeColor: "#0A5F55",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full scroll-smooth">
      <head>
        <meta name="msapplication-TileColor" content="#0A5F55" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="format-detection" content="telephone=no" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        
        {/* Additional meta tags for responsive design */}
        <meta name="theme-color" content="#0A5F55" />
        <meta name="color-scheme" content="light" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="application-name" content="AIPL Group" />
        
        {/* DNS Prefetch for performance */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        
        {/* Preconnect for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} ${montserrat.variable} ${inter.variable} ${openSans.variable} ${roboto.variable} antialiased min-h-full`}
      >
        <ResponsiveHandler />
        <PerformanceOptimizer />
        <Navbar />
        <main id="main-content" className="min-h-screen pt-16 sm:pt-20">
          {children}
        </main>
        <Footer />
        <Analytics />
        <ThemeAnimations />
        
        {/* Skip to content link for accessibility */}
        <a href="#main-content" className="skip-link">Skip to main content</a>
      </body>
    </html>
  );
}
