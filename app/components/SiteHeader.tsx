"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import styles from "./site-header.module.css";

const links = [
  { label: "Store", href: "/store" },
  { label: "Machines", href: "/machines" },
  { label: "Cashless Device", href: "/products/t05-cashless-device" },
  { label: "About Us", href: "/#about" },
  { label: "FAQ", href: "/#faq" },
  { label: "Contact", href: "/#contact" },
];

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  const isCurrent = (href: string) => {
    if (href.includes("#")) return false;
    if (href === "/machines") return pathname === "/machines" || pathname.startsWith("/machines/");
    return pathname === href;
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
        <Link className={styles.logo} href="/" aria-label="I Vend Station home" onClick={() => setOpen(false)}>
          <img src="/i-vend-station-logo.png" alt="I Vend Station" />
        </Link>

        <nav className={styles.desktopNav} aria-label="Main navigation">
          {links.map((link) => <Link key={link.label} href={link.href} aria-current={isCurrent(link.href) ? "page" : undefined}>{link.label}</Link>)}
        </nav>

        <div className={styles.actions}>
          <Link className={styles.account} href="/account"><span className={styles.accountLong}>Sign in / Account</span><span className={styles.accountShort}>Account</span></Link>
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
            <Link ref={index === 0 ? firstLinkRef : undefined} key={link.label} href={link.href} aria-current={isCurrent(link.href) ? "page" : undefined} onClick={() => setOpen(false)}><small>{String(index + 1).padStart(2, "0")}</small>{link.label}<span aria-hidden="true">&rarr;</span></Link>
          ))}
        </nav>
        <Link className={styles.mobileAccount} href="/account" onClick={() => setOpen(false)}>Sign in or open your account <span aria-hidden="true">&rarr;</span></Link>
      </div>
      {open ? <button className={styles.backdrop} type="button" aria-label="Close menu" onClick={() => setOpen(false)} /> : null}
    </header>
  );
}
