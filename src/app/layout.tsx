import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nexovate — Learn What Comes Next",
  description:
    "Nexovate helps students build future-ready technology skills, create real projects and prepare for what's next.",
  keywords: [
    "Nexovate",
    "EdTech",
    "Technology Education",
    "Practical Learning",
    "Artificial Intelligence",
    "Data Science",
    "Full Stack Development",
    "Cloud Computing",
    "Cybersecurity",
    "Future Skills",
  ],
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-48x48.png", sizes: "48x48", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "android-chrome-192x192",
        url: "/android-chrome-192x192.png",
      },
      {
        rel: "android-chrome-512x512",
        url: "/android-chrome-512x512.png",
      },
    ],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: "Nexovate — Learn What Comes Next",
    description:
      "Nexovate helps students build future-ready technology skills, create real projects and prepare for what's next.",
    url: "https://nexovate.tech",
    siteName: "Nexovate",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${plusJakartaSans.variable} font-sans antialiased bg-[#FAFBFC] text-[#101536]`}
    >
      <body
        suppressHydrationWarning
        className="min-h-screen bg-[#FAFBFC] text-[#101536] flex flex-col font-sans selection:bg-[#119E9D]/15 selection:text-[#101536]"
      >
        {children}
      </body>
    </html>
  );
}
