"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useCartLines } from "./cart-store";
import styles from "./site-header.module.css";

type Appearance = "system" | "light" | "dark";

const appearanceStorageKey = "ivend-appearance";
const appearanceOptions: ReadonlyArray<{ value: Appearance; label: string }> = [
  { value: "system", label: "System" },
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
];

const links = [
  { label: "Store", href: "/store" },
  { label: "Machines", href: "/machines" },
  { label: "Cashless Device", href: "/products/t05-cashless-device" },
  { label: "About Us", href: "/#about" },
  { label: "FAQ", href: "/#faq" },
  { label: "Contact", href: "/#contact" },
];

const normaliseAppearance = (value: string | null | undefined): Appearance => (
  value === "light" || value === "dark" || value === "system" ? value : "system"
);

const applyAppearance = (appearance: Appearance) => {
  const resolved = appearance === "system"
    ? (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
    : appearance;
  const root = document.documentElement;
  root.dataset.appearance = appearance;
  root.dataset.theme = resolved;
  root.style.colorScheme = resolved;
  const themeColor = document.getElementById("ivend-theme-color");
  themeColor?.setAttribute("content", resolved === "dark" ? "#080a0e" : "#f5f5f7");
};

function AppearanceControl({ appearance, onChange }: { appearance: Appearance; onChange: (next: Appearance) => void }) {
  return (
    <div className={styles.appearanceControl} role="group" aria-label="Website appearance">
      {appearanceOptions.map((option) => (
        <button
          key={option.value}
          type="button"
          aria-pressed={appearance === option.value}
          onClick={() => onChange(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [appearance, setAppearance] = useState<Appearance>("system");
  const cartLines = useCartLines();
  const cartCount = cartLines.reduce((total, line) => total + line.quantity, 0);
  const pathname = usePathname();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  const isCurrent = (href: string) => {
    if (href.includes("#")) return false;
    if (href === "/machines") return pathname === "/machines" || pathname.startsWith("/machines/");
    return pathname === href;
  };

  useEffect(() => {
    const initialAppearance = normaliseAppearance(document.documentElement.dataset.appearance);
    applyAppearance(initialAppearance);
    const stateFrame = window.requestAnimationFrame(() => setAppearance(initialAppearance));

    const preference = window.matchMedia("(prefers-color-scheme: dark)");
    const syncSystemAppearance = () => {
      const current = normaliseAppearance(document.documentElement.dataset.appearance);
      if (current === "system") applyAppearance(current);
    };
    const syncStoredAppearance = (event: StorageEvent) => {
      if (event.key !== appearanceStorageKey && event.key !== null) return;
      const next = normaliseAppearance(event.newValue);
      setAppearance(next);
      applyAppearance(next);
    };

    preference.addEventListener("change", syncSystemAppearance);
    window.addEventListener("storage", syncStoredAppearance);
    return () => {
      window.cancelAnimationFrame(stateFrame);
      preference.removeEventListener("change", syncSystemAppearance);
      window.removeEventListener("storage", syncStoredAppearance);
    };
  }, []);

  const chooseAppearance = (next: Appearance) => {
    setAppearance(next);
    applyAppearance(next);
    try {
      window.localStorage.setItem(appearanceStorageKey, next);
    } catch {
      // The selected appearance still applies for this page when storage is unavailable.
    }
  };

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusFrame = window.requestAnimationFrame(() => firstLinkRef.current?.focus());
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    const closeOnDesktop = () => {
      if (window.innerWidth > 880) setOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    window.addEventListener("resize", closeOnDesktop);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.cancelAnimationFrame(focusFrame);
      window.removeEventListener("keydown", closeOnEscape);
      window.removeEventListener("resize", closeOnDesktop);
    };
  }, [open]);

  return (
    <header className={styles.header}>
      <div className={styles.bar}>
        <a className={styles.logo} href="/" aria-label="I Vend Station home" onClick={() => setOpen(false)}>
          <img src="/i-vend-station-logo.png" alt="I Vend Station" />
        </a>

        <nav className={styles.desktopNav} aria-label="Main navigation">
          {links.map((link) => <a key={link.label} href={link.href} aria-current={isCurrent(link.href) ? "page" : undefined}>{link.label}</a>)}
        </nav>

        <div className={styles.actions}>
          <div className={styles.desktopAppearance}>
            <AppearanceControl appearance={appearance} onChange={chooseAppearance} />
          </div>
          <a
            className={styles.cart}
            href="/cart"
            aria-current={pathname === "/cart" ? "page" : undefined}
            aria-label={`Shopping cart, ${cartCount} ${cartCount === 1 ? "item" : "items"}`}
          >
            <span className={styles.cartBag} aria-hidden="true" />
            <span className={styles.cartText}>Cart</span>
            <b aria-hidden="true">{cartCount > 99 ? "99+" : cartCount}</b>
          </a>
          <a className={styles.account} href="/account"><span className={styles.accountLong}>Sign in / Account</span><span className={styles.accountShort}>Account</span></a>
          <button
            ref={menuButtonRef}
            className={styles.menuButton}
            type="button"
            aria-expanded={open}
            aria-controls="mobile-site-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((current) => !current)}
          >
            <span /><span />
          </button>
        </div>
      </div>

      <div className={`${styles.mobilePanel} ${open ? styles.mobilePanelOpen : ""}`} id="mobile-site-menu" aria-hidden={!open} inert={!open}>
        <nav aria-label="Mobile navigation">
          {links.map((link, index) => (
            <a ref={index === 0 ? firstLinkRef : undefined} key={link.label} href={link.href} aria-current={isCurrent(link.href) ? "page" : undefined} onClick={() => setOpen(false)}><small>{String(index + 1).padStart(2, "0")}</small>{link.label}<span aria-hidden="true">&rarr;</span></a>
          ))}
        </nav>
        <div className={styles.mobileAppearance}>
          <span>Appearance</span>
          <AppearanceControl appearance={appearance} onChange={chooseAppearance} />
        </div>
        <a className={styles.mobileCart} href="/cart" onClick={() => setOpen(false)}>Shopping cart <span>{cartCount} {cartCount === 1 ? "item" : "items"} <i aria-hidden="true">&rarr;</i></span></a>
        <a className={styles.mobileAccount} href="/account" onClick={() => setOpen(false)}>Sign in or open your account <span aria-hidden="true">&rarr;</span></a>
      </div>
      {open ? <button className={styles.backdrop} type="button" aria-label="Close menu" onClick={() => setOpen(false)} /> : null}
    </header>
  );
}
