import { useEffect, useRef } from "react";
import heroRobot from "@/assets/hero-robot.png.asset.json";
import heroVideo from "@/assets/hero-robot.mp4.asset.json";
import heroVideoWebm from "@/assets/hero-robot.webm.asset.json";
import { CharterMark, scrollToEarlyAccess } from "./Brand";
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
      )
        .fromTo(
          image.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 1.3, ease: "power2.out" },
          0.1,
        )
        .fromTo(
          "[data-hero-sticker]",
          { opacity: 0, scale: 0.8, rotate: -12 },
          { opacity: 1, scale: 1, rotate: 0, duration: 0.7, stagger: 0.12, ease: "back.out(1.4)" },
          0.9,
        );

      gsap.to(image.current, {
        yPercent: 5,
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
      className="relative isolate min-h-[100svh] overflow-hidden pb-24 pt-28 sm:pt-36"
    >
      {/* Ambient canvas tuned to the illustration: soft sky above, warm sand below */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_bottom,#cfe2e2_0%,#dfe9e1_34%,#f3ead6_64%,#fcf6ed_88%)]" />
      <div className="cream-haze pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[38%]" />

      <div className="shell grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
        {/* Left: all the words */}
        <div className="relative max-w-[36rem] text-center lg:text-left">
          <p
            data-hero-step
            className="chip-brut -rotate-1 bg-butter px-4 py-1.5 text-[10.5px] uppercase tracking-[0.16em] sm:text-[11.5px]"
            style={{ boxShadow: "3px 3px 0px #111111" }}
          >
            AI-native project management for freelancers
          </p>

          <h1
            data-hero-step
            className="display mt-6 text-[clamp(2.4rem,5.1vw,3.9rem)] leading-[1.02] text-ink"
          >
            Turn{" "}
            <span className="relative inline-block isolate">
              <span className="relative z-10 italic">messy client conversations</span>
              <span
                aria-hidden
                className="absolute inset-x-[-6px] bottom-[8%] -z-10 h-[24%] -rotate-1 rounded-[4px] bg-mauve"
              />
            </span>{" "}
            into a project you can actually run.
          </h1>

          <div data-hero-step className="mt-8">
            <button
              type="button"
              onClick={scrollToEarlyAccess}
              className="btn-brut group h-[50px] px-7 text-[15px]"
              style={{ ["--btn-shadow" as string]: "#A8E0D2" }}
            >
              Join Waitlist
              <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </button>
            <span
              className="chip-brut ml-0 mt-4 flex w-fit bg-blush px-3.5 py-1.5 text-[11.5px] uppercase tracking-[0.14em] lg:ml-3 lg:mt-0 lg:inline-flex"
              style={{ boxShadow: "3px 3px 0px #111111" }}
            >
              Only 100 spots
            </span>
            <p className="mt-4 max-w-[42ch] text-[13px] font-normal leading-relaxed text-ink-soft/90">
              Early access for freelancers. No spam. Just product updates and invites.
            </p>
          </div>

          {/* hand-drawn arrow pointing at the CTA */}
          <svg
            aria-hidden
            className="pointer-events-none absolute -right-2 bottom-8 hidden h-24 w-28 text-ink lg:block"
            viewBox="0 0 120 100"
            fill="none"
          >
            <path
              d="M110,10 C80,20 48,34 30,64"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path d="M28,52 L29,68 L44,64" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>

        {/* Right: the illustration with layered UI stickers */}
        <div ref={image} className="relative">
          <video
            poster={heroRobot.url}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-label="Animation of a robot sitting on a boulder, looking out over a wide open plain"
            width={1244}
            height={1664}
            className="mx-auto block w-full max-w-[24rem] overflow-hidden rounded-[2rem] object-cover object-center lg:max-w-[34rem] [mask-image:radial-gradient(120%_105%_at_50%_38%,black_58%,transparent_100%)]"
          >
            <source src={heroVideo.url} type="video/mp4" />
            <source src={heroVideoWebm.url} type="video/webm" />
          </video>

          <span
            data-hero-sticker
            className="chip-brut absolute left-[2%] top-[16%] -rotate-6 bg-sky px-3 py-1.5 text-[11px]"
            style={{ boxShadow: "3px 3px 0px #111111" }}
          >
            Scope drafted
          </span>

          <span
            data-hero-sticker
            className="chip-brut absolute right-[2%] top-[38%] rotate-3 bg-pistachio px-3 py-1.5 text-[11px]"
            style={{ boxShadow: "3px 3px 0px #111111" }}
          >
            Contract ready
          </span>

          <div
            data-hero-sticker
            className="absolute bottom-[14%] left-[6%] flex -rotate-3 items-center gap-2 rounded-2xl border-2 border-ink bg-cream px-3 py-2"
            style={{ boxShadow: "4px 4px 0px #111111" }}
          >
            <CharterMark className="h-4 w-auto" />
            <span className="text-[10.5px] font-bold uppercase tracking-[0.16em]">Charter</span>
          </div>
        </div>
      </div>
    </section>
  );
}
