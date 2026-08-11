import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import "./corrections.css";
import "./storefront.css";
import "./mobile.css";
import "./motion.css";
import "./theme.css";
import "./home-refresh.css";
import SiteHeader from "./components/SiteHeader";
import ScrollMotion from "./components/ScrollMotion";
import LoadingScreen from "./components/LoadingScreen";

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
    const splashStorageKey = "ivend-loader-seen";
    const valid = new Set(["system", "light", "dark"]);
    let appearance = "system";
    let splash = "show";

    try {
      const saved = window.localStorage.getItem(storageKey);
      if (saved && valid.has(saved)) appearance = saved;
    } catch {}

    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    try {
      if (window.sessionStorage.getItem(splashStorageKey) === "true") splash = "skip";
    } catch {}
    if (reducedMotion) splash = "skip";

    const resolved = appearance === "system" ? (prefersDark ? "dark" : "light") : appearance;
    root.dataset.appearance = appearance;
    root.dataset.theme = resolved;
    root.dataset.splash = splash;
    if (splash === "show") root.dataset.splashStartedAt = String(performance.now());
    root.style.colorScheme = resolved;

    if (splash === "show") {
      root.style.overflow = "hidden";
      window.setTimeout(() => {
        if (root.dataset.splash !== "show" && root.dataset.splash !== "leaving") return;
        root.dataset.splash = "expired";
        root.style.removeProperty("overflow");
        document.body?.style.removeProperty("overflow");
        const shell = document.getElementById("site-shell");
        if (shell) {
          shell.inert = false;
          shell.removeAttribute("inert");
          shell.removeAttribute("aria-hidden");
        }
      }, 2800);
    }

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
        <noscript><style>{`[data-loading-screen]{display:none!important}`}</style></noscript>
      </head>
      <body className={geist.variable}>
        <LoadingScreen />
        <div id="site-shell"><SiteHeader /><ScrollMotion />{children}</div>
      </body>
    </html>
  );
}
