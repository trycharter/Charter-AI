import { useEffect, useRef } from "react";
import { gsap, ensureGsap, reducedMotion } from "@/lib/motion";

type Scrap = {
  key: string;
  label: string;
  tone: string;
  note?: string;
  /** desktop placement, percentages of the collage box */
  pos: string;
  rotate: number;
  from: gsap.TweenVars;
  depth: number;
  body: React.ReactNode;
};

const lines = (n: number, widths: string[]) =>
  Array.from({ length: n }).map((_, i) => (
    <span
      key={i}
      className="block h-[3px] rounded-full bg-ink/70"
      style={{ width: widths[i % widths.length] }}
    />
  ));

const scraps: Scrap[] = [
  {
    key: "notes",
    label: "Meeting notes",
    tone: "#FFE7AB",
    pos: "left-[2%] top-[4%]",
    rotate: -5,
    depth: 12,
    from: { x: -100, rotate: -14, opacity: 0 },
    body: <div className="mt-3 space-y-[7px]">{lines(4, ["86%", "64%", "92%", "48%"])}</div>,
  },
  {
    key: "files",
    label: "Client files",
    tone: "#C9BBEF",
    pos: "left-[24%] top-[46%]",
    rotate: 4,
    depth: 8,
    from: { y: 80, rotate: 11, opacity: 0 },
    body: (
      <div className="mt-3 flex gap-1.5">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="block h-9 w-7 rounded-[4px] border-2 border-ink bg-cream"
            style={{ transform: `rotate(${(i - 1) * 4}deg)` }}
          />
        ))}
      </div>
    ),
  },
  {
    key: "thread",
    label: "Message thread",
    tone: "#A8E0D2",
    pos: "right-[1%] top-[0%]",
    rotate: -3,
    depth: 14,
    from: { x: 100, rotate: 8, opacity: 0 },
    body: (
      <div className="mt-3 space-y-1.5">
        <span className="block h-4 w-[70%] rounded-full rounded-bl-[3px] border-2 border-ink bg-cream" />
        <span className="ml-auto block h-4 w-[55%] rounded-full rounded-br-[3px] border-2 border-ink bg-ink/10" />
        <span className="block h-4 w-[45%] rounded-full rounded-bl-[3px] border-2 border-ink bg-cream" />
      </div>
    ),
  },
  {
    key: "contract",
    label: "Contract?",
    tone: "#F5C8C4",
    note: "still not written",
    pos: "right-[6%] top-[42%]",
    rotate: 6,
    depth: 10,
    from: { y: 70, scale: 0.85, rotate: 14, opacity: 0 },
    body: null,
  },
  {
    key: "scope",
    label: "Scope",
    tone: "#FFBE98",
    note: "somewhere in your head",
    pos: "left-[6%] top-[76%]",
    rotate: -7,
    depth: 6,
    from: { scale: 0.85, rotate: -16, opacity: 0 },
    body: null,
  },
];

function Scrap({ s }: { s: Scrap }) {
  return (
    <div
      className="brut w-[13.5rem] rounded-[14px] p-4"
      style={{ backgroundColor: s.tone, transform: `rotate(${s.rotate}deg)` }}
    >
      <div className="flex items-center justify-between gap-2">
        <span className="text-[12px] font-extrabold uppercase tracking-[0.1em] text-ink">
          {s.label}
        </span>
        <span aria-hidden className="h-2 w-2 rounded-full border-2 border-ink" />
      </div>
      {s.body}
      {s.note && <p className="accent-serif mt-2 text-[17px] italic leading-tight text-ink">{s.note}</p>}
    </div>
  );
}

