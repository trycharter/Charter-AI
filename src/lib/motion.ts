import { useEffect, useRef, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;
function ensureGsap() {
  if (typeof window === "undefined") return false;
  if (!registered) {
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.config({ ignoreMobileResize: true });
    ScrollTrigger.defaults({ invalidateOnRefresh: true });
    // Layout settles after fonts and images land — re-measure then.
    const refresh = () => ScrollTrigger.refresh();
    if (document.fonts?.ready) void document.fonts.ready.then(refresh);
    window.addEventListener("load", refresh, { once: true });
    registered = true;
  }
  return true;
}

export function reducedMotion() {
  if (typeof window === "undefined") return true;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Reveals every `[data-reveal]` descendant with a small, restrained fade-up
 * once the scene scrolls into view. Each scene owns its own timeline.
 */
export function useSceneReveal<T extends HTMLElement>(options?: {
  y?: number;
  stagger?: number;
  start?: string;
}): RefObject<T | null> {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !ensureGsap()) return;

    const targets = Array.from(el.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (targets.length === 0) return;

    if (reducedMotion()) {
      gsap.set(targets, { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        { opacity: 0, y: options?.y ?? 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger: options?.stagger ?? 0.09,
          scrollTrigger: {
            trigger: el,
            start: options?.start ?? "top 78%",
            once: true,
          },
        },
      );
    }, el);

    return () => ctx.revert();
  }, [options?.y, options?.stagger, options?.start]);

  return ref;
}

export { gsap, ScrollTrigger, ensureGsap };
