import { useEffect, useRef } from "react";
import heroImage from "@/assets/hero-landscape.jpg";
import { scrollToEarlyAccess } from "./Brand";
import { gsap, ensureGsap, reducedMotion } from "@/lib/motion";

export function Hero() {
  const root = useRef<HTMLElement | null>(null);
  const image = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ensureGsap() || !root.current) return;
    if (reducedMotion()) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(
        "[data-hero-step]",
        { opacity: 0, y: 26 },
        { opacity: 1, y: 0, duration: 0.95, stagger: 0.12, delay: 0.25 },
      ).fromTo(
        image.current,
        { opacity: 0.55, scale: 1.05 },
        { opacity: 1, scale: 1, duration: 1.6, ease: "power2.out" },
        0,
      );

      gsap.to(image.current, {
        yPercent: 6,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="top"
      ref={root}
      className="relative isolate min-h-[100svh] overflow-hidden pb-24 pt-32 sm:pt-40"
    >
      {/* Landscape that dissolves into the cream canvas */}
      <div ref={image} className="absolute inset-0 -z-10">
        <img
          src={heroImage}
          alt="A modern chair standing in a sunlit open meadow with an open laptop resting on it"
          width={1920}
          height={1200}
          fetchPriority="high"
          className="h-full w-full object-cover object-[27%_62%] md:object-[46%_52%]"
        />
        <div className="cream-haze pointer-events-none absolute inset-x-0 bottom-0 h-[62%]" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-cream/55 to-transparent" />
      </div>

      <div className="mx-auto flex max-w-[84rem] flex-col items-center px-5 text-center sm:px-8">
        <p
          data-hero-step
          className="rounded-full bg-butter px-4 py-1.5 text-[10.5px] font-semibold uppercase tracking-[0.16em] text-ink/80 sm:text-[11.5px]"
        >
          AI-native project management for freelancers
        </p>

        <h1
          data-hero-step
          className="display mt-7 max-w-[17ch] text-[2.65rem] text-ink sm:text-[4.2rem] lg:text-[5.3rem]"
        >
          Turn <em className="font-medium not-italic italic opacity-95">messy client conversations</em>{" "}
          into a project you can actually run.
        </h1>

        <p
          data-hero-step
          className="mt-7 max-w-[46ch] text-[15px] leading-[1.7] text-ink-soft sm:text-[17px]"
        >
          Drop in your notes, messages, briefs and files. Charter AI turns them into a{" "}
          <strong className="font-semibold text-ink">clear scope</strong>,{" "}
          <strong className="font-semibold text-ink">client-ready contract</strong>,{" "}
          <strong className="font-semibold text-ink">actionable tasks</strong> and{" "}
          <strong className="font-semibold text-ink">one organized workspace</strong>.
        </p>

        <div data-hero-step className="mt-9">
          <button
            type="button"
            onClick={scrollToEarlyAccess}
            className="group inline-flex items-center gap-2.5 rounded-full bg-ink px-7 py-3.5 text-[15px] font-medium text-cream transition-all duration-300 hover:scale-[1.03] hover:bg-ink/90"
          >
            Get Early Access
            <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </button>
          <p className="mt-4 text-[12.5px] text-ink-soft/80">
            Early access for freelancers. No spam. Just product updates and invites.
          </p>
        </div>
      </div>
    </section>
  );
}
