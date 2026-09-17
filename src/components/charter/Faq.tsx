import { useState } from "react";
import { useSceneReveal } from "@/lib/motion";

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

export function Faq() {
  const ref = useSceneReveal<HTMLElement>({ y: 18, stagger: 0.05 });
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section ref={ref} className="mx-auto max-w-[62rem] px-5 py-24 sm:px-8 sm:py-32">
      <h2 data-reveal className="display text-[2rem] sm:text-[3rem]">
        Questions before you join?
      </h2>

      <div className="mt-10 sm:mt-14">
        {faqs.map((f, i) => {
          const isOpen = open === i;
          return (
            <div key={f.q} data-reveal className="border-b border-ink/10">
              <h3>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${i}`}
                  id={`faq-trigger-${i}`}
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-start justify-between gap-6 py-5 text-left"
                >
                  <span className="text-[16px] font-semibold tracking-tight text-ink sm:text-[19px]">
                    {f.q}
                  </span>
                  <span
                    aria-hidden
                    className={`mt-1 shrink-0 text-ink/40 transition-transform duration-300 ${
                      isOpen ? "rotate-45" : ""
                    }`}
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
                className="pb-6 pr-10"
              >
                <p className="text-[15px] leading-[1.75] text-ink-soft sm:text-[16px]">{f.a}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
