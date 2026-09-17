import { useSceneReveal } from "@/lib/motion";

const principles = [
  {
    no: "01",
    title: "Remembers the context",
    body: "Your services, client information, project scope, documents and current tasks stay connected.",
    tone: "var(--lavender)",
  },
  {
    no: "02",
    title: "Creates the work",
    body: "Turn project information into scopes, contracts and task plans instead of starting from blank pages.",
    tone: "var(--mint)",
  },
  {
    no: "03",
    title: "Never silently changes the deal",
    body: "When AI suggests changing something important, you review it before it becomes part of the project.",
    tone: "var(--butter)",
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

      <div className="mt-20 flex flex-col gap-16 sm:mt-28 sm:gap-24">
        {principles.map((p, i) => (
          <article
            key={p.no}
            data-reveal
            className={`grid gap-5 md:grid-cols-[auto_minmax(0,32rem)] md:gap-12 ${
              i === 1 ? "md:ml-[14%]" : i === 2 ? "md:ml-[28%]" : ""
            }`}
          >
            <div className="flex items-center gap-4">
              <span
                aria-hidden
                className="h-11 w-11 shrink-0 rounded-2xl"
                style={{ backgroundColor: p.tone }}
              />
              <span className="text-[12px] font-semibold uppercase tracking-[0.18em] text-ink/40">
                {p.no}
              </span>
            </div>
            <div>
              <h3 className="text-[22px] font-bold tracking-tight text-ink sm:text-[28px]">
                {p.title}
              </h3>
              <p className="mt-3 text-[15px] leading-[1.75] text-ink-soft sm:text-[17px]">{p.body}</p>
            </div>
          </article>
        ))}
      </div>

      <p
        data-reveal
        className="display mx-auto mt-28 max-w-[18ch] text-center text-[2.1rem] sm:mt-44 sm:text-[3.8rem] lg:text-[4.8rem]"
      >
        AI does the administrative thinking.{" "}
        <span className="text-ink/40">You make the final call.</span>
      </p>
    </section>
  );
}
