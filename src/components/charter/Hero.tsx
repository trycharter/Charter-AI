import { useEffect, useRef } from "react";
import heroRobot from "@/assets/hero-robot.png.asset.json";
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
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1.3, ease: "power2.out" },
        0.1,
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
      className="relative isolate min-h-[100svh] overflow-hidden pb-20 pt-28 sm:pt-32"
    >
      {/* Ambient canvas tuned to the illustration: soft sky above, warm sand below */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_bottom,#cfe2e2_0%,#dfe9e1_34%,#f3ead6_64%,#fcf6ed_88%)]" />
      <div className="cream-haze pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[38%]" />

      <div className="mx-auto grid max-w-[84rem] items-center gap-10 px-5 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-6">
        {/* Left: all the words */}
        <div className="max-w-[36rem] text-center lg:text-left">
          <p
            data-hero-step
            className="inline-block rounded-full bg-butter px-4 py-1.5 text-[10.5px] font-semibold uppercase tracking-[0.16em] text-ink/80 sm:text-[11.5px]"
          >
            AI-native project management for freelancers
          </p>

          <h1
            data-hero-step
            className="display mt-7 text-[2.6rem] text-ink sm:text-[3.7rem] lg:text-[4.4rem]"
          >
            Turn <em className="font-medium not-italic italic opacity-95">messy client conversations</em>{" "}
            into a project you can actually run.
          </h1>

          <div data-hero-step className="mt-9">
            <button
              type="button"
              onClick={scrollToEarlyAccess}
              className="group inline-flex items-center gap-2.5 rounded-full bg-ink px-7 py-3.5 text-[15px] font-medium text-cream transition-all duration-300 hover:scale-[1.03] hover:bg-ink/90"
            >
              Join Waitlist
              <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </button>
            <p className="mt-4 text-[12.5px] text-ink-soft/80">
              Early access for freelancers. No spam. Just product updates and invites.
            </p>
          </div>
        </div>

        {/* Right: the illustration */}
        <div ref={image} className="relative">
          <img
            src={heroRobot.url}
            alt="Illustration of a robot sitting on a boulder, looking out over a wide open plain"
            width={1456}
            height={1944}
            fetchPriority="high"
            className="mx-auto w-full max-w-[26rem] rounded-[2rem] lg:max-w-none [mask-image:radial-gradient(120%_105%_at_50%_38%,black_58%,transparent_100%)]"
          />
        </div>
      </div>
    </section>
  );
}
