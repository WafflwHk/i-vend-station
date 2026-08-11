"use client";

import Image from "next/image";
import { useLayoutEffect, useState } from "react";
import styles from "./loading-screen.module.css";

type LoadingPhase = "visible" | "leaving" | "hidden";

const visitStorageKey = "ivend-loader-seen";

export default function LoadingScreen() {
  const [phase, setPhase] = useState<LoadingPhase>("visible");

  useLayoutEffect(() => {
    const root = document.documentElement;
    if (root.dataset.splash !== "show") return;

    const shell = document.getElementById("site-shell");
    const splashStartedAt = Number.parseFloat(root.dataset.splashStartedAt ?? "");
    const elapsedBeforeHydration = Number.isFinite(splashStartedAt)
      ? Math.max(0, performance.now() - splashStartedAt)
      : 0;
    const previousBodyOverflow = document.body.style.overflow;
    const previousAriaHidden = shell?.getAttribute("aria-hidden") ?? null;
    const wasInert = shell?.hasAttribute("inert") ?? false;
    let released = false;
    let removeTimer = 0;

    try {
      window.sessionStorage.setItem(visitStorageKey, "true");
    } catch {
      // The loader still works when browser storage is unavailable.
    }

    if (shell) {
      shell.inert = true;
      shell.setAttribute("aria-hidden", "true");
    }
    document.body.style.overflow = "hidden";

    const releasePage = () => {
      if (released) return;
      released = true;
      root.style.removeProperty("overflow");
      document.body.style.overflow = previousBodyOverflow;

      if (shell) {
        if (!wasInert) shell.inert = false;
        if (previousAriaHidden === null) shell.removeAttribute("aria-hidden");
        else shell.setAttribute("aria-hidden", previousAriaHidden);
      }
    };

    const leaveTimer = window.setTimeout(() => {
      releasePage();
      root.dataset.splash = "leaving";
      setPhase("leaving");
      removeTimer = window.setTimeout(() => {
        root.dataset.splash = "done";
        setPhase("hidden");
      }, 420);
    }, Math.max(0, 900 - elapsedBeforeHydration));

    return () => {
      window.clearTimeout(leaveTimer);
      window.clearTimeout(removeTimer);
      releasePage();
    };
  }, []);

  if (phase === "hidden") return null;

  return (
    <div
      className={`${styles.loadingScreen} ${phase === "leaving" ? styles.leaving : ""}`}
      role="status"
      aria-live="polite"
      aria-label="Loading I Vend Station"
      aria-busy="true"
      data-loading-screen
    >
      <div className={styles.loader} aria-hidden="true">
        <div className={styles.vendingMark}>
          <Image
            src="/i-vend-station-icon.png"
            alt=""
            width={512}
            height={512}
            priority
          />
          <span className={styles.scan} />
          <span className={styles.dispensePulse} />
        </div>
      </div>
    </div>
  );
}
