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
        { opacity: 0, scale: 0.97 },
        { opacity: 1, scale: 1, duration: 0.9, ease: "power3.out" },
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
        className="card-soft overflow-hidden rounded-[1.75rem] sm:rounded-[2rem]"
        style={{ boxShadow: "0 1px 2px rgb(17 17 17 / .04), 0 50px 90px -60px rgb(17 17 17 / .45)" }}
      >
        {/* Window chrome */}
        <div className="flex items-center gap-2 border-b border-ink/8 px-5 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-ink/12" />
          <span className="h-2.5 w-2.5 rounded-full bg-ink/12" />
          <span className="h-2.5 w-2.5 rounded-full bg-ink/12" />
        </div>

        <div className="grid lg:grid-cols-[168px_minmax(0,1fr)_268px]">
          {/* Sidebar */}
          <aside className="hidden border-r border-ink/8 p-4 lg:block">
            <div className="mb-5 flex items-center gap-2">
              <CharterMark className="h-5 w-auto" />
              <span className="text-[12px] font-bold uppercase tracking-[0.16em]">Charter</span>
            </div>
            <ul className="space-y-1">
              {nav.map((n, i) => (
                <li key={n}>
                  <span
                    className={`block rounded-lg px-3 py-2 text-[13px] ${
                      i === 3 ? "bg-ink/[0.06] font-semibold text-ink" : "text-ink-soft"
                    }`}
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
                <p className="text-[11.5px] uppercase tracking-[0.16em] text-ink-soft/80">
                  Northstar Studio
                </p>
                <h3 className="truncate text-[20px] font-bold tracking-tight sm:text-[24px]">
                  Website Redesign
                </h3>
              </div>
              <span className="shrink-0 rounded-full bg-mint/60 px-3 py-1 text-[11.5px] font-semibold text-ink">
                Active
              </span>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {groups.map((g) => (
                <div key={g.title} className="rounded-2xl bg-ink/[0.025] p-3">
                  <div className="mb-3 flex items-center gap-2 px-1">
                    <span
                      aria-hidden
                      className="h-2 w-2 rounded-full"
                      style={{ backgroundColor: g.tone }}
                    />
                    <span className="text-[11.5px] font-semibold uppercase tracking-[0.12em] text-ink-soft">
                      {g.title}
                    </span>
                    <span className="ml-auto text-[11.5px] text-ink-soft/60">{g.items.length}</span>
                  </div>
                  <ul className="space-y-2">
                    {g.items.map((t) => (
                      <li
                        key={t}
                        data-task
                        className="rounded-xl border border-ink/6 bg-card px-3 py-2.5 text-[13px] text-ink"
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
          <aside className="border-t border-ink/8 p-5 lg:border-l lg:border-t-0">
            <div className="mb-4 flex items-center gap-2">
              <CharterMark className="h-4 w-auto" />
              <span className="text-[12px] font-semibold tracking-tight">Charter AI</span>
              <span className="ml-auto text-[10.5px] uppercase tracking-[0.14em] text-ink-soft/60">
                Suggestion
              </span>
            </div>

            <div data-assistant className="rounded-2xl bg-lavender/30 p-4">
              <p className="text-[13px] leading-[1.6] text-ink">
                I found one requested deliverable that isn&rsquo;t included in the approved scope.
              </p>
              <p className="mt-2 text-[13px] leading-[1.6] text-ink-soft">
                Would you like me to draft a change request?
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="rounded-full bg-ink px-3.5 py-1.5 text-[12px] font-medium text-cream">
                  Review change
                </span>
                <span className="rounded-full border border-ink/15 px-3.5 py-1.5 text-[12px] font-medium text-ink-soft">
                  Dismiss
                </span>
              </div>
            </div>

            <p className="mt-4 text-[11.5px] leading-relaxed text-ink-soft/80">
              Nothing reaches your client until you approve it.
            </p>
          </aside>
        </div>
      </div>
    </section>
  );
}
