import { useEffect, useRef, type ReactNode } from "react";
import { CharterMark } from "./Brand";
import { gsap, ensureGsap, reducedMotion } from "@/lib/motion";

/* ------------------------------------------------------------------ */
/* small shared pieces                                                 */
/* ------------------------------------------------------------------ */

function Pin({ tone }: { tone: string }) {
  return (
    <span
      data-pin
      aria-hidden
      className="absolute -top-4 left-8 grid h-9 w-9 place-items-center rounded-full border-[3px] border-ink"
      style={{ backgroundColor: tone, boxShadow: "3px 3px 0px #111111" }}
    >
      <span className="h-2.5 w-2.5 rounded-full border-2 border-ink bg-cream" />
    </span>
  );
}

type CardProps = {
  index: number;
  tone: string;
  category: string;
  title: string;
  align: string;
  width: string;
  children: ReactNode;
  body: ReactNode;
};

function StepCard({ index, tone, category, title, align, width, children, body }: CardProps) {
  return (
    <div className={`relative ${align} ${width}`}>
      <article
        data-card
        className="relative rounded-[26px] border-[3px] border-ink bg-card p-5 pt-7 sm:p-8 sm:pt-9"
        style={{ boxShadow: "10px 10px 0px #111111" }}
      >
        <Pin tone={tone} />

        <div className="flex items-baseline gap-3">
          <span className="text-[13px] font-extrabold tracking-[0.18em] text-ink">
            {String(index).padStart(2, "0")}
          </span>
          <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-ink-soft">
            {category}
          </span>
        </div>

        <h3 className="mt-3 max-w-[20ch] text-[24px] font-extrabold leading-[1.12] tracking-tight text-ink sm:text-[32px]">
          {title}
        </h3>

        <div className="mt-4 max-w-[52ch] space-y-3 text-[14.5px] leading-[1.7] text-ink-soft sm:text-[15.5px]">
          {body}
        </div>

        <div
          className="mt-6 rounded-[20px] border-2 border-ink p-4 sm:p-5"
          style={{ backgroundColor: tone }}
        >
          {children}
        </div>
      </article>
    </div>
  );
}

function Connector({ flip }: { flip?: boolean }) {
  return (
    <div aria-hidden className="pointer-events-none relative h-24 w-full sm:h-32">
      <svg
        viewBox="0 0 200 120"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
        fill="none"
      >
        <path
          data-connector
          d={
            flip
              ? "M150,4 C150,50 50,58 50,116"
              : "M50,4 C50,50 150,58 150,116"
          }
          stroke="#111111"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray="7 9"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      <svg
        viewBox="0 0 200 120"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
        fill="none"
      >
        <path
          data-arrow
          d={flip ? "M42,104 L50,116 L58,104" : "M142,104 L150,116 L158,104"}
          stroke="#111111"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  );
}

const chip =
  "inline-flex items-center gap-1.5 rounded-full border-2 border-ink bg-card px-2.5 py-1 text-[11.5px] font-bold text-ink";

/* ------------------------------------------------------------------ */
/* section                                                             */
/* ------------------------------------------------------------------ */

