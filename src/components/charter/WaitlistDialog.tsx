import { useCallback, useEffect, useRef, useState, type FormEvent } from "react";
import { CharterMark, WAITLIST_OPEN_EVENT } from "./Brand";

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
const TURNSTILE_SRC = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

declare global {
  interface Window {
    turnstile?: {
      render: (el: HTMLElement, opts: Record<string, unknown>) => string;
      reset: (id?: string) => void;
      remove: (id?: string) => void;
    };
  }
}

function loadTurnstile(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (window.turnstile) return Promise.resolve();

  const existing = document.querySelector<HTMLScriptElement>(`script[src="${TURNSTILE_SRC}"]`);
  if (existing) {
    return new Promise((resolve) => existing.addEventListener("load", () => resolve(), { once: true }));
  }

  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = TURNSTILE_SRC;
    script.async = true;
    script.defer = true;
    script.addEventListener("load", () => resolve(), { once: true });
    document.head.appendChild(script);
  });
}

export function WaitlistDialog() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "done">("idle");
  const [successMessage, setSuccessMessage] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const widgetHostRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);

  const siteKey = import.meta.env['VITE_TURNSTILE_SITE_KEY'] as string | undefined;

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

  // Mount the Turnstile widget while the dialog form is visible.
  useEffect(() => {
    if (!open || state === "done" || !siteKey) return;
    let cancelled = false;

    loadTurnstile().then(() => {
      if (cancelled || !widgetHostRef.current || !window.turnstile) return;
      if (widgetIdRef.current !== null) return;
      widgetIdRef.current = window.turnstile.render(widgetHostRef.current, {
        sitekey: siteKey,
        action: "waitlist",
        theme: "light",
        size: "flexible",
        callback: (token: string) => setTurnstileToken(token),
        "expired-callback": () => setTurnstileToken(""),
        "timeout-callback": () => setTurnstileToken(""),
        "error-callback": () => setTurnstileToken(""),
      });
    });

    return () => {
      cancelled = true;
      if (widgetIdRef.current !== null && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current);
      }
      widgetIdRef.current = null;
      setTurnstileToken("");
    };
  }, [open, state, siteKey]);

  const resetTurnstile = useCallback(() => {
    setTurnstileToken("");
    if (widgetIdRef.current !== null && window.turnstile) {
      window.turnstile.reset(widgetIdRef.current);
    }
  }, []);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (state === "loading") return;

    const value = email.trim().toLowerCase();
    const person = name.trim();

    if (!person || person.length > 80) {
      setError("Please enter your name.");
      return;
    }

    if (!EMAIL_RE.test(value) || value.length > 254) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!turnstileToken) {
      setError("Please complete the verification.");
      return;
    }

    setError(null);
    setState("loading");

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: person,
          email: value,
          turnstileToken,
        }),
      });

      const result = (await response.json().catch(() => null)) as
        | { success?: boolean; alreadyJoined?: boolean; message?: string }
        | null;

      if (!response.ok || !result?.success) {
        setState("idle");
        setError(result?.message ?? "Something went wrong. Please try again.");
        resetTurnstile();
        return;
      }

      setSuccessMessage(
        result.alreadyJoined
          ? ["You're already on the Charter waitlist."]
          : ["You're on the list.", "We'll reach out as Charter early-access spots open."],
      );
      setState("done");
    } catch {
      setState("idle");
      setError("Something went wrong. Please try again.");
      resetTurnstile();
    }
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
          <div
            role="status"
            className="mt-7 rounded-2xl border-2 border-ink bg-mint px-5 py-4 text-[14.5px] font-semibold text-ink"
            style={{ boxShadow: "5px 5px 0px #111111" }}
          >
            {successMessage.map((line) => (
              <p key={line} className="[&+p]:mt-1.5">
                {line}
              </p>
            ))}
          </div>
        ) : (
          <form onSubmit={onSubmit} noValidate className="mt-7 text-left">
            <label htmlFor="waitlist-dialog-name" className="sr-only">
              Your name
            </label>
            <input
              ref={inputRef}
              id="waitlist-dialog-name"
              type="text"
              name="name"
              autoComplete="name"
              maxLength={80}
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input-brut mb-3 w-full px-5 py-3 text-[15px]"
            />

            <label htmlFor="waitlist-dialog-email" className="sr-only">
              Your email address
            </label>
            <input
              id="waitlist-dialog-email"
              type="email"
              name="email"
              autoComplete="email"
              maxLength={254}
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-invalid={error ? true : undefined}
              aria-describedby={error ? "waitlist-dialog-error" : undefined}
              className="input-brut w-full px-5 py-3 text-[15px]"
            />


            <div ref={widgetHostRef} className="mt-3 flex justify-center [&>*]:max-w-full" />

            <button
              type="submit"
              disabled={state === "loading" || !turnstileToken}
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
