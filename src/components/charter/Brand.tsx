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

export const WAITLIST_OPEN_EVENT = "charter:open-waitlist";

/** Opens the waitlist email popup from anywhere on the page. */
export function scrollToEarlyAccess() {
  window.dispatchEvent(new Event(WAITLIST_OPEN_EVENT));
}
