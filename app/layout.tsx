import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Common Ground — Same moment. Different maps.",
  description: "An interactive experiment about how communication differences become conflict—and how clarity helps.",
  openGraph: {
    title: "Common Ground",
    description: "Same moment. Different maps.",
    images: [{ url: "/og.png", width: 1536, height: 1024, alt: "Common Ground interactive experience" }],
  },
  twitter: { card: "summary_large_image", title: "Common Ground", description: "Same moment. Different maps.", images: ["/og.png"] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={`${geistSans.variable} ${geistMono.variable}`}>{children}</body></html>;
}
