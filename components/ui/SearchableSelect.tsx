"use client";

import { useEffect, useRef, useState } from "react";

type Option = { value: string; label: string };

// A searchable single-select dropdown styled to match the estimator's native
// <Select>. Used for the district field, whose option list is long enough
// that a plain <select> would be painful to scan. Closes on outside click and
// Escape; supports arrow-key navigation and Enter to pick.
export default function SearchableSelect({
  value,
  onChange,
  options,
  placeholder,
  searchPlaceholder,
  noResultsText,
}: {
  value: string;
  onChange: (v: string) => void;
  options: Option[];
  placeholder: string;
  searchPlaceholder: string;
  noResultsText: string;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [highlight, setHighlight] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const selected = options.find((o) => o.value === value) ?? null;
  const q = query.trim().toLowerCase();
  const filtered = q
    ? options.filter((o) => o.label.toLowerCase().includes(q))
    : options;

  // Close on outside click.
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open]);

  // On open, clear the filter and focus the search box.
  useEffect(() => {
    if (!open) return;
    setQuery("");
    setHighlight(0);
    const id = requestAnimationFrame(() => inputRef.current?.focus());
    return () => cancelAnimationFrame(id);
  }, [open]);

  const choose = (v: string) => {
    onChange(v);
    setOpen(false);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setOpen(false);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlight((h) => Math.min(h + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlight((h) => Math.max(h - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const opt = filtered[highlight];
      if (opt) choose(opt.value);
    }
  };

  return (
    <div className="relative" ref={rootRef}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-2 rounded-2xl border border-ink-deep/15 bg-white px-4 py-3 text-base transition-colors duration-300 ease-calm hover:border-ink-deep/30 focus:border-ink-deep focus:outline-none"
      >
        <span className={selected ? "text-ink-deep" : "text-ink-deep/40"}>
          {selected ? selected.label : placeholder}
        </span>
        <ChevronDownIcon className="h-4 w-4 shrink-0 text-ink-deep/50" />
      </button>

      {open && (
        <div className="absolute z-20 mt-2 w-full overflow-hidden rounded-2xl border border-ink-deep/15 bg-white shadow-[0_16px_40px_rgba(15,31,36,0.16)]">
          <div className="border-b border-ink-deep/10 p-2">
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setHighlight(0);
              }}
              onKeyDown={onKeyDown}
              placeholder={searchPlaceholder}
              className="w-full rounded-xl bg-sand-soft/60 px-3 py-2 text-sm text-ink-deep placeholder:text-ink-deep/40 focus:outline-none"
            />
          </div>
          {/* `data-lenis-prevent` stops the Lenis smooth-scroll from hijacking
              wheel/touch events here, so this list scrolls on its own instead
              of scrolling the page behind it. */}
          <ul
            role="listbox"
            data-lenis-prevent
            className="max-h-56 overflow-y-auto overscroll-contain py-1"
          >
            {filtered.length === 0 ? (
              <li className="px-4 py-3 text-sm text-ink-deep/40">
                {noResultsText}
              </li>
            ) : (
              filtered.map((o, i) => (
                <li
                  key={o.value}
                  role="option"
                  aria-selected={o.value === value}
                >
                  <button
                    type="button"
                    onClick={() => choose(o.value)}
                    onMouseEnter={() => setHighlight(i)}
                    className={`flex w-full items-center justify-between gap-2 px-4 py-2.5 text-start text-sm transition-colors ${
                      i === highlight
                        ? "bg-sand-soft text-ink-deep"
                        : "text-ink-deep/80"
                    } ${o.value === value ? "font-semibold" : ""}`}
                  >
                    {o.label}
                    {o.value === value && (
                      <CheckIcon className="h-4 w-4 shrink-0 text-ember" />
                    )}
                  </button>
                </li>
              ))
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}
