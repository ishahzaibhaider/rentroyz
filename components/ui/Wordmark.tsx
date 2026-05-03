import clsx from "clsx";

export default function Wordmark({ className }: { className?: string }) {
  return (
    <span className={clsx("inline-flex items-center gap-2", className)}>
      <svg
        viewBox="0 0 40 40"
        className="h-full w-auto"
        fill="none"
        aria-hidden
      >
        <path
          d="M8 6h14a8 8 0 0 1 0 16h-6l10 12h-7l-9-12V34H8V6z"
          fill="currentColor"
        />
        <path
          d="M14 12h7a3 3 0 0 1 0 6h-7v-6z"
          fill="var(--ink-deep)"
        />
      </svg>
      <span className="font-display text-lg tracking-tight">RentRoyz</span>
    </span>
  );
}
