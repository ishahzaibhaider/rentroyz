import { Link } from "@/lib/i18n/navigation";
import type { Locale } from "@/lib/i18n/request";
import { getLegalDoc, type LegalDocId } from "@/lib/legal";
import Wordmark from "./ui/Wordmark";
import LanguageSwitcher from "./LanguageSwitcher";
import Footer from "./Footer";

// Renders a full legal document page (Privacy Policy or Terms & Conditions).
// Server component — the content is static per locale, pulled from lib/legal.
//
// It deliberately does NOT reuse the marketing <Nav>: that nav is built of
// in-page anchor links (#transformation, #pillars, #contact) which don't
// exist on a standalone legal page. Instead it uses a minimal header whose
// wordmark routes back to the locale home.
export default function LegalPage({
  locale,
  docId,
}: {
  locale: Locale;
  docId: LegalDocId;
}) {
  const doc = getLegalDoc(locale, docId);
  const fmt = new Intl.NumberFormat(locale === "ar" ? "ar" : "en");

  return (
    <div className="flex min-h-screen flex-col bg-ink text-sand">
      <header className="sticky top-0 z-50 border-b border-sand/10 bg-ink-deep/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
          <Link href="/" className="flex items-center gap-2 text-sand">
            <Wordmark className="h-7 w-auto" />
          </Link>
          <LanguageSwitcher />
        </div>
      </header>

      <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-16 sm:py-20 lg:px-0">
        <article>
          <header className="border-b border-sand/10 pb-10">
            <h1 className="font-display text-4xl font-black leading-[1.1] tracking-tight sm:text-5xl">
              {doc.title}
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-sand/60">
              {doc.tagline}
            </p>
            <p className="mt-6 text-sm text-sand/40">
              {doc.lastUpdatedLabel}: {doc.lastUpdated}
            </p>
          </header>

          {/* Template disclaimer — only present on the in-house Terms draft.
              The client-provided Privacy Policy carries no disclaimer. */}
          {doc.disclaimer && (
            <aside className="mt-10 rounded-xl border border-ember/40 bg-ember/5 px-5 py-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ember">
                {doc.disclaimerLabel}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-sand/70">
                {doc.disclaimer}
              </p>
            </aside>
          )}

          {doc.intro.length > 0 && (
            <div className="mt-10 space-y-5">
              {doc.intro.map((para, i) => (
                <p key={i} className="text-base leading-relaxed text-sand/80">
                  {para}
                </p>
              ))}
            </div>
          )}

          <div className="mt-12 space-y-12">
            {doc.sections.map((section, i) => (
              <section key={i}>
                <h2 className="font-display text-xl font-bold tracking-tight sm:text-2xl">
                  <span className="text-ember">{fmt.format(i + 1)}.</span>{" "}
                  {section.heading}
                </h2>
                {section.body && (
                  <div className="mt-4 space-y-4">
                    {section.body.map((para, j) => (
                      <p
                        key={j}
                        className="text-base leading-relaxed text-sand/80"
                      >
                        {para}
                      </p>
                    ))}
                  </div>
                )}
                {section.items && (
                  <ul className="mt-4 space-y-2.5">
                    {section.items.map((item, j) => (
                      <li
                        key={j}
                        className="relative ps-5 text-base leading-relaxed text-sand/80"
                      >
                        <span
                          className="absolute start-0 top-[0.6em] h-1.5 w-1.5 rounded-full bg-ember/70"
                          aria-hidden
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
