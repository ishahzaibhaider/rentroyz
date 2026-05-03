import clsx from "clsx";

// The wordmark is rendered via CSS mask so it inherits the parent's
// `text-{color}` — sand on dark sections, ink-deep on light sections — without
// needing two separate image files. The PNG is the brand artwork from
// `logos/Artboard 7.png`.
export default function Wordmark({ className }: { className?: string }) {
  return (
    <span
      role="img"
      aria-label="RentRoyz"
      className={clsx("inline-block bg-current align-middle", className)}
      style={{
        aspectRatio: "870 / 214",
        WebkitMaskImage: "url('/brand/wordmark.png')",
        maskImage: "url('/brand/wordmark.png')",
        WebkitMaskSize: "contain",
        maskSize: "contain",
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskPosition: "left center",
        maskPosition: "left center",
      }}
    />
  );
}
