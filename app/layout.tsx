import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({ variable: "--font-geist", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "I Vend Station | Vending Machines & Cashless Payments",
  description: "Japanese hot and cold coffee machines, TCN vending machines, and T05 cashless payment solutions.",
  openGraph: {
    title: "I Vend Station",
    description: "Vending machines. Coffee systems. Cashless payments.",
    images: [{ url: "/og-machines.png", width: 1536, height: 1024, alt: "I Vend Station vending machines, coffee systems, and cashless payments" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "I Vend Station",
    description: "Vending machines. Coffee systems. Cashless payments.",
    images: ["/og-machines.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={geist.variable}>{children}</body></html>;
}
