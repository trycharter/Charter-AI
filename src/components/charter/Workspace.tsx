import { useEffect, useRef } from "react";
import { CharterMark } from "./Brand";
import { gsap, ensureGsap, reducedMotion } from "@/lib/motion";

const groups = [
  {
    title: "To do",
    tone: "var(--blush)",
    items: ["Mobile wireframes", "Prepare launch assets", "Client feedback round"],
  },
  {
    title: "In progress",
    tone: "var(--butter)",
    items: ["Homepage development", "Product animation"],
  },
  {
    title: "Done",
    tone: "var(--mint)",
    items: ["Discovery call", "Finalized scope", "Contract approved"],
  },
];

const nav = ["Overview", "Scope", "Contract", "Tasks", "Files"];

export function Workspace() {
  const root = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ensureGsap() || !root.current) return;
    const el = root.current;

    if (reducedMotion()) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: el, start: "top 70%", once: true },
      });
      tl.fromTo(
        el,
        { opacity: 0, y: 40, scale: 0.97 },
        { opacity: 1, y: 0, scale: 1, duration: 0.9, ease: "power3.out" },
      )
        .fromTo(
          el.querySelectorAll("[data-task]"),
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.5, ease: "power2.out", stagger: 0.07 },
          "-=0.4",
        )
        .fromTo(
          el.querySelector("[data-assistant]"),
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
          "-=0.15",
        );
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section className="mx-auto max-w-[84rem] px-5 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto mb-10 max-w-[40rem] text-center sm:mb-14">
        <h2 className="display text-[1.9rem] sm:text-[2.8rem]">
          A workspace, not a chat window.
        </h2>
      </div>

      <div
        ref={root}
        className="overflow-hidden rounded-[1.75rem] border-[3px] border-ink bg-card sm:rounded-[2rem]"
        style={{ boxShadow: "10px 10px 0px #111111" }}
      >
        {/* Window chrome */}
        <div className="flex items-center gap-2 border-b-2 border-ink bg-cream px-5 py-3">
          <span className="h-3 w-3 rounded-full border-2 border-ink bg-coral" />
          <span className="h-3 w-3 rounded-full border-2 border-ink bg-butter" />
          <span className="h-3 w-3 rounded-full border-2 border-ink bg-mint" />
        </div>

        <div className="grid lg:grid-cols-[180px_minmax(0,1fr)_280px]">
          {/* Sidebar */}
          <aside className="hidden border-r-2 border-ink bg-cream p-4 lg:block">
            <div className="mb-5 flex items-center gap-2">
              <CharterMark className="h-5 w-auto" />
              <span className="text-[12px] font-bold uppercase tracking-[0.16em]">Charter</span>
            </div>
            <ul className="space-y-2">
              {nav.map((n, i) => (
                <li key={n}>
                  <span
                    className={`block rounded-xl px-3 py-2 text-[13px] font-semibold ${
                      i === 3
                        ? "border-2 border-ink bg-lavender text-ink"
                        : "border-2 border-transparent text-ink-soft"
                    }`}
                    style={i === 3 ? { boxShadow: "3px 3px 0px #111111" } : undefined}
                  >
                    {n}
                  </span>
                </li>
              ))}
            </ul>
          </aside>

          {/* Main */}
          <div className="min-w-0 p-5 sm:p-7">
            <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4 sm:flex sm:items-center sm:justify-between">
              <div className="min-w-0">
                <p className="text-[11.5px] font-semibold uppercase tracking-[0.16em] text-ink-soft">
                  Northstar Studio
                </p>
                <h3 className="truncate text-[20px] font-extrabold tracking-tight sm:text-[24px]">
                  Website Redesign
                </h3>
              </div>
              <span className="chip-brut shrink-0 bg-mint px-3 py-1 text-[11.5px]">Active</span>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {groups.map((g) => (
                <div key={g.title} className="rounded-2xl border-2 border-ink bg-cream p-3">
                  <div className="mb-3 flex items-center gap-2 px-1">
                    <span
                      aria-hidden
                      className="h-3 w-3 rounded-full border-2 border-ink"
                      style={{ backgroundColor: g.tone }}
                    />
                    <span className="text-[11.5px] font-bold uppercase tracking-[0.12em] text-ink">
                      {g.title}
                    </span>
                    <span className="ml-auto text-[11.5px] text-ink-soft">{g.items.length}</span>
                  </div>
                  <ul className="space-y-2">
                    {g.items.map((t) => (
                      <li
                        key={t}
                        data-task
                        className="rounded-xl border-2 border-ink bg-card px-3 py-2.5 text-[13px] font-medium text-ink"
                        style={{ boxShadow: "3px 3px 0px #111111" }}
                      >
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Assistant */}
          <aside className="border-t-2 border-ink bg-cream p-5 lg:border-l-2 lg:border-t-0">
            <div className="mb-4 flex items-center gap-2">
              <span className="grid h-7 w-7 place-items-center rounded-full border-2 border-ink bg-card">
                <CharterMark className="h-3.5 w-auto" />
              </span>
              <span className="text-[12px] font-bold tracking-tight">Charter AI</span>
              <span className="ml-auto text-[10.5px] font-semibold uppercase tracking-[0.14em] text-ink-soft">
                Suggestion
              </span>
            </div>

            <div
              data-assistant
              className="rounded-2xl border-2 border-ink bg-lavender p-4"
              style={{ boxShadow: "5px 5px 0px #111111" }}
            >
              <p className="text-[13px] leading-[1.6] text-ink">
                I found one requested deliverable that isn&rsquo;t included in the approved scope.
              </p>
              <p className="mt-2 text-[13px] leading-[1.6] text-ink/75">
                Would you like me to draft a change request?
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="btn-brut px-3.5 py-1.5 text-[12px]" style={{ ["--btn-shadow" as string]: "#FFFDF8" }}>
                  Review change
                </span>
                <span className="btn-brut-soft bg-card px-3.5 py-1.5 text-[12px]">Dismiss</span>
              </div>
            </div>

            <p className="mt-4 text-[11.5px] leading-relaxed text-ink-soft">
              Nothing reaches your client until you approve it.
            </p>
          </aside>
        </div>
      </div>
    </section>
  );
}
