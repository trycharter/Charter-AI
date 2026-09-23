import { useEffect, useRef } from "react";

import { gsap, ensureGsap, reducedMotion } from "@/lib/motion";

const socials = [
  { label: "X / Twitter", href: "https://x.com/trycharterai", tone: "var(--sky)", external: true },
  {
    label: "Instagram",
    href: "https://www.instagram.com/trycharter.ai",
    tone: "var(--mauve)",
    external: true,
  },
  { label: "Privacy", href: "/privacy", tone: "var(--pistachio)", external: false },
  { label: "Terms", href: "/terms", tone: "var(--lavender)", external: false },
];

export function Footer() {
  const root = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = root.current;
    if (!el || !ensureGsap()) return;
    const mark = el.querySelector<HTMLElement>("[data-wordmark]");
    if (!mark) return;

    if (reducedMotion()) {
      gsap.set(mark, { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        mark,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        },
      );
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={root} className="relative overflow-hidden pt-16">
      <div className="shell flex flex-wrap items-center justify-between gap-4 pb-10 text-[13px] text-ink-soft">
        <p className="font-semibold text-ink">© {new Date().getFullYear()} Charter AI</p>
        <nav aria-label="Footer" className="flex flex-wrap items-center gap-3">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              {...(s.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="btn-brut-soft px-4 py-2 text-[12.5px]"
              style={{ backgroundColor: s.tone }}
            >
              {s.label}
            </a>
          ))}
        </nav>
      </div>

      <div aria-hidden className="relative -mb-[2vw] flex select-none justify-center px-[5vw]">
        {/* the wordmark shape is used as a mask so the pastel palette shows through it */}
        <div
          data-wordmark
          className="relative w-[clamp(260px,86vw,1320px)] max-w-full"
          style={{
            aspectRatio: "1057 / 225",
            backgroundImage:
              "linear-gradient(100deg, var(--lavender) 0%, var(--turquoise) 18%, var(--mint) 34%, var(--pistachio) 50%, var(--butter) 64%, var(--peach) 78%, var(--blush) 90%, var(--mauve) 100%)",
            WebkitMaskImage: "url(/charter-wordmark.svg)",
            maskImage: "url(/charter-wordmark.svg)",
            WebkitMaskSize: "100% 100%",
            maskSize: "100% 100%",
            WebkitMaskRepeat: "no-repeat",
            maskRepeat: "no-repeat",
          }}
        />

      </div>

    </footer>
  );
}
