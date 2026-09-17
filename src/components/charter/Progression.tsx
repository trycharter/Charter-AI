import { useSceneReveal } from "@/lib/motion";

const steps = [
  { label: "Messy input", tone: "var(--blush)" },
  { label: "Clear scope", tone: "var(--lavender)" },
  { label: "Contract", tone: "var(--butter)" },
  { label: "Approval", tone: "var(--peach)" },
  { label: "Tasks", tone: "var(--mint)" },
  { label: "Workspace", tone: "var(--sky)" },
];

const tilt = [-3, 2, -2, 3, -2, 2];

export function Progression() {
  const ref = useSceneReveal<HTMLElement>({ y: 18, stagger: 0.07 });

  return (
    <section ref={ref} className="mx-auto max-w-[84rem] px-5 py-24 sm:px-8 sm:py-32">
      <ol className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between md:gap-2">
        {steps.map((s, i) => (
          <li key={s.label} data-reveal className="flex items-center gap-4 md:flex-col md:gap-3">
            <span
              className="brut-hover flex items-center gap-2 rounded-2xl border-2 border-ink px-3.5 py-2 md:flex-col md:px-4 md:py-3"
              style={{
                backgroundColor: s.tone,
                boxShadow: "4px 4px 0px #111111",
                transform: `rotate(${tilt[i]}deg)`,
              }}
            >
              <span
                aria-hidden
                className="grid h-6 w-6 shrink-0 place-items-center rounded-full border-2 border-ink bg-cream text-[10px] font-bold"
              >
                {i + 1}
              </span>
              <span className="whitespace-nowrap text-[13.5px] font-bold tracking-tight text-ink md:text-[14px]">
                {s.label}
              </span>
            </span>

            {i < steps.length - 1 && (
              <>
                <span aria-hidden className="ml-auto text-ink/40 md:hidden">
                  ↓
                </span>
                <svg
                  aria-hidden
                  className="hidden h-3 w-6 shrink-0 text-ink/45 md:block"
                  viewBox="0 0 24 12"
                  fill="none"
                >
                  <path
                    d="M1,6 H20"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeDasharray="4 4"
                  />
                  <path
                    d="M16,2 L21,6 L16,10"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </>
            )}
          </li>
        ))}
      </ol>
    </section>
  );
}
