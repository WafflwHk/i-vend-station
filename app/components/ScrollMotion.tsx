"use client";

import { usePathname } from "next/navigation";
import { useLayoutEffect } from "react";

export default function ScrollMotion() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncMotionPreference = () => {
      document.documentElement.classList.toggle("motion-enabled", !motionPreference.matches);
    };

    syncMotionPreference();
    motionPreference.addEventListener("change", syncMotionPreference);
    return () => {
      motionPreference.removeEventListener("change", syncMotionPreference);
      document.documentElement.classList.remove("motion-enabled");
    };
  }, []);

  useLayoutEffect(() => {
    let revealObserver: IntersectionObserver | null = null;
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");

    const revealItems = Array.from(document.querySelectorAll<HTMLElement>("[data-animate]"));
    if (motionPreference.matches || !("IntersectionObserver" in window)) {
      revealItems.forEach((item) => { item.dataset.inView = "true"; });
    } else {
      revealObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            (entry.target as HTMLElement).dataset.inView = "true";
            revealObserver?.unobserve(entry.target);
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -7% 0px" },
      );
      const firstViewLimit = window.innerHeight * 0.93;
      revealItems.forEach((item) => {
        const bounds = item.getBoundingClientRect();
        if (bounds.top < firstViewLimit && bounds.bottom > 0) item.dataset.inView = "true";
        else revealObserver?.observe(item);
      });
    }

    return () => revealObserver?.disconnect();
  }, [pathname]);

  return null;
}
