import { useEffect, useRef, useState } from "react";
import { gsap, ensureGsap, reducedMotion } from "@/lib/motion";

type Faq = { q: string; a: string; tone: string };

const faqs: Faq[] = [
  {
    q: "What exactly is Charter AI?",
    a: "Charter is an AI-native project management workspace for freelancers. You give Charter the information you already have — call notes, messages, briefs, files, pricing, previous documents and your normal way of working — and it turns that context into an organized client engagement you can actually run. Charter helps structure the project, prepare the essential project documents, organize the work and stay with you throughout delivery.",
    tone: "#C9BBEF",
  },
  {
    q: "How much setup do I actually have to do?",
    a: "Charter is designed around the information you already have rather than making you fill out another complicated project-management system. Add your client context and Charter does the organizing, structuring and drafting for you. Your job is mainly to review important decisions and approve anything that will affect the client.",
    tone: "#A8E0D2",
  },
  {
    q: "Does Charter manage the entire freelance project?",
    a: "That is the goal. Charter is designed to stay with the engagement from the first client conversation through planning, approval, execution and delivery. Instead of manually rebuilding the same project across documents, task managers and message threads, Charter keeps the context connected and helps move the project forward from one workspace.",
    tone: "#FFE7AB",
  },
  {
    q: "Is Charter just another AI chatbot?",
    a: "No. Chat is only one way to interact with Charter. The actual product is the workspace around it — your client context, project state, documents, decisions, tasks, deadlines and history. Charter’s AI works with those artifacts instead of trapping important project information inside a conversation thread.",
    tone: "#F5C8C4",
  },
  {
    q: "What can I give Charter as context?",
    a: "Anything that helps explain the engagement: call notes, client briefs, messages, PDFs, reference documents, pricing information, previous contracts, spreadsheets, project files and your own working process. Charter uses that information together so you do not have to repeatedly explain the same project.",
    tone: "#9ECCF0",
  },
  {
    q: "Does Charter learn how I work?",
    a: "Yes. Charter is designed to understand more than one project. Your preferred way of structuring engagements, communication style, revision process, pricing approach and working patterns can become reusable context. The idea is simple: your tenth Charter project should require less explanation than your first.",
    tone: "#FFBE98",
  },
  {
    q: "Will Charter make changes or contact my client automatically?",
    a: "Not for important client-facing decisions. Charter can reason, draft, organize, recommend and prepare actions, but you remain the final authority over anything that changes what the client sees, expects or agrees to. Charter can prepare the move; you decide when it becomes real.",
    tone: "#C5DBA9",
  },
  {
    q: "What does the client have to do?",
    a: "As little as possible. Charter is being designed so clients can review important project information and approve what needs approval without learning another complicated piece of software. The freelancer remains the primary Charter user.",
    tone: "#E3BFD9",
  },
  {
    q: "Does my client need a Charter account?",
    a: "For the initial version, no heavy client onboarding is required. Clients should be able to access the information they need through a simple secure experience rather than creating and maintaining another full project-management account.",
    tone: "#A0E4E0",
  },
  {
    q: "Does Charter replace Notion, Trello, ClickUp or other project-management tools?",
    a: "Charter is being built to handle the part traditional tools usually leave to you: understanding messy client context and turning it into a structured engagement. For many freelancers, Charter could eventually become the main place they run client projects. Early on, the focus is making that core workflow dramatically better rather than recreating every feature of a large project-management suite.",
    tone: "#F59C9A",
  },
  {
    q: "When will early access open?",
    a: "We’re starting with a small group of freelancers so we can watch how Charter performs on real client engagements and improve the product quickly. Join the waitlist and we’ll contact you as early-access spots open.",
    tone: "#FFE7AB",
  },
];

