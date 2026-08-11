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
    let scrollFrame = 0;
    let heroSection: HTMLElement | null = null;
    let lastHeroProgress = "";
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");

    const updateHeroMotion = () => {
      scrollFrame = 0;
      if (!heroSection) return;
      if (motionPreference.matches) {
        if (lastHeroProgress !== "0.000") {
          lastHeroProgress = "0.000";
          heroSection.style.setProperty("--vending-scroll", lastHeroProgress);
        }
        return;
      }
      const bounds = heroSection.getBoundingClientRect();
      const distance = Math.max(heroSection.offsetHeight * 0.78, 1);
      const rawProgress = Math.min(1, Math.max(0, -bounds.top / distance));
      const activeProgress = Math.min(1, Math.max(0, (rawProgress - 0.05) / 0.95));
      const easedProgress = activeProgress * activeProgress * (3 - 2 * activeProgress);
      const nextProgress = easedProgress.toFixed(3);
      if (nextProgress === lastHeroProgress) return;
      lastHeroProgress = nextProgress;
      heroSection.style.setProperty("--vending-scroll", nextProgress);
    };

    const requestHeroUpdate = () => {
      if (!scrollFrame) scrollFrame = window.requestAnimationFrame(updateHeroMotion);
    };

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

    const vendingShowcase = document.querySelector<HTMLElement>("[data-scroll-vending]");
    heroSection = vendingShowcase?.closest<HTMLElement>(".hero") ?? null;
    if (heroSection) {
      updateHeroMotion();
      window.addEventListener("scroll", requestHeroUpdate, { passive: true });
      window.addEventListener("resize", requestHeroUpdate);
      motionPreference.addEventListener("change", requestHeroUpdate);
    }

    return () => {
      if (scrollFrame) window.cancelAnimationFrame(scrollFrame);
      revealObserver?.disconnect();
      window.removeEventListener("scroll", requestHeroUpdate);
      window.removeEventListener("resize", requestHeroUpdate);
      motionPreference.removeEventListener("change", requestHeroUpdate);
      heroSection?.style.removeProperty("--vending-scroll");
    };
  }, [pathname]);

  return null;
}
