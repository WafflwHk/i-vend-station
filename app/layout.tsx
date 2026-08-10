import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import "./corrections.css";

const geist = Geist({ variable: "--font-geist", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "I Vend Station | Vending Machines & Cashless Payments",
  description: "Browse Japanese coffee machines, TCN vending machine models, and the T05 cashless payment add-on.",
  openGraph: {
    title: "I Vend Station",
    description: "Vending machines. Coffee systems. Cashless payments.",
    images: [{ url: "/og-t05-correct.png", width: 1536, height: 1024, alt: "I Vend Station vending machine range with the actual grey T05 cashless device" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "I Vend Station",
    description: "Vending machines. Coffee systems. Cashless payments.",
    images: ["/og-t05-correct.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={geist.variable}>{children}</body></html>;
}
