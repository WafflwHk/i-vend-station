import { gsap, ScrollTrigger } from "./scroll-animation";

const desktopMotion = "(min-width: 1100px) and (min-height: 720px) and (prefers-reduced-motion: no-preference)";

export function startProductShowcaseMotion(root: HTMLElement) {
  const media = gsap.matchMedia();

  media.add(desktopMotion, () => {
    const viewport = root.querySelector<HTMLElement>("[data-showcase-viewport]");
    const scenes = Array.from(root.querySelectorAll<HTMLElement>("[data-showcase-scene]"));
    const progress = root.querySelector<HTMLElement>("[data-showcase-progress]");
    const specifications = scenes[2]?.querySelectorAll("dl > div");
    if (!viewport || scenes.length !== 3 || !progress) return;

    let active = true;
    let refreshFrame = 0;
    const timeline = gsap.timeline({ paused: true, defaults: { ease: "none" } });
    timeline
      .to(scenes[0], { opacity: 0, y: -12, duration: 0.38 }, 0.55)
      .fromTo(scenes[1], { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.38 }, 0.65)
      .to(scenes[1], { opacity: 0, y: -12, duration: 0.38 }, 1.45)
      .fromTo(scenes[2], { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.38 }, 1.55)
      .fromTo(specifications ?? [], { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.22, stagger: 0.15 }, 1.8)
      .fromTo(progress, { scaleX: 0 }, { scaleX: 1, duration: 2.45 }, 0);

    // Only enhanced layouts overlap scenes. All content is stacked without JS.
    try {
      root.dataset.enhanced = "true";
      gsap.set([scenes[1], scenes[2]], { opacity: 0 });
      ScrollTrigger.create({
        trigger: viewport,
        animation: timeline,
        start: "top top+=100",
        end: () => "+=" + Math.round(window.innerHeight * 2.1),
        pin: true,
        pinSpacing: true,
        scrub: 0.7,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      });
    } catch (error) {
      timeline.revert();
      delete root.dataset.enhanced;
      throw error;
    }

    // Lazy images can finish after pin geometry is measured.
    const images = Array.from(viewport.querySelectorAll("img"));
    void Promise.all(images.map((image) => image.decode().catch(() => undefined))).then(() => {
      if (active) refreshFrame = window.requestAnimationFrame(() => ScrollTrigger.refresh());
    });

    return () => {
      active = false;
      window.cancelAnimationFrame(refreshFrame);
      delete root.dataset.enhanced;
    };
  });

  return () => media.revert();
}
