import { getTranslations, setRequestLocale } from "next-intl/server";
import Nav from "@/components/Nav";
import Transformation from "@/components/Transformation";
import BlogSection from "@/components/BlogSection";
import PropertyToProfit from "@/components/PropertyToProfit";
import Operations from "@/components/Operations";
import Pillars from "@/components/Pillars";
import ContactCta from "@/components/ContactCta";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";

export default async function Home({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);
  const t = await getTranslations("blog");
  const operateBody = t.raw("operate.body") as string[];
  const ownerAppBody = t.raw("ownerApp.body") as string[];

  return (
    <SmoothScroll>
      <Nav />
      <main>
        <Transformation />

        <BlogSection
          id="about"
          titleLineOne={t("operate.titleLineOne")}
          titleLineTwo={t("operate.titleLineTwo")}
          body={operateBody}
          imageSrc="/images/operate-bg.png"
          imageAlt="A bright living room with a coastal view"
          imageOverlay
          decorativeText={t("operate.decorativeText")}
          decorativeAlign="left"
          ctaLabel={t("readMore")}
        />

        <PropertyToProfit />

        <BlogSection
          id="owner-app"
          titleLineOne={t("ownerApp.titleLineOne")}
          body={ownerAppBody}
          imageSrc="/images/owner-app.png"
          imageAlt="Hand holding a phone showing the Rent Royz owner app"
          imageContain
          reverse
          decorativeText={t("ownerApp.decorativeText")}
          decorativeAlign="right"
          ctaLabel={t("readMore")}
        />

        <Operations />
        <Pillars />
        <ContactCta />
      </main>
      <Footer />
    </SmoothScroll>
  );
}
