import { useEffect, useRef } from "react";
import { CharterMark } from "./Brand";
import { gsap, ensureGsap, reducedMotion } from "@/lib/motion";

import gmail from "@/assets/gmail.jpg.asset.json";
import trello from "@/assets/trello.jpg.asset.json";
import docs from "@/assets/docs.jpg.asset.json";
import notion from "@/assets/notion.jpg.asset.json";
import calendar from "@/assets/calendar.jpg.asset.json";
import sheets from "@/assets/sheets.jpg.asset.json";
import excel from "@/assets/excel.jpg.asset.json";
import phone from "@/assets/phone.jpg.asset.json";

const W = 1000;
const H = 620;

type Src = { url: string; name: string; x: number; y: number; d: string };

const sources: Src[] = [
  { url: gmail.url, name: "Email threads", x: 78, y: 72, d: "M78,72 C260,90 340,170 470,290" },
  { url: trello.url, name: "Task boards", x: 238, y: 40, d: "M238,40 C340,70 400,150 478,272" },
  { url: docs.url, name: "Client briefs", x: 52, y: 232, d: "M52,232 C200,238 340,250 462,298" },
  { url: notion.url, name: "Notion pages", x: 222, y: 186, d: "M222,186 C320,210 390,250 466,288" },
  { url: calendar.url, name: "Meeting notes", x: 58, y: 396, d: "M58,396 C220,392 350,360 464,322" },
  { url: sheets.url, name: "Spreadsheets", x: 230, y: 352, d: "M230,352 C310,350 400,340 466,326" },
  { url: phone.url, name: "Call notes", x: 86, y: 548, c: 0, d: "M86,548 C260,530 360,430 470,340" } as Src,
  { url: excel.url, name: "Budgets", x: 252, y: 512, d: "M252,512 C340,490 410,410 474,344" },
];

type Out = { key: string; title: string; tone: string; x: number; y: number; d: string };

const outputs: Out[] = [
  {
    key: "scope",
    title: "Clear scope",
    tone: "var(--lavender)",
    x: 770,
    y: 92,
    d: "M530,288 C620,230 660,150 700,110",
  },
  {
    key: "contract",
    title: "Client-ready contract",
    tone: "var(--butter)",
    x: 790,
    y: 250,
    d: "M534,300 C630,286 660,266 706,256",
  },
  {
    key: "tasks",
    title: "Actionable tasks",
    tone: "var(--mint)",
    x: 775,
    y: 405,
    d: "M534,322 C630,344 660,382 704,402",
  },
  {
    key: "workspace",
    title: "Organized workspace",
    tone: "var(--sky)",
    x: 782,
    y: 548,
    d: "M528,336 C620,410 654,490 702,536",
  },
];

const pct = (x: number, y: number) => ({
  left: `${(x / W) * 100}%`,
  top: `${(y / H) * 100}%`,
});

