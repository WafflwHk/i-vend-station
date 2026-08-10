"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
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

  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [open]);

  return (
    <header className={styles.header}>
      <div className={styles.bar}>
        <Link className={styles.logo} href="/" aria-label="I Vend Station home" onClick={() => setOpen(false)}>
          <img src="/i-vend-station-logo.png" alt="I Vend Station" />
        </Link>

        <nav className={styles.desktopNav} aria-label="Main navigation">
          {links.map((link) => <Link key={link.label} href={link.href}>{link.label}</Link>)}
        </nav>

        <div className={styles.actions}>
          <Link className={styles.account} href="/account"><span className={styles.accountLong}>Sign in / Account</span><span className={styles.accountShort}>Account</span></Link>
          <button
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

      <div className={`${styles.mobilePanel} ${open ? styles.mobilePanelOpen : ""}`} id="mobile-site-menu">
        <nav aria-label="Mobile navigation">
          {links.map((link, index) => (
            <Link key={link.label} href={link.href} onClick={() => setOpen(false)}><small>{String(index + 1).padStart(2, "0")}</small>{link.label}<span aria-hidden="true">&rarr;</span></Link>
          ))}
        </nav>
        <Link className={styles.mobileAccount} href="/account" onClick={() => setOpen(false)}>Sign in or open your account <span aria-hidden="true">&rarr;</span></Link>
      </div>
      {open ? <button className={styles.backdrop} type="button" aria-label="Close menu" onClick={() => setOpen(false)} /> : null}
    </header>
  );
}