/* tiny black line-art, one per question */
function Icon({ i }: { i: number }) {
  const p = "none";
  const common = {
    fill: p,
    stroke: "#111111",
    strokeWidth: 1.7,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  const shapes = [
    <path key="a" d="M15 6a6 6 0 1 0 0 12" {...common} />, // charter-ish C
    <g key="b" {...common}>
      <path d="M5 15l7-7 7 7" />
      <path d="M12 8v9" />
      <path d="M4 19h16" />
    </g>,
    <g key="c" {...common}>
      <circle cx="6" cy="6" r="2" />
      <circle cx="18" cy="18" r="2" />
      <path d="M8 6h6a4 4 0 0 1 0 8H10a4 4 0 0 0 0 8" />
    </g>,
    <g key="d" {...common}>
      <path d="M4 5h16v10H9l-5 4z" />
      <path d="M9 8l6 5M15 8l-6 5" />
    </g>,
    <g key="e" {...common}>
      <path d="M6 4h8l4 4v12H6z" />
      <path d="M14 4v4h4M9 13h6M9 16h6" />
    </g>,
    <g key="f" {...common}>
      <circle cx="6" cy="7" r="2" />
      <circle cx="18" cy="7" r="2" />
      <circle cx="12" cy="17" r="2" />
      <path d="M7.5 8.5L11 15.5M16.5 8.5L13 15.5M8 7h8" />
    </g>,
    <g key="g" {...common}>
      <circle cx="12" cy="12" r="8" />
      <path d="M8.5 12.5l2.5 2.5 4.5-5" />
    </g>,
    <g key="h" {...common}>
      <circle cx="12" cy="8" r="3.2" />
      <path d="M5 20a7 7 0 0 1 14 0" />
    </g>,
    <g key="i" {...common}>
      <path d="M10 14a4 4 0 0 1 0-5.6l2-2a4 4 0 0 1 5.6 5.6L16 13.6" />
      <path d="M14 10a4 4 0 0 1 0 5.6l-2 2A4 4 0 0 1 6.4 12L8 10.4" />
    </g>,
    <g key="j" {...common}>
      <rect x="4" y="4" width="12" height="9" rx="1.5" />
      <rect x="8" y="11" width="12" height="9" rx="1.5" />
    </g>,
    <g key="k" {...common}>
      <rect x="3.5" y="6" width="17" height="12" rx="2" />
      <path d="M4 8l8 5.5L20 8" />
    </g>,
  ];
  return (
    <svg aria-hidden viewBox="0 0 24 24" className="h-5 w-5 shrink-0">
      {shapes[i % shapes.length]}
    </svg>
  );
}

export function Faq() {
  const root = useRef<HTMLElement | null>(null);
  const panels = useRef<(HTMLDivElement | null)[]>([]);
  const [open, setOpen] = useState<number | null>(0);

  useEffect(() => {
    const el = root.current;
    if (!el || !ensureGsap() || reducedMotion()) return;

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
          scrollTrigger: { trigger: el, start: "top 80%", once: true },
        },
      );

      gsap.fromTo(
        el.querySelectorAll("[data-faq]"),
        { opacity: 0, y: 35, rotate: (i: number) => (i % 2 ? 0.5 : -0.5) },
        {
          opacity: 1,
          y: 0,
          rotate: 0,
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.06,
          scrollTrigger: { trigger: "[data-faq-stack]", start: "top 85%", once: true },
        },
      );
    }, el);

    return () => ctx.revert();
  }, []);

  function toggle(i: number) {
    const next = open === i ? null : i;
    const prev = open;
    setOpen(next);

    if (!ensureGsap() || reducedMotion()) return;

    if (prev !== null && prev !== i) {
      const el = panels.current[prev];
      if (el) gsap.to(el, { height: 0, opacity: 0, duration: 0.4, ease: "power3.out" });
    }
    const el = panels.current[i];
    if (!el) return;
    if (next === i) {
      gsap.fromTo(
        el,
        { height: 0, opacity: 0 },
        { height: "auto", opacity: 1, duration: 0.55, ease: "power3.out" },
      );
      gsap.fromTo(
        el.querySelector("[data-answer]"),
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.5, delay: 0.1, ease: "power3.out" },
      );
    } else {
      gsap.to(el, { height: 0, opacity: 0, duration: 0.45, ease: "power3.out" });
    }
  }

  return (
    <section ref={root} className="mx-auto max-w-[75rem] px-5 py-24 sm:px-8 sm:py-32">
      <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
        <div>
          <span data-intro className="chip-brut inline-block bg-mauve px-3 py-1 text-[11px] uppercase tracking-[0.2em]">
            Questions, answered.
          </span>
          <h2 data-intro className="display mt-6 max-w-[16ch] text-[2.1rem] sm:text-[3.4rem]">
            Still figuring out if Charter fits the way you work?
          </h2>
        </div>
        <p data-intro className="max-w-[40ch] text-[15.5px] leading-[1.8] text-ink-soft sm:text-[17px]">
          Here&rsquo;s what most freelancers want to know before trying it — everything you need
          before handing Charter your first client project.
        </p>
      </div>

      <div data-faq-stack className="mx-auto mt-12 flex max-w-[72rem] flex-col gap-4 sm:mt-16 sm:gap-5">
        {faqs.map((f, i) => {
          const isOpen = open === i;
          const n = String(i + 1).padStart(2, "0");
          return (
            <div
              key={f.q}
              data-faq
              className="group rounded-[22px] border-[2.5px] border-ink transition-[transform,box-shadow,background-color] duration-300 hover:-translate-y-0.5"
              style={{
                backgroundColor: isOpen ? f.tone : "#FFFDF8",
                boxShadow: isOpen ? "4px 4px 0px #111111" : "6px 6px 0px #111111",
              }}
            >
              <h3>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${i}`}
                  id={`faq-trigger-${i}`}
                  onClick={() => toggle(i)}
                  className="flex w-full items-center gap-4 px-4 py-4 text-left sm:gap-5 sm:px-6 sm:py-6"
                >
                  <span
                    aria-hidden
                    className="grid h-8 w-10 shrink-0 place-items-center rounded-full border-2 border-ink text-[11px] font-extrabold tracking-[0.06em] text-ink sm:h-9 sm:w-11 sm:text-[12px]"
                    style={{ backgroundColor: isOpen ? "#FFFDF8" : f.tone }}
                  >
                    {n}
                  </span>

                  <span className="flex min-w-0 flex-1 items-center gap-3 transition-transform duration-300 group-hover:translate-x-1">
                    <span className="hidden sm:block">
                      <Icon i={i} />
                    </span>
                    <span className="text-[17px] font-bold leading-snug tracking-tight text-ink sm:text-[24px]">
                      {f.q}
                    </span>
                  </span>

                  <span
                    aria-hidden
                    className="grid h-8 w-8 shrink-0 place-items-center rounded-full border-2 border-ink bg-cream text-[17px] font-bold leading-none text-ink transition-transform duration-300 sm:h-9 sm:w-9"
                    style={{ transform: isOpen ? "rotate(45deg)" : undefined }}
                  >
                    +
                  </span>
                </button>
              </h3>

              <div
                id={`faq-panel-${i}`}
                role="region"
                aria-labelledby={`faq-trigger-${i}`}
                hidden={!isOpen}
                ref={(node) => {
                  panels.current[i] = node;
                }}
                className="overflow-hidden"
              >
                <p
                  data-answer
                  className="mx-4 mb-5 max-w-[68ch] border-t-2 border-ink/15 pt-4 text-[15px] leading-[1.8] text-ink/80 sm:mx-6 sm:mb-7 sm:ml-[4.6rem] sm:text-[17px]"
                >
                  {f.a}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
