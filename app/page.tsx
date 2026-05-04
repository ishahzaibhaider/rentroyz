import Nav from "@/components/Nav";
import Transformation from "@/components/Transformation";
import BlogSection from "@/components/BlogSection";
import PropertyToProfit from "@/components/PropertyToProfit";
import Operations from "@/components/Operations";
import Pillars from "@/components/Pillars";
import Testimonials from "@/components/Testimonials";
import ContactCta from "@/components/ContactCta";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";

const BLOG_BODY = [
  "RentRoyz is a professional property operations company focused on short-term and mid-term rentals. We take full responsibility for performance, guest experience, and asset care.",
  "Our model is simple: you own the property, we run the operation, and profits are shared transparently.",
  "We rely on smart systems, structured processes, and hands-on execution to deliver consistent results.",
];

export default function Home() {
  return (
    <SmoothScroll>
      <Nav />
      <main>
        <Transformation />

        <BlogSection
          id="about"
          titleLineOne="Built to Operate,"
          titleLineTwo="Not Just Manage"
          body={BLOG_BODY}
          imageSrc="/images/operate-bg.png"
          imageAlt="A bright living room with a coastal view"
          imageOverlay
          decorativeText="OPERATE"
          decorativeAlign="left"
        />

        <PropertyToProfit />

        <BlogSection
          id="owner-app"
          titleLineOne="Owner App"
          body={BLOG_BODY}
          imageSrc="/images/owner-app.png"
          imageAlt="Hand holding a phone showing the Rent Royz owner app"
          imageContain
          reverse
          decorativeText="VALUES"
          decorativeAlign="right"
        />

        <Operations />
        <Pillars />
        <Testimonials />
        <ContactCta />
      </main>
      <Footer />
    </SmoothScroll>
  );
}
