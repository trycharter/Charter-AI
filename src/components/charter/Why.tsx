import { useEffect, useRef, type ReactNode } from "react";
import { CharterMark } from "./Brand";
import { gsap, ensureGsap, reducedMotion } from "@/lib/motion";

/* ------------------------------------------------------------------ */
/* shared bits                                                         */
/* ------------------------------------------------------------------ */

const tile =
  "rounded-xl border-2 border-ink bg-card px-3 py-2 text-[12px] font-semibold text-ink";

function Node({ children, tone }: { children: ReactNode; tone?: string }) {
  return (
    <span
      data-viz
      className="rounded-xl border-2 border-ink px-3 py-2 text-[12px] font-bold text-ink"
      style={{ backgroundColor: tone ?? "#FFFDF8", boxShadow: "3px 3px 0px #111111" }}
    >
      {children}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* per-card visuals                                                    */
/* ------------------------------------------------------------------ */

function VizContext() {
  return (
    <div className="relative rounded-2xl border-2 border-ink bg-card p-5">
      <div className="flex flex-wrap gap-2">
        {["Client preferences", "Past decisions", "Project history", "Your process", "Current state"].map(
          (l) => (
            <Node key={l}>{l}</Node>
          ),
        )}
      </div>
      <svg aria-hidden viewBox="0 0 300 60" className="mt-3 h-12 w-full" fill="none">
        {[40, 100, 150, 200, 260].map((x) => (
          <path
            key={x}
            data-draw
            d={`M${x},2 C${x},30 150,26 150,56`}
            stroke="#111"
            strokeWidth="2"
            strokeDasharray="5 6"
            strokeLinecap="round"
          />
        ))}
      </svg>
      <div
        data-viz
        className="mx-auto flex w-max items-center gap-2 rounded-xl border-2 border-ink bg-cream px-4 py-2.5"
        style={{ boxShadow: "5px 5px 0px #111111" }}
      >
        <CharterMark className="h-4 w-auto" />
        <span className="text-[12.5px] font-extrabold uppercase tracking-[0.12em]">
          Charter context
        </span>
      </div>
    </div>
  );
}

function VizLifecycle() {
  const stages = ["Conversation", "Decision", "Planning", "Execution", "Delivery"];
  return (
    <div className="rounded-2xl border-2 border-ink bg-card p-5">
      <svg aria-hidden viewBox="0 0 300 12" className="h-3 w-full" fill="none">
        <path
          data-draw
          d="M6,6 H294"
          stroke="#111"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>
      <ul className="mt-4 space-y-2">
        {stages.map((s, i) => (
          <li key={s} data-viz className="flex items-center gap-3">
            <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full border-2 border-ink bg-cream text-[11px] font-bold">
              {i + 1}
            </span>
            <span className={`${tile} flex-1`}>{s}</span>
          </li>
        ))}
      </ul>
      <p className="mt-4 text-[11.5px] font-semibold text-ink/70">
        One continuous project state — not five disconnected tools.
      </p>
    </div>
  );
}

function VizSignals() {
  const signals = [
    { l: "Potential scope change", t: "#C9BBEF" },
    { l: "Client dependency overdue", t: "#FFE7AB" },
    { l: "Upcoming deadline risk", t: "#F5C8C4" },
    { l: "Missing asset", t: "#9ECCF0" },
    { l: "Unresolved decision", t: "#A8E0D2" },
  ];
  return (
    <div className="rounded-2xl border-2 border-ink bg-card p-5">
      <p className="text-[10.5px] font-bold uppercase tracking-[0.14em] text-ink-soft">
        Project signals
      </p>
      <ul className="mt-3 space-y-2">
        {signals.map((s) => (
          <li
            key={s.l}
            data-viz
            className="flex items-center gap-3 rounded-xl border-2 border-ink px-3 py-2.5"
            style={{ backgroundColor: s.t, boxShadow: "3px 3px 0px #111111" }}
          >
            <span className="h-2.5 w-2.5 rounded-full border-2 border-ink bg-cream" />
            <span className="text-[12px] font-semibold text-ink">{s.l}</span>
            <span className="ml-auto text-[11px] font-bold text-ink/70">Review →</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function VizWorkingModel() {
  const mods = [
    "Communication style",
    "Delivery rhythm",
    "Revision rules",
    "Preferred structure",
    "Decision patterns",
    "Client process",
  ];
  return (
    <div className="rounded-2xl border-2 border-ink bg-card p-5">
      <p className="text-[10.5px] font-bold uppercase tracking-[0.14em] text-ink-soft">
        Your way of working
      </p>
      <div className="mt-3 grid grid-cols-2 gap-2">
        {mods.map((m) => (
          <span key={m} data-viz className={tile}>
            {m}
          </span>
        ))}
      </div>
      <svg aria-hidden viewBox="0 0 300 40" className="mt-3 h-10 w-full" fill="none">
        {[60, 150, 240].map((x) => (
          <path
            key={x}
            data-draw
            d={`M${x},2 C${x},24 150,16 150,38`}
            stroke="#111"
            strokeWidth="2"
            strokeDasharray="5 6"
            strokeLinecap="round"
          />
        ))}
      </svg>
      <div
        data-viz
        className="rounded-xl border-2 border-ink bg-cream px-4 py-2.5 text-center text-[12.5px] font-extrabold uppercase tracking-[0.12em]"
        style={{ boxShadow: "5px 5px 0px #111111" }}
      >
        Charter working model
      </div>
    </div>
  );
}

function VizAutonomy() {
  return (
    <div className="rounded-2xl border-2 border-ink bg-card p-5">
      <div className="flex flex-wrap items-center gap-2 text-[11px] font-bold uppercase tracking-[0.1em]">
        <span data-viz className="rounded-full border-2 border-ink bg-lavender px-3 py-1">
          Charter proposes
        </span>
        <span aria-hidden>→</span>
        <span data-viz className="rounded-full border-2 border-ink bg-butter px-3 py-1">
          You approve
        </span>
        <span aria-hidden>→</span>
        <span data-viz className="rounded-full border-2 border-ink bg-mint px-3 py-1">
          Project updates
        </span>
      </div>

      <div data-viz className="mt-4 space-y-2">
        <div className="rounded-xl border-2 border-ink bg-cream px-3 py-2.5">
          <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-ink-soft">
            Existing decision
          </p>
          <p className="text-[12.5px] text-ink">Two design rounds included</p>
        </div>
        <div
          className="rounded-xl border-2 border-ink px-3 py-2.5"
          style={{ backgroundColor: "#FFE7AB" }}
        >
          <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-ink/70">
            Proposed change
          </p>
          <p className="text-[12.5px] text-ink">Third round requested in latest client notes</p>
        </div>
      </div>

      <div data-viz className="mt-4 flex gap-2">
        <span className="btn-brut px-4 py-2 text-[12px]" style={{ ["--btn-shadow" as string]: "#A8E0D2" }}>
          Accept
        </span>
        <span className="btn-brut-soft bg-card px-4 py-2 text-[12px]">Reject</span>
      </div>
    </div>
  );
}

function VizRelationship() {
  return (
    <div className="rounded-2xl border-2 border-ink bg-card p-5">
      <div
        data-viz
        className="w-max rounded-xl border-2 border-ink bg-sky px-3 py-2 text-[12.5px] font-extrabold"
        style={{ boxShadow: "3px 3px 0px #111111" }}
      >
        Northstar Studio
      </div>
      <ul className="mt-3 space-y-2">
        {[
          ["Project 01", "Website Redesign"],
          ["Project 02", "Product Launch"],
          ["Project 03", "Growth Site"],
        ].map(([p, n]) => (
          <li key={p} data-viz className="flex items-center gap-3">
            <span className="w-[5.5rem] shrink-0 text-[11px] font-bold uppercase tracking-[0.1em] text-ink-soft">
              {p}
            </span>
            <span className={`${tile} flex-1`}>{n}</span>
          </li>
        ))}
      </ul>
      <svg aria-hidden viewBox="0 0 300 36" className="mt-2 h-9 w-full" fill="none">
        {[60, 150, 240].map((x) => (
          <path
            key={x}
            data-draw
            d={`M${x},2 C${x},20 150,14 150,34`}
            stroke="#111"
            strokeWidth="2"
            strokeDasharray="5 6"
            strokeLinecap="round"
          />
        ))}
      </svg>
      <div
        data-viz
        className="rounded-xl border-2 border-ink bg-cream px-4 py-2.5 text-center text-[12.5px] font-extrabold uppercase tracking-[0.12em]"
        style={{ boxShadow: "5px 5px 0px #111111" }}
      >
        Client memory
      </div>
    </div>
  );
}

function VizCompounding() {
  const steps = [
    { h: "Project 01", items: ["Basic working context"], tone: "#FFFDF8" },
    {
      h: "Project 05",
      items: ["Your process", "Your preferences", "Client history", "Decision patterns"],
      tone: "#C5DBA9",
    },
    { h: "Project 20", items: ["Pre-configured around you"], tone: "#A8E0D2" },
  ];
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {steps.map((s) => (
        <div
          key={s.h}
          data-viz
          className="rounded-2xl border-2 border-ink p-4"
          style={{ backgroundColor: s.tone, boxShadow: "5px 5px 0px #111111" }}
        >
          <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-ink/70">{s.h}</p>
          <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.12em] text-ink/60">
            Charter knows
          </p>
          <ul className="mt-2 space-y-1.5">
            {s.items.map((i) => (
              <li
                key={i}
                className="rounded-lg border-2 border-ink bg-cream px-2.5 py-1.5 text-[11.5px] font-semibold text-ink"
              >
                {i}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* cards                                                               */
/* ------------------------------------------------------------------ */

type Card = {
  no: string;
  eyebrow: string;
  title: string;
  body: ReactNode;
  strong: string;
  tone: string;
  layout: "left" | "right" | "center";
  viz: ReactNode;
};

const cards: Card[] = [
  {
    no: "01",
    eyebrow: "Persistent context",
    title: "It remembers the work, not just the last prompt.",
    body: (
      <>
        <p>
          Charter carries the full context of each client relationship forward — decisions,
          preferences, past conversations, working patterns and project history.
        </p>
        <p>You don&rsquo;t start every interaction by explaining the project again.</p>
      </>
    ),
    strong: "Every conversation starts where the last one ended.",
    tone: "#C9BBEF",
    layout: "left",
    viz: <VizContext />,
  },
  {
    no: "02",
    eyebrow: "End-to-end intelligence",
    title: "One intelligence layer across the entire freelance journey.",
    body: (
      <>
        <p>Most tools understand one step. Charter understands the relationship between all of them.</p>
        <p>
          What was discussed affects what gets planned. What gets approved affects what gets
          executed. What changes later is evaluated against everything that came before.
        </p>
      </>
    ),
    strong: "No isolated tools. No disconnected project memory.",
    tone: "#A8E0D2",
    layout: "right",
    viz: <VizLifecycle />,
  },
  {
    no: "03",
    eyebrow: "Agentic assistance",
    title: "It doesn't wait for you to notice everything.",
    body: (
      <>
        <p>
          Charter continuously reasons across the engagement and surfaces what deserves your
          attention — missing information, changing expectations, upcoming risk, unresolved
          decisions or work that may be drifting from the original agreement.
        </p>
        <p>It recommends the next move before small problems become expensive ones.</p>
      </>
    ),
    strong: "From reactive project management to proactive project intelligence.",
    tone: "#FFE7AB",
    layout: "center",
    viz: <VizSignals />,
  },
  {
    no: "04",
    eyebrow: "Adaptive working memory",
    title: "Charter learns how you work.",
    body: (
      <>
        <p>
          Your workflow isn&rsquo;t generic. Over time, Charter learns the way you structure
          engagements, communicate with clients, handle revisions, organize delivery and make
          decisions.
        </p>
        <p>The tenth project should require less explanation than the first.</p>
      </>
    ),
    strong: "Your operating system becomes part of the intelligence.",
    tone: "#9ECCF0",
    layout: "left",
    viz: <VizWorkingModel />,
  },
  {
    no: "05",
    eyebrow: "Human-supervised autonomy",
    title: "Autonomous enough to help. Controlled enough to trust.",
    body: (
      <>
        <p>
          Charter can reason, draft, organize, recommend and prepare actions across the project.
        </p>
        <p>
          But when something changes what your client sees, expects or agrees to, you remain the
          final authority.
        </p>
      </>
    ),
    strong: "AI moves the work forward. You decide what becomes real.",
    tone: "#F5C8C4",
    layout: "right",
    viz: <VizAutonomy />,
  },
  {
    no: "06",
    eyebrow: "Relationship-aware project management",
    title: "Every client becomes an intelligence layer of their own.",
    body: (
      <>
        <p>
          Charter doesn&rsquo;t treat every engagement like an empty workspace. Each client develops
          its own context — communication history, preferences, recurring decisions, project
          patterns and previous work.
        </p>
        <p>When the next project starts, the relationship doesn&rsquo;t reset to zero.</p>
      </>
    ),
    strong: "The workspace remembers the relationship, not just the project.",
    tone: "#FFBE98",
    layout: "left",
    viz: <VizRelationship />,
  },
  {
    no: "07",
    eyebrow: "Compounding intelligence",
    title: "The more you use Charter, the less software feels like software.",
    body: (
      <>
        <p>
          Traditional project tools wait for you to fill them in. Charter is designed to become
          increasingly useful as it understands more about your clients, your work and the way you
          operate.
        </p>
        <p>
          Less setup. Less repetition. Less translating your work into software. More context
          already waiting when you need it.
        </p>
      </>
    ),
    strong: "Charter becomes the operating layer between you, your clients and the work.",
    tone: "#C5DBA9",
    layout: "center",
    viz: <VizCompounding />,
  },
];

/* ------------------------------------------------------------------ */
/* section                                                             */
/* ------------------------------------------------------------------ */

export function Why() {
  const root = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = root.current;
    if (!el || !ensureGsap()) return;
    if (reducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.querySelectorAll("[data-intro]"),
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.09,
          scrollTrigger: { trigger: el, start: "top 82%", once: true },
        },
      );

      el.querySelectorAll<HTMLElement>("[data-card]").forEach((card, i) => {
        const odd = i % 2 === 0;
        const tl = gsap.timeline({
          scrollTrigger: { trigger: card, start: "top 80%", once: true },
        });

        tl.fromTo(
          card,
          { opacity: 0, x: odd ? -48 : 48, y: 60, rotate: odd ? -1.2 : 1.2 },
          { opacity: 1, x: 0, y: 0, rotate: 0, duration: 0.85, ease: "power3.out" },
        )
          .fromTo(
            card.querySelectorAll("[data-viz]"),
            { opacity: 0, y: 14 },
            { opacity: 1, y: 0, duration: 0.45, ease: "power2.out", stagger: 0.08 },
            "-=0.45",
          );

        const draws = card.querySelectorAll<SVGPathElement>("[data-draw]");
        draws.forEach((p) => {
          const len = p.getTotalLength();
          gsap.set(p, { strokeDashoffset: len });
          tl.to(p, { strokeDashoffset: 0, duration: 0.5, ease: "none" }, "-=0.35");
        });

        // previous card softens as the next one arrives
        gsap.fromTo(
          card,
          { scale: 1 },
          {
            scale: 0.97,
            ease: "none",
            immediateRender: false,
            scrollTrigger: {
              trigger: card,
              start: "bottom 55%",
              end: "bottom 5%",
              scrub: true,
            },
          },
        );
      });

      gsap.fromTo(
        el.querySelectorAll("[data-final]"),
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: { trigger: "[data-final-block]", start: "top 80%", once: true },
        },
      );
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="shell overflow-x-clip py-28 sm:py-36">
      <div className="max-w-[44rem]">
        <span data-intro className="chip-brut inline-block bg-pistachio px-3 py-1 text-[11px] uppercase tracking-[0.2em]">
          Why Charter
        </span>
        <h2 data-intro className="display mt-6 text-[clamp(2rem,4.3vw,3.4rem)]">
          Project management that thinks with you.
        </h2>
        <p data-intro className="display mt-2 max-w-[24ch] text-[1.45rem] font-medium text-ink/40 sm:text-[2.1rem]">
          Not another system you have to constantly explain yourself to.
        </p>
        <p data-intro className="mt-7 max-w-[56ch] text-[15.5px] font-normal leading-[1.8] text-ink-soft sm:text-[16.5px]">
          Charter carries context across the entire client relationship — learning how you work,
          reasoning across project information and helping move the engagement forward without
          losing the decisions that came before.
        </p>
      </div>

      <div className="mt-16 flex flex-col gap-14 sm:mt-24 sm:gap-20">
        {cards.map((c) => (
          <article
            key={c.no}
            data-card
            className="mx-auto w-full max-w-[1250px] rounded-[26px] border-[2.5px] border-ink p-6 sm:p-10"
            style={{ backgroundColor: c.tone, boxShadow: "8px 8px 0px #111111" }}
          >
            <div
              className={`grid items-center gap-7 ${
                c.layout === "center" ? "" : "lg:grid-cols-2 lg:gap-12"
              }`}
            >
              <div className={c.layout === "right" ? "lg:order-2" : undefined}>
                <div className="flex items-center gap-3">
                  <span
                    className="grid h-10 w-10 place-items-center rounded-full border-2 border-ink bg-cream text-[12px] font-extrabold"
                    style={{ boxShadow: "3px 3px 0px #111111" }}
                  >
                    {c.no}
                  </span>
                  <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-ink/70">
                    {c.eyebrow}
                  </span>
                </div>

                <h3 className="mt-5 max-w-[22ch] text-[24px] font-extrabold leading-[1.12] tracking-tight text-ink sm:text-[33px]">
                  {c.title}
                </h3>

                <div className="mt-5 max-w-[58ch] space-y-3 text-[14.5px] font-normal leading-[1.8] text-ink/80 sm:text-[15.5px]">
                  {c.body}
                </div>

                <p className="accent-serif mt-6 max-w-[40ch] text-[17px] italic text-ink sm:text-[20px]">
                  {c.strong}
                </p>
              </div>

              <div className={c.layout === "center" ? "mt-2" : undefined}>{c.viz}</div>
            </div>
          </article>
        ))}
      </div>

      {/* final typography moment */}
      <div data-final-block className="mx-auto mt-28 max-w-[54rem] text-center sm:mt-40">
        <p data-final className="text-[11px] font-bold uppercase tracking-[0.2em] text-ink-soft">
          The old model
        </p>
        <p data-final className="display mt-2 text-[1.6rem] font-medium text-ink/40 sm:text-[2.4rem]">
          You manage the software.
        </p>

        <p data-final className="mt-12 text-[11px] font-bold uppercase tracking-[0.2em] text-ink-soft">
          The Charter model
        </p>
        <p data-final className="display mt-2 text-[clamp(2rem,4.4vw,3.4rem)]">
          The software understands the work.
        </p>

        <p data-final className="mx-auto mt-10 max-w-[36ch] text-[16px] font-normal leading-[1.75] text-ink-soft sm:text-[17px]">
          You stay focused on the part only you can do.
        </p>
      </div>
    </section>
  );
}
