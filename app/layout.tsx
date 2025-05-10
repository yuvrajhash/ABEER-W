import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import './tailwind.css';
import './globals.css';
import './styles/medical-theme.css';
import './styles/medical-icons.css';
import './styles/contrast.css';
import './styles/card-visibility-fix.css';
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Analytics } from "./components/Analytics";
import ThemeAnimations from "./components/ThemeAnimations";

import { Poppins, Montserrat, Inter, Open_Sans, Roboto } from "next/font/google";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
  }
};

export const viewport: Viewport = {
  themeColor: "#0A5F55",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="msapplication-TileColor" content="#0A5F55" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} ${montserrat.variable} ${inter.variable} ${openSans.variable} ${roboto.variable} antialiased`}
      >
        <Navbar />
        <main className="min-h-screen pt-16">
          {children}
        </main>
        <Footer />
        <Analytics />
        <ThemeAnimations />
      </body>
    </html>
  );
}
