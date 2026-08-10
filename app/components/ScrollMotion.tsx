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
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");

    const updateHeroMotion = () => {
      scrollFrame = 0;
      if (!heroSection) return;
      if (motionPreference.matches) {
        heroSection.style.setProperty("--vending-scroll", "0");
        return;
      }
      const bounds = heroSection.getBoundingClientRect();
      const distance = Math.max(heroSection.offsetHeight * 0.72, 1);
      const progress = Math.min(1, Math.max(0, -bounds.top / distance));
      heroSection.style.setProperty("--vending-scroll", progress.toFixed(3));
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
