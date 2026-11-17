"use client";

import { useEffect, useRef, type ReactNode } from "react";

// Adapted from React Bits Animated Content by David Haz (see LICENSE.md).
// This website variant uses its once-on-scroll reveal and keeps the SSR content visible.
export default function AnimatedContent({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    let active = true;
    let revert: (() => void) | undefined;
    void import("../../lib/scroll-animation").then(({ gsap, ScrollTrigger }) => {
      if (!active) return;
      const media = gsap.matchMedia();
      revert = () => media.revert();

      media.add("(prefers-reduced-motion: no-preference)", () => {
        const threshold = 0.12;
        // A direct visit to #latest should not hide a heading already on screen.
        if (element.getBoundingClientRect().top <= window.innerHeight * (1 - threshold)) return;

        const timeline = gsap.timeline({ paused: true });
        timeline.fromTo(element, { y: 20, opacity: 0.45 }, {
          y: 0,
          opacity: 1,
          duration: 0.65,
          ease: "power3.out",
          immediateRender: false,
          clearProps: "transform,opacity",
        });
        ScrollTrigger.create({
          trigger: element,
          start: "top " + (1 - threshold) * 100 + "%",
          once: true,
          animation: timeline,
        });
      });
    }).catch((error: unknown) => console.warn("The highlights reveal could not start.", error));

    return () => {
      active = false;
      revert?.();
    };
  }, []);

  return <div ref={ref} className={className}>{children}</div>;
}
