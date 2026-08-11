import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import "./corrections.css";
import "./storefront.css";
import "./mobile.css";
import "./motion.css";
import "./theme.css";
import SiteHeader from "./components/SiteHeader";
import ScrollMotion from "./components/ScrollMotion";

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

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

const appearanceBootstrap = `
  (() => {
    const root = document.documentElement;
    const storageKey = "ivend-appearance";
    const valid = new Set(["system", "light", "dark"]);
    let appearance = "system";

    try {
      const saved = window.localStorage.getItem(storageKey);
      if (saved && valid.has(saved)) appearance = saved;
    } catch {}

    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const resolved = appearance === "system" ? (prefersDark ? "dark" : "light") : appearance;
    root.dataset.appearance = appearance;
    root.dataset.theme = resolved;
    root.style.colorScheme = resolved;

    const themeColor = document.getElementById("ivend-theme-color");
    if (themeColor) themeColor.setAttribute("content", resolved === "dark" ? "#080a0e" : "#f5f5f7");
  })();
`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta id="ivend-theme-color" name="theme-color" content="#f5f5f7" />
        <script dangerouslySetInnerHTML={{ __html: appearanceBootstrap }} />
      </head>
      <body className={geist.variable}><SiteHeader /><ScrollMotion />{children}</body>
    </html>
  );
}
