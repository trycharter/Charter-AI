import { useEffect, useRef, useState } from "react";
import { CharterMark } from "./Brand";
import { gsap, ensureGsap, reducedMotion } from "@/lib/motion";

/* ------------------------------------------------------------------ */
/* data                                                                */
/* ------------------------------------------------------------------ */

const NAV = [
  "Overview",
  "Client Brief",
  "Scope of Work",
  "Contract",
  "Tasks & Milestones",
  "Files & References",
  "Working System",
] as const;

type NavItem = (typeof NAV)[number];

const TAG_TONE: Record<string, string> = {
  DEVELOPMENT: "#A8E0D2",
  DESIGN: "#C9BBEF",
  "CLIENT REVIEW": "#FFE7AB",
  DELIVERY: "#9ECCF0",
  REVISION: "#F5C8C4",
  LAUNCH: "#FFBE98",
  INTERACTION: "#A0E4E0",
};

type Task = {
  name: string;
  tag?: string;
  due?: string;
  progress?: number;
  note?: string;
  done?: boolean;
};

const COLUMNS: { title: string; dot: string; tasks: Task[] }[] = [
  {
    title: "To do",
    dot: "#F5C8C4",
    tasks: [
      { name: "Responsive QA", tag: "DEVELOPMENT", due: "Oct 10" },
      { name: "Prepare launch assets", tag: "LAUNCH", due: "Oct 18" },
      { name: "CMS handoff", tag: "DELIVERY", due: "Oct 21" },
    ],
  },
  {
    title: "In progress",
    dot: "#FFE7AB",
    tasks: [
      { name: "Homepage development", tag: "DEVELOPMENT", due: "Oct 4", progress: 75 },
      { name: "3D hero animation", tag: "INTERACTION", due: "Oct 6", progress: 40 },
    ],
  },
  {
    title: "Client review",
    dot: "#FFBE98",
    tasks: [
      { name: "Homepage design v2", tag: "CLIENT REVIEW", note: "Waiting for client · Sent Sep 29" },
    ],
  },
  {
    title: "Done",
    dot: "#C5DBA9",
    tasks: [
      { name: "Discovery call", due: "Sep 18", done: true },
      { name: "Finalized scope", due: "Sep 19", done: true },
      { name: "Contract approved", due: "Sep 20", done: true },
      { name: "Homepage wireframes", due: "Sep 26", done: true },
    ],
  },
];

const SUMMARY = [
  { label: "Project value", value: "$8,500", sub: "Fixed scope", tone: "#FFE7AB" },
  { label: "Deadline", value: "Oct 28", sub: "18 days left", tone: "#F5C8C4" },
  { label: "Contract", value: "Approved ✓", sub: "Approved Sep 18", tone: "#A8E0D2" },
  { label: "Current milestone", value: "Homepage Build", sub: "Due Oct 4", tone: "#C9BBEF" },
];

const MILESTONES = [
  { label: "Discovery", state: "✓" },
  { label: "Scope", state: "✓" },
  { label: "Design", state: "✓" },
  { label: "Development", state: "●" },
  { label: "QA", state: "○" },
  { label: "Launch", state: "○" },
];

const CONTEXT_CHECKS = [
  "Client brief",
  "Approved scope",
  "Contract",
  "Project files",
  "Task plan",
  "Your working system",
];

const QUICK_ACTIONS = [
  "Draft client update",
  "What's due next?",
  "Check scope",
  "Break down a task",
  "Draft revision note",
  "Summarize progress",
];

const ACTIVITY = [
  { when: "Today", what: "Homepage development moved to In Progress" },
  { when: "Yesterday", what: "Client approved homepage design" },
  { when: "Sep 28", what: "3D animation task created" },
  { when: "Sep 26", what: "Homepage wireframes completed" },
];

