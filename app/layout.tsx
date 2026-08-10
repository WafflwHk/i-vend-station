import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import "./corrections.css";
import "./storefront.css";
import SiteHeader from "./components/SiteHeader";

const geist = Geist({ variable: "--font-geist", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "I Vend Station | Vending Machines & Cashless Payments",
  description: "Browse Japanese coffee machines, TCN vending machine models, and the T05 cashless payment add-on.",
  icons: {
    icon: [{ url: "/i-vend-station-icon.png", type: "image/png", sizes: "512x512" }],
    apple: [{ url: "/i-vend-station-icon.png", type: "image/png", sizes: "512x512" }],
  },
  openGraph: {
    title: "I Vend Station",
    description: "Vending machines. Coffee systems. Cashless payments.",
    images: [{ url: "/og-i-vend-station.png", width: 1536, height: 1024, alt: "I Vend Station logo with vending machines and the actual grey T05 cashless device" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "I Vend Station",
    description: "Vending machines. Coffee systems. Cashless payments.",
    images: ["/og-i-vend-station.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={geist.variable}><SiteHeader />{children}</body></html>;
}
