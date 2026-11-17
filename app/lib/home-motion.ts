import Lenis from "lenis";
import { gsap, ScrollTrigger } from "./scroll-animation";

const motionAllowed = "(prefers-reduced-motion: no-preference)";
const desktopWheel = motionAllowed + " and (min-width: 801px) and (hover: hover) and (pointer: fine)";
const independentScroll = "[data-lenis-prevent], dialog, [role='dialog'], #mobile-site-menu, .category-pills";

export function startHomeMotion(hero: HTMLElement) {
  const media = gsap.matchMedia();

  media.add(motionAllowed, () => {
    gsap.fromTo(hero, { "--vending-scroll": 0 }, {
      "--vending-scroll": 1,
      ease: "sine.inOut",
      scrollTrigger: {
        trigger: hero,
        start: () => "top top-=" + Math.round(hero.offsetHeight * 0.04),
        end: () => "+=" + Math.round(hero.offsetHeight * 0.74),
        scrub: true,
      },
    });
  });

  media.add(desktopWheel, () => {
    const lenis = new Lenis({
      smoothWheel: true,
      syncTouch: false,
      stopInertiaOnNavigate: true,
      prevent: (node) => node.matches(independentScroll),
      virtualScroll: ({ deltaX, deltaY, event }) =>
        !(event instanceof WheelEvent && event.shiftKey) &&
        Math.abs(deltaY) > Math.abs(deltaX) &&
        document.documentElement.style.overflow !== "hidden" &&
        document.body.style.overflow !== "hidden",
    });
    const updateScrollTrigger = () => ScrollTrigger.update();
    const tick = (time: number) => lenis.raf(time * 1000);
    const stopInertia = () => lenis.scrollTo(window.scrollY, { immediate: true });
    const off = lenis.on("scroll", updateScrollTrigger);
    window.addEventListener("hashchange", stopInertia);
    gsap.ticker.add(tick);

    return () => {
      window.removeEventListener("hashchange", stopInertia);
      gsap.ticker.remove(tick);
      off();
      lenis.destroy();
    };
  });

  return () => media.revert();
}
