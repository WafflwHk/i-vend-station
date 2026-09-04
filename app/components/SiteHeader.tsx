"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import styles from "./site-header.module.css";
import { IVEND_RELEASE_STATUS } from "../config/site";
import { navigationLinks as links } from "../data/navigation";
import SiteSearch from "./SiteSearch";

type Appearance = "system" | "light" | "dark";

const appearanceStorageKey = "ivend-appearance";
const appearanceOptions: ReadonlyArray<{ value: Appearance; label: string }> = [
  { value: "system", label: "System" },
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
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
    const closeForAssistant = () => setOpen(false);
    window.addEventListener("ivend-assistant-open", closeForAssistant);
    return () => window.removeEventListener("ivend-assistant-open", closeForAssistant);
  }, []);

  const toggleMenu = () => {
    if (!open) window.dispatchEvent(new Event("ivend-navigation-open"));
    setOpen((current) => !current);
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
        <div className={styles.brandGroup}>
          <div className={styles.brandTopline}>
            <a className={styles.logo} href="/" aria-label="I Vend Station home" onClick={() => setOpen(false)}>
              <img src="/i-vend-station-logo.png" alt="I Vend Station" />
            </a>
            {IVEND_RELEASE_STATUS === "Beta" ? <span className={styles.releaseBadge} title="Website under active development">{IVEND_RELEASE_STATUS}</span> : null}
          </div>
          <span className={styles.tagline} lang="ja">アイ・ヴェンド・ステーション</span>
        </div>

        <nav className={styles.desktopNav} aria-label="Main navigation">
          {links.map((link) => <a key={link.label} href={link.href} aria-current={isCurrent(link.href) ? "page" : undefined}>{link.label}</a>)}
        </nav>

        <div className={styles.actions}>
          <div className={styles.desktopAppearance}>
            <AppearanceControl appearance={appearance} onChange={chooseAppearance} />
          </div>
          <SiteSearch onOpen={() => setOpen(false)} />
          <a className={styles.account} href="/account" aria-label="Sign in or open your account" title="Sign in / Account">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false"><circle cx="12" cy="8" r="3.5" /><path d="M5 20v-1a7 7 0 0 1 14 0v1" /></svg>
          </a>
          <button
            ref={menuButtonRef}
            className={styles.menuButton}
            type="button"
            aria-expanded={open}
            aria-controls="mobile-site-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={toggleMenu}
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
        <a className={styles.mobileAccount} href="/account" onClick={() => setOpen(false)}>Sign in or open your account <span aria-hidden="true">&rarr;</span></a>
      </div>
      {open ? <button className={styles.backdrop} type="button" aria-label="Close menu" onClick={() => setOpen(false)} /> : null}
    </header>
  );
}
