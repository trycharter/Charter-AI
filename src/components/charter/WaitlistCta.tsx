import { scrollToEarlyAccess } from "./Brand";

/**
 * Small inline "Join Waitlist" invitation used between the long scenes.
 * Keeps the same chunky button language as the nav and hero.
 */
export function WaitlistCta({
  note = "Only 100 waitlist spots for freelancers.",
  shadow = "#C9BBEF",
}: {
  note?: string;
  shadow?: string;
}) {
  return (
    <div className="mt-16 flex flex-col items-center gap-3 text-center sm:mt-20">
      <button
        type="button"
        onClick={scrollToEarlyAccess}
        className="btn-brut group h-[50px] px-7 text-[15px]"
        style={{ ["--btn-shadow" as string]: shadow }}
      >
        Join Waitlist
        <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
          →
        </span>
      </button>
      <p className="text-[12.5px] font-normal text-ink-soft">{note}</p>
    </div>
  );
}