export function Problem() {
  const root = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = root.current;
    if (!el || !ensureGsap()) return;

    const heads = Array.from(el.querySelectorAll<HTMLElement>("[data-head]"));
    const punch = el.querySelector<HTMLElement>("[data-punch]");
    const cards = Array.from(el.querySelectorAll<HTMLElement>("[data-scrap]"));
    const paths = Array.from(el.querySelectorAll<SVGPathElement>("path[data-draw]"));
    const copy = Array.from(el.querySelectorAll<HTMLElement>("[data-copy]"));

    if (reducedMotion()) {
      gsap.set([...heads, punch, ...cards, ...copy], { opacity: 1, x: 0, y: 0, scale: 1 });
      gsap.set(paths, { strokeDashoffset: 0, opacity: 0.9 });
      return;
    }

    const ctx = gsap.context(() => {
      paths.forEach((p) => {
        const len = p.getTotalLength();
        gsap.set(p, { strokeDasharray: len, strokeDashoffset: len });
      });

      gsap.fromTo(
        heads,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: { trigger: el, start: "top 78%", once: true },
        },
      );

      gsap.fromTo(
        punch,
        { opacity: 0, y: 70, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 66%", once: true },
        },
      );

      cards.forEach((c, i) => {
        const data = scraps[i];
        gsap.fromTo(
          c,
          { ...data.from },
          {
            x: 0,
            y: 0,
            scale: 1,
            rotate: 0,
            opacity: 1,
            duration: 0.85,
            delay: i * 0.1,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 55%", once: true },
          },
        );
      });

      gsap.to(paths, {
        strokeDashoffset: 0,
        duration: 1.1,
        ease: "power2.inOut",
        stagger: 0.18,
        scrollTrigger: { trigger: el, start: "top 42%", once: true },
      });

      gsap.fromTo(
        copy,
        { opacity: 0, y: 34 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.14,
          scrollTrigger: { trigger: el, start: "top 34%", once: true },
        },
      );

      // gentle convergence + cursor parallax
      const collage = el.querySelector<HTMLElement>("[data-collage]");
      if (collage) {
        cards.forEach((c, i) => {
          gsap.to(c, {
            y: 26 - (i % 2) * 16,
            x: i < 2 ? 18 : -18,
            ease: "none",
            scrollTrigger: { trigger: el, start: "center center", end: "bottom top", scrub: 1 },
          });
        });

        const setters = cards.map((c) => ({
          x: gsap.quickTo(c, "--px", { duration: 0.6, ease: "power2.out" }),
          y: gsap.quickTo(c, "--py", { duration: 0.6, ease: "power2.out" }),
        }));
        const onMove = (e: PointerEvent) => {
          const r = collage.getBoundingClientRect();
          const nx = (e.clientX - r.left) / r.width - 0.5;
          const ny = (e.clientY - r.top) / r.height - 0.5;
          cards.forEach((c, i) => {
            const d = scraps[i].depth;
            setters[i].x(-nx * d);
            setters[i].y(-ny * d);
            c.style.setProperty("transform", "");
          });
        };
        collage.addEventListener("pointermove", onMove);
        return () => collage.removeEventListener("pointermove", onMove);
      }
      return undefined;
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={root}
      className="relative mx-auto max-w-[84rem] overflow-hidden px-5 pb-24 pt-14 sm:px-8 sm:pb-36 sm:pt-24"
    >
      {/* doodle accents */}
      <svg
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox="0 0 1200 900"
        preserveAspectRatio="none"
        fill="none"
      >
        <path
          data-draw
          d="M300,250 C400,300 470,330 560,300"
          stroke="#111111"
          strokeWidth="2"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
        <path
          data-draw
          d="M880,320 C820,400 740,430 660,430"
          stroke="#111111"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="0"
          vectorEffect="non-scaling-stroke"
        />
        {/* lines leaving toward the next scene */}
        <path
          data-draw
          d="M420,760 C520,850 700,870 860,830"
          stroke="#111111"
          strokeOpacity="0.5"
          strokeWidth="2"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      <div className="relative grid gap-12 lg:grid-cols-[minmax(0,60%)_minmax(0,40%)] lg:gap-8">
        {/* Heading */}
        <div className="relative z-10">
          <span className="accent-serif inline-block -rotate-2 rounded-full border-2 border-ink bg-[#A0E4E0] px-4 py-1 text-[15px] italic">
            the freelancer gap
          </span>

          <h2 className="display mt-6 text-[2.1rem] leading-[1.02] sm:text-[3.4rem] lg:text-[4.3rem]">
            <span data-head className="block font-semibold text-ink/50">
              Your client gave you everything
            </span>
            <span data-head className="block font-semibold text-ink/50">
              in a 20-minute call.
            </span>
            <span data-punch className="mt-4 block font-extrabold text-ink">
              Turning it into a contract
              <br />
              takes you{" "}
              <span className="relative inline-block">
                <span className="relative z-10">an hour.</span>
                <span
                  aria-hidden
                  className="absolute inset-x-[-4px] bottom-[6%] -z-0 h-[36%] -rotate-1 rounded-[4px] border-2 border-ink"
                  style={{ backgroundColor: "#F59C9A" }}
                />
              </span>
            </span>
          </h2>

          {/* tiny doodle star */}
          <svg aria-hidden className="mt-6 h-7 w-7 text-ink" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 2 L13.8 9.5 L21 12 L13.8 14.5 L12 22 L10.2 14.5 L3 12 L10.2 9.5 Z"
              fill="currentColor"
            />
          </svg>
        </div>

        {/* Supporting copy + statement */}
        <div className="relative z-10 flex flex-col justify-end gap-6 lg:pb-6">
          <p data-copy className="max-w-[34ch] text-[16px] leading-[1.75] text-ink-soft sm:text-[17px]">
            Scattered notes. Scattered files. A scope that only exists in your head and a
            half-finished message thread.
          </p>
          <p data-copy className="max-w-[32ch] text-[18px] font-semibold leading-[1.5] text-ink sm:text-[20px]">
            The information was never the problem — organizing it always is.
          </p>

          <div
            data-copy
            className="brut-lg relative w-full max-w-[26rem] rotate-[-1.5deg] rounded-[18px] bg-[#C5DBA9] p-5"
          >
            <p className="text-[20px] font-extrabold leading-[1.2] tracking-tight text-ink sm:text-[24px]">
              Charter closes that gap.
            </p>
            <p className="accent-serif mt-2 text-[19px] italic leading-snug text-ink">
              Contract and task list, drafted in minutes.
            </p>
            <svg
              aria-hidden
              className="absolute -right-3 -top-4 h-9 w-9 rotate-12 text-ink"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path d="M12 3v18M3 12h18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </div>
        </div>
      </div>

      {/* Desktop collage */}
      <div
        data-collage
        className="pointer-events-auto relative mt-16 hidden h-[30rem] w-full md:block"
      >
        {scraps.map((s) => (
          <div
            key={s.key}
            data-scrap
            className={`absolute ${s.pos}`}
            style={{ translate: "var(--px, 0px) var(--py, 0px)" }}
          >
            <Scrap s={s} />
          </div>
        ))}

        {/* hand-drawn arrows between scraps */}
        <svg
          aria-hidden
          className="pointer-events-none absolute inset-0 h-full w-full"
          viewBox="0 0 1000 480"
          fill="none"
        >
          <path
            data-draw
            d="M215,110 C300,150 330,210 300,255"
            stroke="#111111"
            strokeWidth="2"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
          <path
            data-draw
            d="M292,244 l10,16 l-19,3"
            stroke="#111111"
            strokeWidth="2"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
          <path
            data-draw
            d="M760,140 C700,200 700,230 740,262"
            stroke="#111111"
            strokeWidth="2"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
          <path
            data-draw
            d="M470,430 C560,470 680,460 780,420"
            stroke="#111111"
            strokeOpacity="0.45"
            strokeWidth="2"
            strokeDasharray="0"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      </div>

      {/* Mobile / tablet uneven collage */}
      <div className="mt-10 grid grid-cols-2 items-start gap-4 md:hidden">
        {scraps.map((s, i) => (
          <div
            key={s.key}
            data-scrap
            className={i % 2 === 0 ? "mt-0" : "mt-7"}
            style={{ gridColumn: i === 4 ? "span 2" : undefined }}
          >
            <div className="[&>div]:w-full">
              <Scrap s={s} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
