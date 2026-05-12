import { getTranslations } from "next-intl/server";

export default async function Footer() {
  const t = await getTranslations("footer");
  return (
    <footer className="bg-ink-deep py-9 text-center text-sand/70">
      <p className="text-sm">
        {t("copyright")} {new Date().getFullYear()}
      </p>
    </footer>
  );
}