function OutputCard({ out }: { out: Out }) {
  return (
    <div className="card-soft w-[15.5rem] rounded-2xl p-4">
      <div className="flex items-center gap-2.5">
        <span
          aria-hidden
          className="h-6 w-6 rounded-lg"
          style={{ backgroundColor: out.tone }}
        />
        <span className="text-[13px] font-semibold tracking-tight text-ink">{out.title}</span>
      </div>

      <div className="mt-3 space-y-1.5">
        {out.key === "scope" &&
          ["Deliverables", "Timeline", "Responsibilities", "Exclusions"].map((r) => (
            <div key={r} className="flex items-center gap-2">
              <span className="h-1 w-1 rounded-full bg-ink/25" />
              <span className="text-[11.5px] text-ink-soft">{r}</span>
            </div>
          ))}

        {out.key === "contract" &&
          ["Scope", "Pricing", "Timeline", "Approval"].map((r) => (
            <div key={r} className="flex items-center justify-between">
              <span className="text-[11.5px] text-ink-soft">{r}</span>
              <span className="h-1.5 w-10 rounded-full bg-ink/8" />
            </div>
          ))}

        {out.key === "tasks" &&
          ["Discovery call", "Wireframes", "Homepage build"].map((r) => (
            <div
              key={r}
              className="flex items-center gap-2 rounded-lg bg-ink/[0.035] px-2 py-1.5"
            >
              <span className="h-2.5 w-2.5 rounded-[4px] border border-ink/25" />
              <span className="text-[11.5px] text-ink-soft">{r}</span>
            </div>
          ))}

        {out.key === "workspace" && (
          <div className="flex gap-2 rounded-lg border border-ink/8 p-2">
            <div className="w-8 space-y-1">
              {[0, 1, 2].map((i) => (
                <span key={i} className="block h-1.5 rounded-full bg-ink/10" />
              ))}
            </div>
            <div className="flex-1 space-y-1">
              <span className="block h-1.5 w-full rounded-full bg-ink/10" />
              <span className="block h-6 w-full rounded bg-ink/[0.04]" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export function Flow() {
  const root = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ensureGsap() || !root.current) return;
    const el = root.current;

    const lines = Array.from(el.querySelectorAll<SVGPathElement>("path[data-line]"));
    const icons = Array.from(el.querySelectorAll<HTMLElement>("[data-source]"));
    const cards = Array.from(el.querySelectorAll<HTMLElement>("[data-output]"));
    const mark = el.querySelector<HTMLElement>("[data-mark]");

    if (reducedMotion()) {
      gsap.set(lines, { strokeDashoffset: 0, opacity: 0.5 });
      gsap.set([...icons, ...cards], { opacity: 1, y: 0, scale: 1 });
      gsap.set(mark, { opacity: 1, scale: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      lines.forEach((p) => {
        const len = p.getTotalLength();
        gsap.set(p, { strokeDasharray: len, strokeDashoffset: len, opacity: 0.55 });
      });

      gsap.fromTo(
        icons,
        { opacity: 0, scale: 0.92 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.7,
          ease: "power2.out",
          stagger: 0.06,
          scrollTrigger: { trigger: el, start: "top 72%", once: true },
        },
      );

      const tl = gsap.timeline({
        scrollTrigger: { trigger: el, start: "top 52%", once: true },
      });

      tl.fromTo(mark, { opacity: 0, scale: 0.94 }, { opacity: 1, scale: 1, duration: 0.7, ease: "power3.out" })
        .to(
          el.querySelectorAll("path[data-line='in']"),
          { strokeDashoffset: 0, duration: 1.1, ease: "power2.inOut", stagger: 0.07 },
          "-=0.3",
        )
        .to(icons, { scale: 0.94, opacity: 0.72, duration: 0.5, ease: "power2.out" }, "-=0.4")
        .to(mark, { scale: 1.04, duration: 0.3, ease: "power2.out" })
        .to(mark, { scale: 1, duration: 0.45, ease: "power2.out" })
        .to(
          el.querySelectorAll("path[data-line='out']"),
          { strokeDashoffset: 0, duration: 1, ease: "power2.inOut", stagger: 0.14 },
          "-=0.3",
        )
        .fromTo(
          cards,
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power3.out", stagger: 0.14 },
          "-=0.85",
        );
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section id="how-it-works" className="mx-auto max-w-[84rem] px-5 pb-16 sm:px-8">
      <div className="mx-auto max-w-[44rem] text-center">
        <h2 className="display text-[1.9rem] sm:text-[3rem]">
          One conversation. One connected project.
        </h2>
        <p className="measure mx-auto mt-5 text-[15px] text-ink-soft sm:text-[16px]">
          Charter AI organizes the engagement into deliverables, timelines, responsibilities,
          revisions, exclusions, pricing and open questions — then turns that structure into work.
        </p>
      </div>

      {/* Desktop / tablet canvas */}
      <div
        ref={root}
        className="relative mx-auto mt-10 hidden w-full max-w-[74rem] md:block"
        style={{ aspectRatio: `${W} / ${H}` }}
      >
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox={`0 0 ${W} ${H}`}
          fill="none"
          aria-hidden="true"
        >
          {sources.map((s) => (
            <path
              key={s.name}
              data-line="in"
              d={s.d}
              stroke="#111111"
              strokeOpacity="0.28"
              strokeWidth="1.25"
              vectorEffect="non-scaling-stroke"
              strokeLinecap="round"
            />
          ))}
          {outputs.map((o) => (
            <path
              key={o.key}
              data-line="out"
              d={o.d}
              stroke="#111111"
              strokeOpacity="0.28"
              strokeWidth="1.25"
              vectorEffect="non-scaling-stroke"
              strokeLinecap="round"
            />
          ))}
        </svg>

        {sources.map((s) => (
          <div
            key={s.name}
            data-source
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={pct(s.x, s.y)}
          >
            <div className="card-soft grid h-14 w-14 place-items-center rounded-2xl">
              <img src={s.url} alt="" aria-hidden loading="lazy" className="h-8 w-8 object-contain" />
            </div>
            <span className="mt-2 block w-24 text-center text-[11px] leading-tight text-ink-soft/80">
              {s.name}
            </span>
          </div>
        ))}

        <div
          data-mark
          className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center"
          style={pct(500, 310)}
        >
          <div
            className="grid h-28 w-28 place-items-center rounded-[2rem]"
            style={{ background: "var(--cream)", boxShadow: "0 0 0 1px rgb(17 17 17 / .07), 0 30px 60px -32px rgb(201 187 239 / .9)" }}
          >
            <CharterMark className="h-12 w-auto" />
          </div>
          <span className="mt-3 text-[13px] font-bold uppercase tracking-[0.2em] text-ink">
            Charter
          </span>
          <span className="mt-1 text-[10.5px] uppercase tracking-[0.16em] text-ink-soft/70">
            AI project layer
          </span>
        </div>

        {outputs.map((o) => (
          <div
            key={o.key}
            data-output
            className="absolute -translate-y-1/2"
            style={{ left: `${(o.x / W) * 100}%`, top: `${(o.y / H) * 100}%` }}
          >
            <OutputCard out={o} />
          </div>
        ))}
      </div>

      {/* Mobile */}
      <div className="mt-12 md:hidden">
        <div className="grid grid-cols-4 gap-3">
          {sources.map((s) => (
            <div key={s.name} className="card-soft grid aspect-square place-items-center rounded-2xl">
              <img src={s.url} alt={s.name} loading="lazy" className="h-7 w-7 object-contain" />
            </div>
          ))}
        </div>

        <div className="my-7 flex flex-col items-center">
          <span aria-hidden className="text-ink/25">
            ↓
          </span>
          <div
            className="mt-5 grid h-20 w-20 place-items-center rounded-3xl"
            style={{ background: "var(--cream)", boxShadow: "0 0 0 1px rgb(17 17 17 / .07), 0 24px 44px -28px rgb(201 187 239 / .9)" }}
          >
            <CharterMark className="h-9 w-auto" />
          </div>
          <span className="mt-3 text-[12px] font-bold uppercase tracking-[0.2em]">Charter</span>
          <span aria-hidden className="mt-5 text-ink/25">
            ↓
          </span>
        </div>

        <div className="grid gap-3 [&>div]:w-full [&_div.card-soft]:w-full">
          {outputs.map((o) => (
            <div key={o.key}>
              <OutputCard out={o} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
