import { CharterWordmark } from "./Brand";

export function Footer() {
  return (
    <footer className="relative overflow-hidden pt-16">
      <div className="mx-auto flex max-w-[84rem] flex-wrap items-center justify-between gap-4 px-5 pb-10 text-[13px] text-ink-soft sm:px-8">
        <p>© {new Date().getFullYear()} Charter AI</p>
        <nav aria-label="Footer" className="flex items-center gap-6">
          <a href="https://x.com" className="transition-opacity hover:opacity-60">
            X / Twitter
          </a>
          <a href="https://instagram.com" className="transition-opacity hover:opacity-60">
            Instagram
          </a>
          <a href="#top" className="transition-opacity hover:opacity-60">
            Privacy
          </a>
        </nav>
      </div>

      <div aria-hidden className="relative -mb-[3vw] select-none px-0">
        <CharterWordmark alt="" className="w-[112%] max-w-none -translate-x-[6%]" />
      </div>
    </footer>
  );
}
