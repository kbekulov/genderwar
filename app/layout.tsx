import type { Metadata } from "next";
import { Geist_Mono, Nunito } from "next/font/google";
import "./globals.css";

const nunito = Nunito({ variable: "--font-nunito", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Gender War — Choose your experience",
  description: "An interactive story about the male and female experience in a changing society.",
  openGraph: {
    title: "Gender War",
    description: "Choose a side. Understand both.",
    url: "https://genderwar.bekulov.com/",
    images: [{ url: "https://genderwar.bekulov.com/og-gender-war-professional.png", width: 1536, height: 1024, alt: "Gender War interactive story" }],
  },
  twitter: { card: "summary_large_image", title: "Gender War", description: "Choose a side. Understand both.", images: ["https://genderwar.bekulov.com/og-gender-war-professional.png"] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={`${nunito.variable} ${geistMono.variable}`}>{children}</body></html>;
}
