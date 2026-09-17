import { useSceneReveal } from "@/lib/motion";

const steps = [
  { label: "Messy input", tone: "var(--blush)" },
  { label: "Clear scope", tone: "var(--lavender)" },
  { label: "Contract", tone: "var(--butter)" },
  { label: "Approval", tone: "var(--peach)" },
  { label: "Tasks", tone: "var(--mint)" },
  { label: "Workspace", tone: "var(--sky)" },
];

export function Progression() {
  const ref = useSceneReveal<HTMLElement>({ y: 18, stagger: 0.07 });

  return (
    <section ref={ref} className="mx-auto max-w-[84rem] px-5 py-24 sm:px-8 sm:py-32">
      <ol className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between md:gap-3">
        {steps.map((s, i) => (
          <li key={s.label} data-reveal className="flex items-center gap-4 md:flex-col md:gap-3">
            <span
              aria-hidden
              className="h-9 w-9 shrink-0 rounded-[11px] md:h-11 md:w-11"
              style={{ backgroundColor: s.tone }}
            />
            <span className="text-[14px] font-semibold tracking-tight text-ink md:text-center md:text-[15px]">
              {s.label}
            </span>
            {i < steps.length - 1 && (
              <span aria-hidden className="ml-auto text-ink/25 md:hidden">
                ↓
              </span>
            )}
          </li>
        ))}
      </ol>
    </section>
  );
}
