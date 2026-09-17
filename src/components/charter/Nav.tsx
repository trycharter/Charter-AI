import { useEffect, useState } from "react";
import { CharterWordmark, scrollToEarlyAccess } from "./Brand";

const links = [
  { label: "About", href: "#about" },
  { label: "How it Works", href: "#how-it-works" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-3 sm:pt-4"
      style={{ animation: "charter-fade-in 0.7s ease-out 0.05s both" }}
    >
      <nav
        aria-label="Primary"
        className={`flex w-full max-w-[44rem] items-center justify-between gap-4 rounded-full border border-ink/10 px-3 py-1.5 backdrop-blur-xl transition-colors duration-500 sm:gap-6 sm:px-4 sm:py-2 ${
          scrolled ? "bg-cream/75 shadow-[0_8px_30px_-18px_rgb(17_17_17/0.45)]" : "bg-cream/40"
        }`}
      >
        <a href="#top" className="flex min-w-0 items-center" aria-label="Charter, home">
          <CharterWordmark className="h-[13px] w-auto sm:h-[15px]" alt="Charter" />
        </a>

        <div className="hidden items-center gap-6 md:flex">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="text-[13.5px] font-medium text-ink/70 transition-colors duration-300 hover:text-ink"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={scrollToEarlyAccess}
            className="rounded-full bg-ink px-4 py-2 text-[13px] font-medium text-cream transition-transform duration-300 hover:scale-[1.03]"
          >
            Join Waitlist
          </button>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-ink/15 md:hidden"
          >
            <span className="sr-only">Menu</span>
            <span aria-hidden className="flex flex-col gap-[5px]">
              <span className="block h-[1.5px] w-3.5 bg-ink" />
              <span className="block h-[1.5px] w-3.5 bg-ink" />
            </span>
          </button>
        </div>
      </nav>

      {open && (
        <div className="absolute inset-x-4 top-[4.2rem] rounded-2xl border border-ink/10 bg-cream/95 px-5 py-3 backdrop-blur md:hidden">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block py-2 text-[16px] font-medium text-ink"
            >
              {l.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
