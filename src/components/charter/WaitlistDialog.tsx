import { useEffect, useRef, useState, type FormEvent } from "react";
import { supabase } from "@/integrations/supabase/client";
import { CharterMark, WAITLIST_OPEN_EVENT } from "./Brand";

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

export function WaitlistDialog() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "done">("idle");
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener(WAITLIST_OPEN_EVENT, onOpen);
    return () => window.removeEventListener(WAITLIST_OPEN_EVENT, onOpen);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.setTimeout(() => inputRef.current?.focus(), 60);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

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

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] grid place-items-center px-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="waitlist-dialog-title"
    >
      <button
        type="button"
        aria-label="Close"
        onClick={() => setOpen(false)}
        className="absolute inset-0 h-full w-full cursor-default bg-ink/40 backdrop-blur-[2px]"
      />

      <div
        className="relative w-full max-w-[30rem] rounded-[24px] border-[2.5px] border-ink bg-cream px-6 py-8 text-center sm:px-9"
        style={{ boxShadow: "8px 8px 0px #111111" }}
      >
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Close waitlist form"
          className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full border-2 border-ink bg-peach text-[14px] font-bold leading-none text-ink"
        >
          ×
        </button>

        <span
          className="mx-auto grid h-12 w-12 place-items-center rounded-2xl border-[2.5px] border-ink bg-butter"
          style={{ boxShadow: "4px 4px 0px #111111", transform: "rotate(-3deg)" }}
        >
          <CharterMark className="h-6 w-auto" />
        </span>

        <h2
          id="waitlist-dialog-title"
          className="mt-6 text-[21px] font-extrabold tracking-tight text-ink sm:text-[24px]"
        >
          Join the Charter AI waitlist
        </h2>
        <p className="mx-auto mt-3 max-w-[34ch] text-[14px] leading-relaxed text-ink-soft">
          Drop your email and we&rsquo;ll send your early-access invite.
        </p>

        {state === "done" ? (
          <p
            role="status"
            className="mt-7 rounded-2xl border-2 border-ink bg-mint px-5 py-4 text-[14.5px] font-semibold text-ink"
            style={{ boxShadow: "5px 5px 0px #111111" }}
          >
            You&rsquo;re on the list. We&rsquo;ll be in touch with your early-access invite.
          </p>
        ) : (
          <form onSubmit={onSubmit} noValidate className="mt-7 text-left">
            <label htmlFor="waitlist-dialog-email" className="sr-only">
              Your email address
            </label>
            <input
              ref={inputRef}
              id="waitlist-dialog-email"
              type="email"
              name="email"
              autoComplete="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-invalid={error ? true : undefined}
              aria-describedby={error ? "waitlist-dialog-error" : undefined}
              className="input-brut w-full px-5 py-3 text-[15px]"
            />
            <button
              type="submit"
              disabled={state === "loading"}
              className="btn-brut group mt-3 h-[50px] w-full justify-center px-7 text-[15px] disabled:opacity-60"
              style={{ ["--btn-shadow" as string]: "#A0E4E0" }}
            >
              {state === "loading" ? "Joining…" : "Join Waitlist"}
              <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </button>

            {error && (
              <p
                id="waitlist-dialog-error"
                role="alert"
                className="mt-3 text-[13px] font-semibold text-destructive"
              >
                {error}
              </p>
            )}
          </form>
        )}

        <p className="mt-5 text-[12.5px] text-ink/70">
          No spam. Just product updates and invites.
        </p>
      </div>
    </div>
  );
}
