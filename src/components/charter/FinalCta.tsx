import { useState, type FormEvent } from "react";
import { supabase } from "@/integrations/supabase/client";
import { CharterMark } from "./Brand";
import { useSceneReveal } from "@/lib/motion";

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

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
      className="mx-auto max-w-[68rem] px-5 py-28 text-center sm:px-8 sm:py-40"
    >
      <CharterMark className="mx-auto h-10 w-auto" />

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
        className="mt-8 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-[13px] font-semibold tracking-tight text-ink"
      >
        {["Scope", "Contract", "Approval", "Tasks", "One workspace"].map((s, i) => (
          <li key={s} className="flex items-center gap-3">
            {i > 0 && <span aria-hidden className="text-ink/25">·</span>}
            {s}
          </li>
        ))}
      </ul>

      <div data-reveal className="mx-auto mt-20 max-w-[36rem]">
        <h3 className="text-[22px] font-bold tracking-tight sm:text-[28px]">
          Be one of the first freelancers to use Charter AI.
        </h3>

        {state === "done" ? (
          <p
            role="status"
            className="mx-auto mt-7 rounded-2xl bg-mint/40 px-6 py-5 text-[15px] font-medium text-ink"
          >
            You&rsquo;re on the list. We&rsquo;ll be in touch with your early-access invite.
          </p>
        ) : (
          <form onSubmit={onSubmit} noValidate className="mt-7">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-2 sm:rounded-full sm:border sm:border-ink/15 sm:bg-card sm:p-1.5">
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
                className="min-w-0 flex-1 rounded-full border border-ink/15 bg-card px-5 py-3.5 text-[15px] text-ink outline-none placeholder:text-ink-soft/60 sm:border-0 sm:bg-transparent sm:py-3"
              />
              <button
                type="submit"
                disabled={state === "loading"}
                className="group inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-ink px-6 py-3.5 text-[15px] font-medium text-cream transition-transform duration-300 hover:scale-[1.03] disabled:opacity-60 sm:py-3"
              >
                {state === "loading" ? "Joining…" : "Get Early Access"}
                <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </button>
            </div>

            {error && (
              <p id="waitlist-error" role="alert" className="mt-3 text-[13px] text-destructive">
                {error}
              </p>
            )}
          </form>
        )}

        <p className="mt-5 text-[12.5px] text-ink-soft/80">
          Built for freelancers first. Designed to grow with the way you work.
        </p>
      </div>
    </section>
  );
}
