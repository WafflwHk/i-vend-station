"use client";

import { useEffect } from "react";

export default function HomeMotion() {
  useEffect(() => {
    const hero = document.querySelector("[data-scroll-vending]")?.closest<HTMLElement>(".hero");
    if (!hero) return;

    let active = true;
    let stop: (() => void) | undefined;
    void import("../lib/home-motion").then(({ startHomeMotion }) => {
      if (active) stop = startHomeMotion(hero);
    }).catch((error: unknown) => console.warn("Homepage motion could not start.", error));

    return () => {
      active = false;
      stop?.();
    };
  }, []);

  return null;
}
