import { useRef, useState } from "react";
import { useSceneReveal, gsap, ensureGsap, reducedMotion } from "@/lib/motion";

const faqs = [
  {
    q: "What exactly is Charter AI?",
    a: "Charter AI is an AI-native project management workspace for freelancers. It turns messy client context into a structured scope, contract, task plan and organized project workspace.",
  },
  {
    q: "Who is Charter AI for?",
    a: "Charter AI is initially being built for freelancers who sell scoped client projects — including developers, designers, creative professionals and small independent studios.",
  },
  {
    q: "Does Charter AI replace my project management tool?",
    a: "Early versions focus on the workflow between client conversation and project execution. Charter AI helps turn unstructured project context into work you can manage.",
  },
  {
    q: "Can Charter AI send things to my clients automatically?",
    a: "Charter AI can draft and recommend changes, but important client-facing actions remain under your control.",
  },
  {
    q: "What information can I give Charter AI?",
    a: "Notes, project briefs, documents, client messages and other project context.",
  },
  {
    q: "Does the client need a Charter account?",
    a: "The product is being designed so clients can review important information without dealing with a complicated onboarding process.",
  },
  {
    q: "When will early access open?",
    a: "We are onboarding a small group of freelancers first. Join the early-access list to receive an invite.",
  },
];

const tones = [
  "var(--lavender)",
  "var(--cream)",
  "var(--mint)",
  "var(--cream)",
  "var(--butter)",
  "var(--cream)",
  "var(--sky)",
];

export function Faq() {
  const ref = useSceneReveal<HTMLElement>({ y: 18, stagger: 0.05 });
  const [open, setOpen] = useState<number | null>(0);
  const panels = useRef<(HTMLDivElement | null)[]>([]);

  function toggle(i: number) {
    const next = open === i ? null : i;
    setOpen(next);

    if (!ensureGsap() || reducedMotion()) return;
    const el = panels.current[i];
    if (!el) return;
    if (next === i) {
      gsap.fromTo(
        el,
        { height: 0, opacity: 0 },
        { height: "auto", opacity: 1, duration: 0.45, ease: "power2.out" },
      );
    }
  }

  return (
    <section ref={ref} className="mx-auto max-w-[62rem] px-5 py-24 sm:px-8 sm:py-32">
      <h2 data-reveal className="display text-[2rem] sm:text-[3rem]">
        Questions before you join?
      </h2>

      <div className="mt-10 flex flex-col gap-4 sm:mt-14">
        {faqs.map((f, i) => {
          const isOpen = open === i;
          return (
            <div
              key={f.q}
              data-reveal
              className="brut-hover rounded-[18px] border-2 border-ink"
              style={{
                backgroundColor: isOpen ? tones[i] : "#FFFDF8",
                boxShadow: isOpen ? "6px 6px 0px #111111" : "3px 3px 0px #111111",
              }}
            >
              <h3>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${i}`}
                  id={`faq-trigger-${i}`}
                  onClick={() => toggle(i)}
                  className="flex w-full items-center justify-between gap-6 px-5 py-4 text-left sm:px-6 sm:py-5"
                >
                  <span className="text-[16px] font-bold tracking-tight text-ink sm:text-[19px]">
                    {f.q}
                  </span>
                  <span
                    aria-hidden
                    className="grid h-8 w-8 shrink-0 place-items-center rounded-full border-2 border-ink bg-cream text-[16px] font-bold leading-none text-ink transition-transform duration-300"
                    style={{ transform: isOpen ? "rotate(45deg)" : "none" }}
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
                className="overflow-hidden px-5 pb-5 sm:px-6 sm:pb-6"
              >
                <p className="max-w-[62ch] border-t-2 border-ink/15 pt-4 text-[15px] leading-[1.75] text-ink/80 sm:text-[16px]">
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
