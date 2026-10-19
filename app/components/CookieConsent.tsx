"use client";

import { useState, useSyncExternalStore } from "react";
import styles from "./cookie-consent.module.css";

const consentStorageKey = "ivend-cookie-preference";

type ConsentChoice = "all" | "essential";

function subscribeToConsent() {
  return () => {};
}

function readConsentPreference() {
  try {
    return window.localStorage.getItem(consentStorageKey);
  } catch {
    return null;
  }
}

function getConsentPreferenceOnServer() {
  return "pending";
}

export default function CookieConsent() {
  const savedPreference = useSyncExternalStore(subscribeToConsent, readConsentPreference, getConsentPreferenceOnServer);
  const [hasMadeChoice, setHasMadeChoice] = useState(false);
  const isVisible = savedPreference === null && !hasMadeChoice;

  const saveChoice = (choice: ConsentChoice) => {
    try {
      window.localStorage.setItem(consentStorageKey, choice);
    } catch {
      // The banner can still close for this visit when browser storage is unavailable.
    }
    setHasMadeChoice(true);
  };

  if (!isVisible) return null;

  return (
    <aside className={styles.banner} aria-labelledby="cookie-consent-title" data-cookie-consent>
      <div className={styles.copy}>
        <p className={styles.eyebrow}>YOUR PRIVACY</p>
        <h2 id="cookie-consent-title">Cookie preferences</h2>
        <p>IVEND uses essential browser storage for appearance and site reliability. We do not currently use advertising or analytics cookies. <a href="/privacy">Privacy Policy</a></p>
      </div>
      <div className={styles.actions}>
        <button type="button" className={styles.secondary} onClick={() => saveChoice("essential")}>Essential only</button>
        <button type="button" className={styles.primary} onClick={() => saveChoice("all")}>Accept all cookies</button>
      </div>
    </aside>
  );
}
