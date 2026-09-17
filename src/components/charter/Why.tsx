import { useSceneReveal } from "@/lib/motion";

const principles = [
  {
    no: "01",
    title: "Remembers the context",
    body: "Your services, client information, project scope, documents and current tasks stay connected.",
    tone: "var(--lavender)",
    className: "md:col-span-4 md:row-span-2",
    rotate: -1.5,
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="h-12 w-12 text-ink" aria-hidden>
        <rect x="6" y="10" width="26" height="30" rx="4" stroke="currentColor" strokeWidth="2.5" />
        <path d="M14 20h12M14 27h12M14 34h7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M32 16h8a2 2 0 012 2v20" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="42" cy="42" r="3" stroke="currentColor" strokeWidth="2.5" />
      </svg>
    ),
  },
  {
    no: "02",
    title: "Creates the work",
    body: "Turn project information into scopes, contracts and task plans instead of starting from blank pages.",
    tone: "var(--mint)",
    className: "md:col-span-8",
    rotate: 1,
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="h-12 w-12 text-ink" aria-hidden>
        <path d="M8 38l4-10 20-20 6 6-20 20-10 4z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
        <path d="M28 12l6 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M40 30l1.5 4.5L46 36l-4.5 1.5L40 42l-1.5-4.5L34 36l4.5-1.5L40 30z" fill="currentColor" />
      </svg>
    ),
  },
  {
    no: "03",
    title: "Never silently changes the deal",
    body: "When AI suggests changing something important, you review it before it becomes part of the project.",
    tone: "var(--butter)",
    className: "md:col-span-8",
    rotate: -1,
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="h-12 w-12 text-ink" aria-hidden>
        <rect x="8" y="8" width="20" height="20" rx="4" stroke="currentColor" strokeWidth="2.5" />
        <path d="M13 18l4 4 7-8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M24 34c6 0 10-3 14-8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M33 25l6 1-2 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export function Why() {
  const ref = useSceneReveal<HTMLElement>();

  return (
    <section ref={ref} className="mx-auto max-w-[84rem] px-5 py-28 sm:px-8 sm:py-40">
      <h2 className="display max-w-[16ch] text-[2.1rem] sm:text-[3.6rem] lg:text-[4.4rem]">
        <span data-reveal className="block">
          AI that understands the project.
        </span>
        <span data-reveal className="block text-ink/45">
          You stay in control.
        </span>
      </h2>

      <p
        data-reveal
        className="mt-8 max-w-[52ch] text-[16px] leading-[1.8] text-ink-soft sm:text-[18px]"
      >
        Charter AI isn&rsquo;t another chatbot sitting beside a task board. It works with the actual
        context of your client project to help you create, understand and update the work
        you&rsquo;re managing.
      </p>

      <div className="mt-16 grid gap-7 sm:mt-24 md:grid-cols-12">
        {principles.map((p) => (
          <article
            key={p.no}
            data-reveal
            className={`brut-hover relative rounded-[24px] border-[3px] border-ink p-6 sm:p-8 ${p.className}`}
            style={{
              backgroundColor: p.tone,
              boxShadow: "8px 8px 0px #111111",
              transform: `rotate(${p.rotate}deg)`,
            }}
          >
            <div className="flex items-start justify-between gap-6">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border-2 border-ink bg-cream text-[11px] font-bold tracking-[0.1em]">
                {p.no}
              </span>
              {p.icon}
            </div>
            <h3 className="mt-6 max-w-[18ch] text-[22px] font-extrabold tracking-tight text-ink sm:text-[30px]">
              {p.title}
            </h3>
            <p className="mt-3 max-w-[46ch] text-[15px] leading-[1.7] text-ink/75 sm:text-[17px]">
              {p.body}
            </p>
          </article>
        ))}
      </div>

      <p
        data-reveal
        className="display mx-auto mt-28 max-w-[18ch] text-center text-[2.1rem] sm:mt-40 sm:text-[3.8rem] lg:text-[4.8rem]"
      >
        AI does the administrative thinking.{" "}
        <span className="text-ink/40">You make the final call.</span>
      </p>
    </section>
  );
}
