import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({ variable: "--font-geist", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "I Vend Station | Everyday Convenience",
  description: "Drinks, snacks, and everyday essentials—right where you need them.",
  openGraph: {
    title: "I Vend Station",
    description: "Good things. Right where you are.",
    images: [{ url: "/og.png", width: 1733, height: 909, alt: "I Vend Station vending catalogue" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "I Vend Station",
    description: "Good things. Right where you are.",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={geist.variable}>{children}</body></html>;
}
