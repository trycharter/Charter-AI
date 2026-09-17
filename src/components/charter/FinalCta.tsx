import { useState, type FormEvent } from "react";
import { supabase } from "@/integrations/supabase/client";
import { CharterMark } from "./Brand";
import { useSceneReveal } from "@/lib/motion";

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

const pills = [
  { label: "Scope", tone: "var(--lavender)" },
  { label: "Contract", tone: "var(--butter)" },
  { label: "Approval", tone: "var(--peach)" },
  { label: "Tasks", tone: "var(--mint)" },
  { label: "One workspace", tone: "var(--sky)" },
];

export function FinalCta() {
  const ref = useSceneReveal<HTMLElement>();
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "done">("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const value = email.trim().toLowerCase();

    if (!EMAIL_RE.test(value) || value.length > 255) {
      setError("Please enter a valid email address.");
      return;
    }

    setError(null);
    setState("loading");

    const { error: dbError } = await supabase
      .from("waitlist_signups")
      .insert({ email: value, source: "landing-page" });

    if (dbError && dbError.code !== "23505") {
      setState("idle");
      setError("Something went wrong. Please try again.");
      return;
    }

    setState("done");
  }

  return (
    <section
      id="early-access"
      ref={ref}
      className="mx-auto max-w-[68rem] px-5 py-24 text-center sm:px-8 sm:py-36"
    >
      <span
        className="mx-auto grid h-16 w-16 place-items-center rounded-2xl border-[3px] border-ink bg-cream"
        style={{ boxShadow: "6px 6px 0px #111111", transform: "rotate(-3deg)" }}
      >
        <CharterMark className="h-8 w-auto" />
      </span>

      <h2
        data-reveal
        className="display mx-auto mt-10 max-w-[18ch] text-[2.1rem] sm:text-[3.4rem] lg:text-[4rem]"
      >
        Your next client project shouldn&rsquo;t start from a blank page.
      </h2>

      <p data-reveal className="mx-auto mt-7 max-w-[46ch] text-[16px] leading-[1.8] text-ink-soft">
        Start with the conversation you already had. Charter AI turns it into everything you need to
        move the project forward.
      </p>

      <ul
        data-reveal
        className="mt-9 flex flex-wrap items-center justify-center gap-2.5 text-[13px] font-bold tracking-tight text-ink"
      >
        {pills.map((p, i) => (
          <li
            key={p.label}
            className="chip-brut px-3.5 py-1.5"
            style={{
              backgroundColor: p.tone,
              boxShadow: "3px 3px 0px #111111",
              transform: `rotate(${i % 2 === 0 ? -2 : 2}deg)`,
            }}
          >
            {p.label}
          </li>
        ))}
      </ul>

      {/* Big pastel block sitting behind the signup composition */}
      <div
        data-reveal
        className="relative mx-auto mt-16 max-w-[44rem] rounded-[28px] border-[3px] border-ink bg-blush/70 px-5 py-10 sm:px-10 sm:py-12"
        style={{ boxShadow: "10px 10px 0px #111111" }}
      >
        <h3 className="mx-auto max-w-[24ch] text-balance text-[22px] font-extrabold tracking-tight sm:text-[30px]">
          Be one of the first freelancers to use Charter AI.
        </h3>

        {/* hand-drawn arrow pointing at the input */}
        <svg
          aria-hidden
          className="pointer-events-none absolute -left-4 bottom-16 hidden h-24 w-24 text-ink sm:block"
          viewBox="0 0 100 100"
          fill="none"
        >
          <path d="M6,12 C4,44 22,66 54,72" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M44,64 L58,73 L44,80" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>

        {state === "done" ? (
          <p
            role="status"
            className="mx-auto mt-7 max-w-[34rem] rounded-2xl border-2 border-ink bg-mint px-6 py-5 text-[15px] font-semibold text-ink"
            style={{ boxShadow: "5px 5px 0px #111111" }}
          >
            You&rsquo;re on the list. We&rsquo;ll be in touch with your early-access invite.
          </p>
        ) : (
          <form onSubmit={onSubmit} noValidate className="mx-auto mt-8 max-w-[34rem]">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <label htmlFor="waitlist-email" className="sr-only">
                Your email address
              </label>
              <input
                id="waitlist-email"
                type="email"
                name="email"
                autoComplete="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-invalid={error ? true : undefined}
                aria-describedby={error ? "waitlist-error" : undefined}
                className="input-brut min-w-0 flex-1 px-5 py-3.5 text-[15px]"
              />
              <button
                type="submit"
                disabled={state === "loading"}
                className="btn-brut group shrink-0 px-6 py-3.5 text-[15px] disabled:opacity-60"
                style={{ ["--btn-shadow" as string]: "#A0E4E0" }}
              >
                {state === "loading" ? "Joining…" : "Get Early Access"}
                <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </button>
            </div>

            {error && (
              <p
                id="waitlist-error"
                role="alert"
                className="mt-3 text-[13px] font-semibold text-destructive"
              >
                {error}
              </p>
            )}
          </form>
        )}

        <p className="mt-6 text-[12.5px] text-ink/70">
          Built for freelancers first. Designed to grow with the way you work.
        </p>
      </div>
    </section>
  );
}