const PANELS: Partial<Record<NavItem, { title: string; groups: { h: string; items: string[] }[] }>> =
  {
    "Client Brief": {
      title: "Client brief",
      groups: [
        { h: "Goals", items: ["Modernise brand presence", "Convert more studio enquiries"] },
        { h: "References", items: ["Editorial studio sites", "Motion-led homepages"] },
        { h: "Notes", items: ["Launch tied to autumn campaign", "Tone: calm, confident"] },
      ],
    },
    "Scope of Work": {
      title: "Project scope",
      groups: [
        {
          h: "Deliverables",
          items: ["Strategy & wireframes", "5-page website", "3D hero", "CMS integration"],
        },
        { h: "Timeline", items: ["Sep 18 – Oct 28"] },
        { h: "Revisions", items: ["2 rounds"] },
        { h: "Client responsibilities", items: ["Final copy + product assets"] },
      ],
    },
    Contract: {
      title: "Contract",
      groups: [
        { h: "Status", items: ["Approved by Northstar Studio · Sep 18"] },
        { h: "Terms", items: ["Fixed fee $8,500", "50% deposit, 50% on launch"] },
        { h: "Exclusions", items: ["Copywriting", "Ongoing maintenance"] },
      ],
    },
    "Working System": {
      title: "Your working system",
      groups: [
        { h: "Revision policy", items: ["2 design rounds included"] },
        { h: "Project phases", items: ["Discovery → Design → Build → QA → Launch"] },
        { h: "Pricing structure", items: ["Fixed project fee, change requests billed separately"] },
        { h: "Delivery process", items: ["Weekly Friday update", "Handoff doc + CMS walkthrough"] },
      ],
    },
  };

/* ------------------------------------------------------------------ */
/* small pieces                                                        */
/* ------------------------------------------------------------------ */

function Tag({ label }: { label: string }) {
  return (
    <span
      className="rounded-full border-2 border-ink px-2 py-0.5 text-[9.5px] font-bold uppercase tracking-[0.08em] text-ink"
      style={{ backgroundColor: TAG_TONE[label] ?? "#FCF6ED" }}
    >
      {label}
    </span>
  );
}

function TaskCard({ task }: { task: Task }) {
  return (
    <li
      data-task
      className="rounded-xl border-2 border-ink bg-card px-3 py-2.5 transition-transform duration-200 hover:-translate-y-0.5"
      style={{ boxShadow: "4px 4px 0px #111111" }}
    >
      <p className="flex items-start gap-1.5 text-[12.5px] font-semibold leading-snug text-ink">
        {task.done && <span aria-hidden>✓</span>}
        {task.name}
      </p>

      {(task.tag || task.due) && (
        <div data-task-meta className="mt-2 flex items-center justify-between gap-2">
          {task.tag ? <Tag label={task.tag} /> : <span />}
          {task.due && <span className="text-[10.5px] text-ink-soft">{task.due}</span>}
        </div>
      )}

      {task.note && <p className="mt-2 text-[10.5px] text-ink-soft">{task.note}</p>}

      {typeof task.progress === "number" && (
        <div data-task-meta className="mt-2.5 flex items-center gap-2">
          <span className="h-2 flex-1 overflow-hidden rounded-full border-2 border-ink bg-cream">
            <span
              className="block h-full bg-mint"
              style={{ width: `${task.progress}%` }}
            />
          </span>
          <span className="text-[10px] font-bold text-ink">{task.progress}%</span>
        </div>
      )}
    </li>
  );
}

/* ------------------------------------------------------------------ */
/* section                                                             */
/* ------------------------------------------------------------------ */

