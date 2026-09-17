export function CharterMark({ className = "" }: { className?: string }) {
  return (
    <img
      src="/charter-mark.svg"
      alt=""
      aria-hidden="true"
      className={className}
      draggable={false}
    />
  );
}

export function CharterWordmark({
  className = "",
  alt = "Charter",
}: {
  className?: string;
  alt?: string;
}) {
  return <img src="/charter-wordmark.svg" alt={alt} className={className} draggable={false} />;
}

export function scrollToEarlyAccess() {
  const target = document.getElementById("early-access");
  if (!target) return;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  target.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "center" });
  window.setTimeout(() => {
    document.getElementById("waitlist-email")?.focus({ preventScroll: true });
  }, reduce ? 0 : 900);
}
