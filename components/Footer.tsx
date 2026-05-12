import { getTranslations } from "next-intl/server";
import SocialLinks from "./SocialLinks";

export default async function Footer() {
  const t = await getTranslations("footer");
  return (
    <footer className="bg-ink-deep py-12 text-center text-sand/70">
      <div className="mx-auto max-w-7xl px-6">
        <SocialLinks />
        <p className="mt-8 text-sm">
          {t("copyright")} {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}