export function Workspace() {
  const root = useRef<HTMLElement | null>(null);
  const [active, setActive] = useState<NavItem>("Overview");
  const panel = PANELS[active];

  useEffect(() => {
    const el = root.current;
    if (!el || !ensureGsap()) return;
    if (reducedMotion()) return;

    const q = <T extends Element>(s: string) => Array.from(el.querySelectorAll<T>(s));

    const ctx = gsap.context(() => {
      gsap.fromTo(
        q("[data-intro]"),
        { opacity: 0, y: 45 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: { trigger: el, start: "top 78%", once: true },
        },
      );

      const frame = el.querySelector("[data-frame]");
      const tl = gsap.timeline({
        scrollTrigger: { trigger: frame, start: "top 76%", once: true },
      });

      tl.fromTo(
        frame,
        { opacity: 0, y: 120, scale: 0.96 },
        { opacity: 1, y: 0, scale: 1, duration: 1, ease: "power3.out" },
      )
        .fromTo(
          q("[data-side]"),
          { opacity: 0, x: -18 },
          { opacity: 1, x: 0, duration: 0.45, ease: "power2.out", stagger: 0.07 },
          "-=0.5",
        )
        .fromTo(
          q("[data-head]"),
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.5, ease: "power2.out", stagger: 0.07 },
          "-=0.4",
        )
        .fromTo(
          q("[data-summary]"),
          { opacity: 0, y: -40, scale: 0.94 },
          { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "power3.out", stagger: 0.08 },
          "-=0.25",
        )
        .fromTo(
          "[data-progress-fill]",
          { scaleX: 0 },
          { scaleX: 1, transformOrigin: "left center", duration: 0.9, ease: "power2.inOut" },
          "-=0.2",
        )
        .fromTo(
          q("[data-milestone]"),
          { opacity: 0 },
          { opacity: 1, duration: 0.3, stagger: 0.08 },
          "-=0.8",
        )
        .fromTo(
          q("[data-agreed]"),
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.45, stagger: 0.07, ease: "power2.out" },
          "-=0.4",
        )
        .fromTo(
          q("[data-task]"),
          { opacity: 0, y: -120, rotate: 3 },
          {
            opacity: 1,
            y: 0,
            rotate: 0,
            duration: 0.55,
            ease: "back.out(1.15)",
            stagger: 0.09,
          },
          "-=0.2",
        )
        .fromTo(
          q("[data-task-meta]"),
          { opacity: 0 },
          { opacity: 1, duration: 0.3, stagger: 0.03 },
          "-=0.6",
        )
        .fromTo(
          "[data-ai]",
          { opacity: 0, x: 80 },
          { opacity: 1, x: 0, duration: 0.7, ease: "power3.out" },
          "-=0.5",
        )
        .fromTo(
          q("[data-ai-step]"),
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.4, ease: "power2.out", stagger: 0.09 },
          "-=0.35",
        );
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="px-3 pb-24 pt-10 sm:px-6 sm:pb-32">
      <div className="mx-auto mb-10 max-w-[46rem] text-center sm:mb-14">
        <span data-intro className="chip-brut inline-block bg-sky px-3 py-1 text-[11px] uppercase tracking-[0.2em]">
          Your project, after Charter
        </span>
        <h2 data-intro className="display mt-6 text-[2rem] sm:text-[3.2rem]">
          A workspace, not a chat window.
        </h2>
        <p data-intro className="mx-auto mt-5 max-w-[52ch] text-[15px] leading-[1.75] text-ink-soft sm:text-[16.5px]">
          Everything Charter learned about the client becomes one connected project — scope,
          documents, deadlines, tasks, decisions and an AI that already understands the engagement.
        </p>
      </div>

      <div
        data-frame
        className="mx-auto w-full max-w-[1560px] overflow-hidden rounded-[1.5rem] border-[3px] border-ink bg-card sm:rounded-[2rem]"
        style={{ boxShadow: "12px 12px 0px #111111" }}
      >
        {/* window chrome */}
        <div className="flex items-center gap-2 border-b-2 border-ink bg-cream px-4 py-2.5 sm:px-5 sm:py-3">
          <span className="h-3 w-3 rounded-full border-2 border-ink bg-coral" />
          <span className="h-3 w-3 rounded-full border-2 border-ink bg-butter" />
          <span className="h-3 w-3 rounded-full border-2 border-ink bg-mint" />
          <span className="ml-3 hidden text-[11px] font-semibold text-ink-soft sm:inline">
            charter.app / northstar-studio
          </span>
        </div>

        <div className="grid lg:grid-cols-[19%_minmax(0,1fr)_22%]">
          {/* ---------------- sidebar ---------------- */}
          <aside className="border-b-2 border-ink bg-cream p-4 lg:border-b-0 lg:border-r-2">
            <div data-side className="flex items-center gap-2">
              <CharterMark className="h-5 w-auto" />
              <span className="text-[11.5px] font-bold uppercase tracking-[0.18em]">Charter</span>
            </div>

            <div
              data-side
              className="mt-4 rounded-xl border-2 border-ink bg-card p-3"
              style={{ boxShadow: "3px 3px 0px #111111" }}
            >
              <p className="text-[12.5px] font-extrabold tracking-tight text-ink">
                Northstar Studio
              </p>
              <p className="text-[11px] text-ink-soft">Website Redesign</p>
              <span className="mt-2 inline-block rounded-full border-2 border-ink bg-mint px-2 py-0.5 text-[9.5px] font-bold uppercase tracking-[0.1em]">
                Active
              </span>
            </div>

            <nav aria-label="Project" className="mt-4 flex gap-2 overflow-x-auto lg:block lg:overflow-visible">
              {NAV.map((n) => {
                const on = n === active;
                return (
                  <button
                    key={n}
                    type="button"
                    data-side
                    onClick={() => setActive(n)}
                    aria-current={on ? "page" : undefined}
                    className={`mb-0 w-max shrink-0 rounded-xl border-2 px-3 py-2 text-left text-[12.5px] font-semibold transition-colors lg:mb-1.5 lg:w-full ${
                      on
                        ? "border-ink bg-lavender text-ink"
                        : "border-transparent text-ink-soft hover:border-ink hover:bg-cream"
                    }`}
                    style={on ? { boxShadow: "3px 3px 0px #111111" } : undefined}
                  >
                    {n}
                  </button>
                );
              })}
            </nav>
          </aside>

          {/* ---------------- main canvas ---------------- */}
          <div className="min-w-0 p-4 sm:p-6">
            <header className="flex flex-wrap items-start justify-between gap-3">
              <div data-head className="min-w-0">
                <p className="text-[10.5px] font-bold uppercase tracking-[0.18em] text-ink-soft">
                  Northstar Studio
                </p>
                <h3 className="text-[20px] font-extrabold leading-tight tracking-tight sm:text-[27px]">
                  Website Redesign &amp; Interactive Launch
                </h3>
                <p className="mt-1 text-[12px] text-ink-soft">Web Design + Development</p>
              </div>
              <div data-head className="flex items-center gap-2">
                <span className="chip-brut bg-mint px-3 py-1 text-[11px]">Active</span>
                <span className="chip-brut bg-cream px-3 py-1 text-[11px]">58% complete</span>
              </div>
            </header>

            {/* summary row */}
            <div className="mt-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
              {SUMMARY.map((s) => (
                <div
                  key={s.label}
                  data-summary
                  className="rounded-xl border-2 border-ink p-3 transition-transform duration-200 hover:scale-[1.02]"
                  style={{ backgroundColor: s.tone, boxShadow: "4px 4px 0px #111111" }}
                >
                  <p className="text-[9.5px] font-bold uppercase tracking-[0.14em] text-ink/70">
                    {s.label}
                  </p>
                  <p className="mt-1 text-[16px] font-extrabold tracking-tight text-ink sm:text-[18px]">
                    {s.value}
                  </p>
                  <p className="text-[10.5px] text-ink/70">{s.sub}</p>
                </div>
              ))}
            </div>

            {/* progress */}
            <div className="mt-5 rounded-xl border-2 border-ink bg-cream p-4">
              <div className="flex items-center justify-between">
                <p className="text-[10.5px] font-bold uppercase tracking-[0.14em] text-ink">
                  Project progress
                </p>
                <p className="text-[13px] font-extrabold">58%</p>
              </div>
              <div className="mt-2.5 h-3.5 overflow-hidden rounded-full border-2 border-ink bg-card">
                <span
                  data-progress-fill
                  className="block h-full rounded-full bg-lavender"
                  style={{ width: "58%" }}
                />
              </div>
              <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
                {MILESTONES.map((m) => (
                  <li
                    key={m.label}
                    data-milestone
                    className="flex items-center gap-1.5 text-[11px] font-semibold text-ink-soft"
                  >
                    <span aria-hidden className="text-ink">
                      {m.state}
                    </span>
                    {m.label}
                  </li>
                ))}
              </ul>
            </div>

            {/* context panel — overview shows "what we agreed", other tabs swap content */}
            {active === "Overview" || !panel ? (
              <div className="mt-5 rounded-xl border-2 border-ink bg-card p-4">
                <p className="text-[10.5px] font-bold uppercase tracking-[0.14em] text-ink">
                  What we agreed
                </p>
                <div className="mt-3 grid gap-4 sm:grid-cols-3">
                  {[
                    {
                      h: "Deliverables",
                      items: [
                        "5-page marketing website",
                        "Interactive homepage",
                        "CMS setup",
                        "Responsive development",
                      ],
                    },
                    { h: "Revision policy", items: ["2 design rounds"] },
                    {
                      h: "Client responsibilities",
                      items: ["Final copy", "Product assets", "Legal approval"],
                    },
                  ].map((g) => (
                    <div key={g.h} data-agreed>
                      <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-ink-soft">
                        {g.h}
                      </p>
                      <ul className="mt-2 flex flex-wrap gap-1.5">
                        {g.items.map((it) => (
                          <li
                            key={it}
                            className="rounded-full border-2 border-ink bg-cream px-2.5 py-1 text-[11px] font-medium text-ink"
                          >
                            {it}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="mt-5 rounded-xl border-2 border-ink bg-card p-4">
                <p className="text-[10.5px] font-bold uppercase tracking-[0.14em] text-ink">
                  {panel.title}
                </p>
                <div className="mt-3 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {panel.groups.map((g) => (
                    <div key={g.h}>
                      <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-ink-soft">
                        {g.h}
                      </p>
                      <ul className="mt-2 space-y-1.5">
                        {g.items.map((it) => (
                          <li
                            key={it}
                            className="rounded-lg border-2 border-ink bg-cream px-2.5 py-1.5 text-[11.5px] font-medium text-ink"
                          >
                            {it}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* next up strip */}
            <div className="mt-5 flex flex-wrap items-center gap-2 rounded-xl border-2 border-ink bg-cream px-3 py-2.5">
              <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-ink">
                Next up
              </span>
              {[
                ["Oct 4", "Homepage development"],
                ["Oct 6", "3D animation"],
                ["Oct 10", "Responsive QA"],
              ].map(([d, t]) => (
                <span
                  key={t}
                  className="rounded-full border-2 border-ink bg-card px-2.5 py-1 text-[11px] text-ink"
                >
                  <b>{d}</b> · {t}
                </span>
              ))}
            </div>

            {/* execution board */}
            <div className="mt-6">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h4 className="text-[13px] font-extrabold uppercase tracking-[0.14em] text-ink">
                  Project execution
                </h4>
                <p className="text-[11.5px] text-ink-soft">Generated from the approved scope.</p>
              </div>

              <div className="mt-3 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                {COLUMNS.map((col) => (
                  <div key={col.title} className="rounded-xl border-2 border-ink bg-cream p-3">
                    <div className="mb-2.5 flex items-center gap-2">
                      <span
                        className="h-2.5 w-2.5 rounded-full border-2 border-ink"
                        style={{ backgroundColor: col.dot }}
                      />
                      <span className="text-[10.5px] font-bold uppercase tracking-[0.12em] text-ink">
                        {col.title}
                      </span>
                      <span className="ml-auto text-[10.5px] text-ink-soft">{col.tasks.length}</span>
                    </div>
                    <ul className="space-y-2.5">
                      {col.tasks.map((t) => (
                        <TaskCard key={t.name} task={t} />
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* recent activity */}
            <div className="mt-5 rounded-xl border-2 border-ink bg-card p-4">
              <p className="text-[10.5px] font-bold uppercase tracking-[0.14em] text-ink">
                Recent activity
              </p>
              <ul className="mt-2.5 space-y-1.5">
                {ACTIVITY.map((a) => (
                  <li key={a.what} className="flex gap-3 text-[11.5px] text-ink-soft">
                    <span className="w-[4.5rem] shrink-0 font-semibold text-ink">{a.when}</span>
                    <span>{a.what}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* ---------------- AI panel ---------------- */}
          <aside data-ai className="border-t-2 border-ink bg-cream p-4 lg:border-l-2 lg:border-t-0">
            <div className="flex items-center gap-2">
              <span className="grid h-7 w-7 place-items-center rounded-full border-2 border-ink bg-card">
                <CharterMark className="h-3.5 w-auto" />
              </span>
              <span className="text-[12.5px] font-extrabold tracking-tight">Charter AI</span>
            </div>
            <p
              data-ai-step
              className="mt-2 inline-block rounded-full border-2 border-ink bg-mint px-2.5 py-0.5 text-[9.5px] font-bold uppercase tracking-[0.1em]"
            >
              Project context active
            </p>

            <div data-ai-step className="mt-4 rounded-xl border-2 border-ink bg-card p-3">
              <p className="text-[10.5px] font-bold uppercase tracking-[0.12em] text-ink-soft">
                Charter knows
              </p>
              <ul className="mt-2 space-y-1">
                {CONTEXT_CHECKS.map((c) => (
                  <li key={c} className="flex items-center gap-2 text-[11.5px] text-ink">
                    <span aria-hidden className="font-bold">
                      ✓
                    </span>
                    {c}
                  </li>
                ))}
              </ul>
            </div>

            <div
              data-ai-step
              className="mt-4 rounded-xl border-2 border-ink bg-lavender p-3"
              style={{ boxShadow: "5px 5px 0px #111111" }}
            >
              <p className="text-[12px] leading-[1.6] text-ink">
                I found one requested deliverable in the latest client notes that isn&rsquo;t
                included in the approved scope.
              </p>
              <p className="mt-2 text-[12px] leading-[1.6] text-ink/75">
                Would you like me to draft a change request?
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <span
                  className="btn-brut px-3 py-1.5 text-[11.5px]"
                  style={{ ["--btn-shadow" as string]: "#FFFDF8" }}
                >
                  Review change
                </span>
                <span className="btn-brut-soft bg-card px-3 py-1.5 text-[11.5px]">Dismiss</span>
              </div>
              <p className="mt-3 text-[10.5px] text-ink/70">Nothing changes until you approve it.</p>
            </div>

            <div data-ai-step className="mt-4">
              <p className="text-[10.5px] font-bold uppercase tracking-[0.12em] text-ink">
                Ask Charter
              </p>
              <p className="input-brut mt-2 w-full px-3.5 py-2.5 text-[12px] text-ink-soft">
                Ask about this project…
              </p>
              <ul className="mt-2.5 flex flex-wrap gap-1.5">
                {QUICK_ACTIONS.map((a) => (
                  <li
                    key={a}
                    className="group rounded-full border-2 border-ink bg-card px-2.5 py-1 text-[11px] font-medium text-ink"
                  >
                    {a}
                  </li>
                ))}
              </ul>
            </div>

            <div
              data-ai-step
              className="mt-4 rounded-xl border-2 border-ink bg-peach p-3"
              style={{ boxShadow: "4px 4px 0px #111111" }}
            >
              <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-ink">
                Upcoming risk
              </p>
              <p className="mt-1.5 text-[12px] leading-[1.55] text-ink">
                Client copy is still missing.
              </p>
              <p className="mt-1.5 text-[11px] text-ink/75">Affects: CMS population, QA, launch</p>
              <span className="group mt-2.5 inline-flex items-center gap-1 text-[11.5px] font-bold text-ink underline decoration-2 underline-offset-2">
                Ask client for copy
                <span aria-hidden className="transition-transform duration-200 group-hover:translate-x-1">
                  →
                </span>
              </span>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