export function Flow() {
  const root = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = root.current;
    if (!el || !ensureGsap()) return;

    const cards = Array.from(el.querySelectorAll<HTMLElement>("[data-card]"));
    const connectors = Array.from(el.querySelectorAll<SVGPathElement>("[data-connector]"));
    const arrows = Array.from(el.querySelectorAll<SVGPathElement>("[data-arrow]"));
    const rest = [-2, 2, -1, 2.5, -1];

    if (reducedMotion()) {
      cards.forEach((c, i) => gsap.set(c, { rotate: rest[i] ?? 0 }));
      return;
    }

    const from = [
      { x: -90, y: 50, rotate: -6, opacity: 0, scale: 1 },
      { x: 100, y: 70, rotate: 6, opacity: 0, scale: 1 },
      { x: 0, y: 90, rotate: -3, opacity: 0, scale: 0.88 },
      { x: 100, y: 40, rotate: 5, opacity: 0, scale: 1 },
      { x: 0, y: 100, rotate: 1, opacity: 0, scale: 0.92 },
    ];

    const ctx = gsap.context(() => {
      cards.forEach((card, i) => {
        const pin = card.querySelector("[data-pin]");
        const micro = card.querySelectorAll("[data-micro]");

        const tl = gsap.timeline({
          scrollTrigger: { trigger: card, start: "top 82%", once: true },
        });

        tl.fromTo(
          card,
          from[i] ?? from[0],
          {
            x: 0,
            y: 0,
            scale: 1,
            opacity: 1,
            rotate: rest[i] ?? 0,
            duration: 0.85,
            ease: "power3.out",
          },
        )
          .fromTo(
            pin,
            { scale: 0, y: -12, opacity: 0 },
            { scale: 1, y: 0, opacity: 1, duration: 0.4, ease: "back.out(2)" },
            "-=0.55",
          )
          .fromTo(
            micro,
            { opacity: 0, y: 10 },
            { opacity: 1, y: 0, duration: 0.45, ease: "power2.out", stagger: 0.09 },
            "-=0.3",
          );
      });

      connectors.forEach((path, i) => {
        const len = path.getTotalLength();
        gsap.set(path, { strokeDasharray: "7 9", strokeDashoffset: len, opacity: 0.85 });
        gsap.to(path, {
          strokeDashoffset: 0,
          duration: 1,
          ease: "none",
          scrollTrigger: { trigger: path.ownerSVGElement, start: "top 85%", once: true },
        });
        const arrow = arrows[i];
        if (arrow) {
          gsap.fromTo(
            arrow,
            { opacity: 0, y: -8 },
            {
              opacity: 1,
              y: 0,
              duration: 0.35,
              delay: 0.7,
              ease: "power2.out",
              scrollTrigger: { trigger: path.ownerSVGElement, start: "top 85%", once: true },
            },
          );
        }
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="how-it-works"
      ref={root}
      className="mx-auto max-w-[84rem] overflow-hidden px-5 pb-10 pt-20 sm:px-8 sm:pt-28"
    >
      <div className="max-w-[46rem]">
        <span className="chip-brut bg-butter px-3 py-1 text-[11px] uppercase tracking-[0.2em]">
          How Charter works
        </span>
        <h2 className="display mt-6 text-[2rem] sm:text-[3.2rem]">
          From client call to a project you can actually run.
        </h2>
        <p className="mt-5 max-w-[50ch] text-[15.5px] leading-[1.75] text-ink-soft sm:text-[17px]">
          Charter takes the messy information around a client project and turns it into the
          documents, decisions and work you need to move forward.
        </p>
      </div>

      <div className="mt-14 sm:mt-20">
        {/* 01 -------------------------------------------------------- */}
        <StepCard
          index={1}
          tone="#F5C8C4"
          category="The client call"
          title="Start with the conversation."
          align="ml-0 lg:ml-[2%]"
          width="max-w-[34rem]"
          body={
            <>
              <p>
                Your client already told you what they want — deliverables, deadlines, references,
                changes and expectations. You don&rsquo;t need to rebuild that context from scratch.
              </p>
              <p className="accent-serif text-[16px] italic text-ink">
                The project already exists inside the conversation.
              </p>
            </>
          }
        >
          <div className="flex flex-wrap items-center gap-2">
            <span data-micro className={chip}>
              <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5" aria-hidden>
                <path
                  d="M5 4h4l2 5-3 2a12 12 0 006 6l2-3 5 2v4a1 1 0 01-1 1A17 17 0 014 5a1 1 0 011-1z"
                  stroke="#111"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
              </svg>
              20 min call
            </span>
            <span data-micro className={`${chip} -rotate-2`}>
              Landing page
            </span>
            <span data-micro className={`${chip} rotate-1`}>
              3D animation
            </span>
            <span data-micro className={`${chip} rotate-2`}>
              Launch Friday
            </span>
            <span data-micro className={`${chip} -rotate-1`}>
              2 revision rounds
            </span>
          </div>
          <div data-micro className="mt-4 flex items-end gap-2">
            <span className="rounded-2xl rounded-bl-md border-2 border-ink bg-card px-3 py-2 text-[12px] text-ink">
              &ldquo;Can we also get the hero moving?&rdquo;
            </span>
            <span className="h-2 w-2 rounded-full border-2 border-ink bg-card" />
          </div>
        </StepCard>

        <Connector />

        {/* 02 -------------------------------------------------------- */}
        <StepCard
          index={2}
          tone="#9ECCF0"
          category="Give Charter context"
          title="Drop in everything you already have."
          align="ml-auto mr-0 lg:mr-[3%]"
          width="max-w-[34rem]"
          body={
            <>
              <p>
                Add your call notes, messages, client brief, reference files, pricing, previous
                documents and the way you normally work. Charter uses all of it as project context.
              </p>
              <p className="font-semibold text-ink">
                No copying everything into another system by hand.
              </p>
            </>
          }
        >
          <div className="flex flex-wrap gap-2">
            {[
              { l: "Meeting notes", r: "-3deg" },
              { l: "Client brief", r: "2deg" },
              { l: "Pricing", r: "-1deg" },
              { l: "Messages", r: "3deg" },
              { l: "Reference file", r: "-2deg" },
              { l: "Past contract", r: "1deg" },
            ].map((d) => (
              <span
                key={d.l}
                data-micro
                className="rounded-lg border-2 border-ink bg-card px-2.5 py-2 text-[11.5px] font-semibold text-ink"
                style={{ transform: `rotate(${d.r})`, boxShadow: "3px 3px 0px #111111" }}
              >
                {d.l}
              </span>
            ))}
          </div>
        </StepCard>

        <Connector flip />

        {/* 03 -------------------------------------------------------- */}
        <StepCard
          index={3}
          tone="#C9BBEF"
          category="Charter builds the foundation"
          title="Turn context into the documents that start the project."
          align="mx-auto"
          width="max-w-[46rem]"
          body={
            <>
              <p>
                Charter understands the engagement and drafts the documents you need — based on what
                was actually discussed.
              </p>
              <p className="font-semibold text-ink">Everything stays editable.</p>
              <p>
                Review the wording, change the scope, adjust pricing or rewrite any section before it
                goes anywhere.
              </p>
              <p className="accent-serif text-[16px] italic text-ink">
                AI drafts. You decide what becomes final.
              </p>
            </>
          }
        >
          <div className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_auto]">
            <div className="flex flex-wrap gap-2">
              {[
                "Scope of Work",
                "Contract",
                "NDA",
                "Project Scope",
                "Deliverables",
                "Timeline & Responsibilities",
              ].map((d) => (
                <span key={d} data-micro className={chip}>
                  <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none" aria-hidden>
                    <rect x="2" y="2" width="12" height="12" rx="3" stroke="#111" strokeWidth="2" />
                    <path d="M5 8l2 2 4-4" stroke="#111" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                  {d}
                </span>
              ))}
            </div>

            <div className="relative h-[8.5rem] w-full sm:w-[11rem]">
              {[
                { t: "NDA", x: "1.6rem", y: "0rem", r: "6deg" },
                { t: "Contract", x: "0.8rem", y: "0.9rem", r: "-4deg" },
                { t: "Scope of Work", x: "0rem", y: "1.9rem", r: "1deg" },
              ].map((s) => (
                <div
                  key={s.t}
                  data-micro
                  className="absolute w-[9.5rem] rounded-xl border-2 border-ink bg-card p-2.5"
                  style={{
                    left: s.x,
                    top: s.y,
                    transform: `rotate(${s.r})`,
                    boxShadow: "4px 4px 0px #111111",
                  }}
                >
                  <p className="text-[11px] font-extrabold tracking-tight text-ink">{s.t}</p>
                  <span className="mt-2 block h-1 w-full rounded-full bg-ink/15" />
                  <span className="mt-1 block h-1 w-3/4 rounded-full bg-ink/15" />
                  <span className="mt-1 block h-1 w-1/2 rounded-full bg-ink/15" />
                  {s.t === "Scope of Work" && (
                    <span className="mt-2 inline-flex items-center gap-1 rounded-full border-2 border-ink bg-butter px-2 py-0.5 text-[9.5px] font-bold">
                      ✎ Edit
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </StepCard>

        <Connector />

        {/* 04 -------------------------------------------------------- */}
        <StepCard
          index={4}
          tone="#FFE7AB"
          category="Client approval"
          title="Send it when you're ready."
          align="ml-auto mr-0 lg:mr-[2%]"
          width="max-w-[34rem]"
          body={
            <>
              <p>
                Once the scope or contract looks right, send it to your client for review. They can
                open it, understand exactly what was agreed and approve it without a complicated new
                workflow.
              </p>
              <p className="font-semibold text-ink">You stay in control of what gets sent.</p>
            </>
          }
        >
          <div data-micro className="rounded-xl border-2 border-ink bg-card p-3">
            <div className="flex items-center justify-between gap-3">
              <p className="text-[12px] font-extrabold tracking-[0.12em] text-ink">CLIENT REVIEW</p>
              <span className="rounded-full border-2 border-ink bg-mint px-2 py-0.5 text-[10.5px] font-bold">
                Approved ✓
              </span>
            </div>
            <span className="mt-3 block h-1.5 w-full rounded-full bg-ink/12" />
            <span className="mt-1.5 block h-1.5 w-2/3 rounded-full bg-ink/12" />
            <div className="mt-4 flex items-center gap-2">
              <span className="btn-brut px-3 py-1.5 text-[12px]" style={{ ["--btn-shadow" as string]: "#A8E0D2" }}>
                Approve
              </span>
              <span className="text-[11.5px] text-ink-soft">Waiting for approval</span>
            </div>
          </div>
          <div data-micro className="mt-3 flex items-center gap-2 text-[11px] font-bold text-ink">
            <span className="rounded-full border-2 border-ink bg-card px-2 py-0.5">Draft</span>
            <span aria-hidden>→</span>
            <span className="rounded-full border-2 border-ink bg-card px-2 py-0.5">Sent</span>
            <span aria-hidden>→</span>
            <span className="rounded-full border-2 border-ink bg-mint px-2 py-0.5">Approved ✓</span>
          </div>
        </StepCard>

        <Connector flip />

        {/* 05 -------------------------------------------------------- */}
        <StepCard
          index={5}
          tone="#A8E0D2"
          category="The project becomes a workspace"
          title="Now Charter helps you run the project."
          align="mx-auto lg:ml-[1%]"
          width="max-w-[50rem]"
          body={
            <>
              <p>
                The approved scope becomes an organized project workspace with the information,
                documents and task plan already connected.
              </p>
              <p>
                And because Charter already understands the project, you don&rsquo;t have to explain
                everything again every time you need help.
              </p>
              <p className="accent-serif text-[17px] italic text-ink">
                One client. One context. One workspace.
              </p>
            </>
          }
        >
          <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_16rem]">
            <div className="grid gap-3 sm:grid-cols-3">
              {[
                { t: "To do", items: ["Mobile QA", "Client feedback"], tone: "#F5C8C4" },
                { t: "In progress", items: ["Homepage build"], tone: "#FFE7AB" },
                { t: "Done", items: ["✓ Discovery", "✓ Scope approved"], tone: "#C5DBA9" },
              ].map((col) => (
                <div key={col.t} data-micro className="rounded-xl border-2 border-ink bg-card p-2.5">
                  <div className="mb-2 flex items-center gap-1.5">
                    <span
                      className="h-2.5 w-2.5 rounded-full border-2 border-ink"
                      style={{ backgroundColor: col.tone }}
                    />
                    <span className="text-[10.5px] font-bold uppercase tracking-[0.12em]">
                      {col.t}
                    </span>
                  </div>
                  <ul className="space-y-1.5">
                    {col.items.map((it) => (
                      <li
                        key={it}
                        className="rounded-lg border-2 border-ink bg-cream px-2 py-1.5 text-[11.5px] font-medium"
                      >
                        {it}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div
              data-micro
              className="rounded-xl border-2 border-ink bg-card p-3"
              style={{ boxShadow: "4px 4px 0px #111111" }}
            >
              <div className="flex items-center gap-2">
                <span className="grid h-6 w-6 place-items-center rounded-full border-2 border-ink bg-cream">
                  <CharterMark className="h-3 w-auto" />
                </span>
                <span className="text-[11.5px] font-extrabold">Charter</span>
              </div>
              <p className="mt-2 text-[12px] leading-[1.55] text-ink">
                &ldquo;Want me to break the homepage deliverable into tasks?&rdquo;
              </p>
              <span className="btn-brut mt-3 px-3 py-1.5 text-[11.5px]" style={{ ["--btn-shadow" as string]: "#9ECCF0" }}>
                Review
              </span>
              <ul className="mt-3 space-y-1 text-[11px] text-ink-soft">
                <li>&ldquo;Does the new request fit the approved scope?&rdquo;</li>
                <li>&ldquo;Draft a revision note.&rdquo;</li>
                <li>&ldquo;Summarize what&rsquo;s left before launch.&rdquo;</li>
              </ul>
            </div>
          </div>

          <ul className="mt-4 flex flex-wrap gap-2">
            {[
              "Clear task list",
              "Color-coded project states",
              "Project documents",
              "Client context",
              "Progress overview",
              "AI project assistant",
            ].map((o) => (
              <li key={o} data-micro className={chip}>
                {o}
              </li>
            ))}
          </ul>
        </StepCard>
      </div>
    </section>
  );
}
