import { useEffect, useState } from "react";
import { CharterMark, CharterWordmark, scrollToEarlyAccess } from "./Brand";

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
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled ? "bg-cream/80 backdrop-blur-md" : "bg-transparent"
      }`}
      style={{ opacity: 0, animation: "fade-in 0.7s ease-out 0.05s forwards" }}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex max-w-[84rem] items-center justify-between gap-6 px-5 py-4 sm:px-8 sm:py-5"
      >
        <a href="#top" className="flex min-w-0 items-center gap-2.5" aria-label="Charter AI, home">
          <CharterMark className="h-7 w-auto shrink-0 sm:h-8" />
          <CharterWordmark className="h-4 w-auto sm:h-[18px]" alt="Charter" />
        </a>

        <div className="hidden items-center gap-10 md:flex">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="text-[15px] font-medium text-ink/70 transition-colors duration-300 hover:text-ink"
            >
              {l.label}
            </a>
          ))}
          <button
            type="button"
            onClick={scrollToEarlyAccess}
            className="rounded-full bg-ink px-5 py-2.5 text-[14px] font-medium text-cream transition-transform duration-300 hover:scale-[1.03]"
          >
            Get Early Access
          </button>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <button
            type="button"
            onClick={scrollToEarlyAccess}
            className="rounded-full bg-ink px-4 py-2 text-[13px] font-medium text-cream"
          >
            Early Access
          </button>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-ink/15"
          >
            <span className="sr-only">Menu</span>
            <span aria-hidden className="flex flex-col gap-[5px]">
              <span className="block h-[1.5px] w-4 bg-ink" />
              <span className="block h-[1.5px] w-4 bg-ink" />
            </span>
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-ink/10 bg-cream/95 px-5 py-4 backdrop-blur md:hidden">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block py-2.5 text-[17px] font-medium text-ink"
            >
              {l.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
