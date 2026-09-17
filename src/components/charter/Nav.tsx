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
      className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-3 sm:pt-5"
      style={{ animation: "charter-fade-in 0.7s ease-out 0.05s both" }}
    >
      <nav
        aria-label="Primary"
        className="flex w-full max-w-[46rem] items-center justify-between gap-4 rounded-full border-2 border-ink bg-cream px-3 py-2 transition-shadow duration-300 sm:gap-6 sm:px-4"
        style={{ boxShadow: scrolled ? "4px 4px 0px #111111" : "2px 2px 0px #111111" }}
      >
        <a href="#top" className="flex min-w-0 items-center pl-1" aria-label="Charter, home">
          <CharterWordmark className="h-[13px] w-auto sm:h-[15px]" alt="Charter" />
        </a>

        <div className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="group relative text-[13.5px] font-semibold text-ink"
            >
              {l.label}
              <span
                aria-hidden
                className="absolute -bottom-1 left-0 h-[2px] w-full origin-right scale-x-0 bg-ink transition-transform duration-300 group-hover:origin-left group-hover:scale-x-100"
              />
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={scrollToEarlyAccess}
            className="btn-brut px-4 py-2 text-[13px]"
            style={{ ["--btn-shadow" as string]: "#FFE7AB" }}
          >
            Join Waitlist
          </button>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full border-2 border-ink bg-turquoise md:hidden"
          >
            <span className="sr-only">Menu</span>
            <span aria-hidden className="flex flex-col gap-[4px]">
              <span className="block h-[2px] w-3.5 bg-ink" />
              <span className="block h-[2px] w-3.5 bg-ink" />
            </span>
          </button>
        </div>
      </nav>

      {open && (
        <div
          className="absolute inset-x-4 top-[4.6rem] rounded-2xl border-2 border-ink bg-cream px-5 py-3 md:hidden"
          style={{ boxShadow: "5px 5px 0px #111111" }}
        >
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block py-2 text-[16px] font-semibold text-ink"
            >
              {l.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
