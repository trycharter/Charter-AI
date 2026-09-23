import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";

import { CharterWordmark } from "./Brand";

export function LegalPage({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-cream">
      <header className="border-b-2 border-ink">
        <div className="mx-auto flex w-full max-w-[880px] items-center justify-between gap-4 px-6 py-5">
          <Link to="/" aria-label="Charter, home" className="flex items-center">
            <CharterWordmark className="h-[14px] w-auto" alt="Charter" />
          </Link>
          <Link to="/" className="btn-brut-soft bg-butter px-4 py-2 text-[12.5px]">
            Back to site
          </Link>
        </div>
      </header>

      <main className="mx-auto w-full max-w-[880px] px-6 py-12 sm:py-16">
        <h1 className="display text-[clamp(2rem,6vw,3rem)] text-ink">{title}</h1>
        <p className="mt-3 text-[13.5px] font-semibold text-ink-soft">Last updated: {updated}</p>

        <div className="mt-8 brut rounded-2xl p-6 sm:p-9 [&_a]:underline [&_h2]:mt-8 [&_h2]:text-[1.25rem] [&_h2]:font-bold [&_h2]:text-ink [&_h2:first-child]:mt-0 [&_li]:mb-1.5 [&_p]:mt-4 [&_p]:text-[15.5px] [&_p]:leading-[1.7] [&_p]:text-ink-soft [&_ul]:mt-4 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:text-[15.5px] [&_ul]:leading-[1.7] [&_ul]:text-ink-soft">
          {children}
        </div>

        <div className="mt-10 flex flex-wrap gap-3 text-[13px]">
          <Link to="/privacy" className="btn-brut-soft bg-lavender px-4 py-2">
            Privacy Policy
          </Link>
          <Link to="/terms" className="btn-brut-soft bg-mint px-4 py-2">
            Terms of Use
          </Link>
        </div>
      </main>
    </div>
  );
}
