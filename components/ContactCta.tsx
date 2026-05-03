"use client";

import { useState } from "react";
import RevealUp from "./ui/RevealUp";
import PetalPattern from "./ui/PetalPattern";

type Status = "idle" | "submitting" | "ok" | "error";

export default function ContactCta() {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    const data = Object.fromEntries(new FormData(e.currentTarget));
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      setStatus(res.ok ? "ok" : "error");
      if (res.ok) (e.target as HTMLFormElement).reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-sand px-6 py-28 text-ink-deep sm:py-36 lg:px-10"
    >
      <PetalPattern className="text-ink-deep" opacity={0.05} />

      <div className="relative mx-auto grid max-w-7xl gap-16 lg:grid-cols-2 lg:gap-24">
        <RevealUp>
          <p className="font-sans text-xs uppercase tracking-[0.3em] text-burgundy">
            Get in touch
          </p>
          <h2 className="mt-4 font-display text-4xl leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
            Manage properties.
            <br />
            <span className="text-ink-muted">Minus the headaches.</span>
          </h2>
          <p className="mt-8 max-w-md text-lg leading-relaxed text-ink-deep/75">
            Tell us about your property. We&apos;ll come back with a free
            revenue estimate and a clear plan within 48 hours.
          </p>

          <dl className="mt-12 space-y-5 text-sm">
            <div>
              <dt className="text-ink-deep/60">Email</dt>
              <dd className="mt-1 font-display text-lg">hello@rentroyz.com</dd>
            </div>
            <div>
              <dt className="text-ink-deep/60">WhatsApp</dt>
              <dd className="mt-1 font-display text-lg">+966 ·· ··· ····</dd>
            </div>
            <div>
              <dt className="text-ink-deep/60">Riyadh, Saudi Arabia</dt>
            </div>
          </dl>
        </RevealUp>

        <RevealUp>
          <form onSubmit={onSubmit} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Field name="name" label="Your name" required />
              <Field name="email" label="Email" type="email" required />
            </div>
            <Field name="phone" label="Phone (optional)" type="tel" />
            <Field name="message" label="Tell us about your property" multiline />
            <button
              type="submit"
              disabled={status === "submitting"}
              className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-ink-deep px-7 py-4 text-sm font-medium text-sand transition-colors duration-500 ease-calm hover:bg-ember disabled:opacity-60 sm:w-auto"
            >
              {status === "submitting" ? "Sending..." : "Request an estimate"}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="transition-transform duration-500 ease-calm group-hover:translate-x-1">
                <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            {status === "ok" && (
              <p className="text-sm text-ink-deep/80">
                Thank you. We&apos;ll be in touch within 48 hours.
              </p>
            )}
            {status === "error" && (
              <p className="text-sm text-burgundy">
                Something went wrong. Please email hello@rentroyz.com directly.
              </p>
            )}
          </form>
        </RevealUp>
      </div>
    </section>
  );
}

function Field({
  name,
  label,
  type = "text",
  required,
  multiline,
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  multiline?: boolean;
}) {
  const base =
    "peer w-full rounded-2xl border border-ink-deep/20 bg-transparent px-4 pb-2 pt-6 text-ink-deep outline-none transition-colors duration-300 ease-calm placeholder:text-transparent focus:border-ink-deep";
  return (
    <label className="relative block">
      {multiline ? (
        <textarea
          name={name}
          required={required}
          rows={4}
          placeholder={label}
          className={`${base} resize-none`}
        />
      ) : (
        <input
          type={type}
          name={name}
          required={required}
          placeholder={label}
          className={base}
        />
      )}
      <span className="pointer-events-none absolute left-4 top-2 text-xs text-ink-deep/60 transition-all duration-300 ease-calm peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-xs">
        {label}
      </span>
    </label>
  );
}
