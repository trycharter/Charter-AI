import { useSceneReveal } from "@/lib/motion";

export function Problem() {
  const ref = useSceneReveal<HTMLElement>();

  return (
    <section
      id="about"
      ref={ref}
      className="relative mx-auto max-w-[84rem] px-5 pb-28 pt-10 sm:px-8 sm:pb-40 sm:pt-24"
    >
      <h2 className="display max-w-[20ch] text-[2rem] sm:text-[3.4rem] lg:text-[4.2rem]">
        <span data-reveal className="block text-ink/45">
          Your client already gave you the information.
        </span>
        <span data-reveal className="mt-3 block text-ink">
          You shouldn&rsquo;t have to organize it all again.
        </span>
      </h2>

      <div className="mt-14 grid gap-10 sm:mt-20 md:grid-cols-[1.1fr_0.9fr] md:gap-16">
        <p data-reveal className="text-[16px] leading-[1.8] text-ink-soft sm:text-[18px]">
          The call ends. Notes are in one place. Files are somewhere else. Requirements are buried in
          messages. A contract still needs writing. Tasks still need creating.
        </p>
        <p
          data-reveal
          className="self-end text-[18px] font-semibold leading-[1.5] text-ink sm:text-[22px]"
        >
          Charter AI connects the dots for you.
        </p>
      </div>
    </section>
  );
}
