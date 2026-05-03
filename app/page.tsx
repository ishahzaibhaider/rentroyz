import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Transformation from "@/components/Transformation";
import Pillars from "@/components/Pillars";
import ContactCta from "@/components/ContactCta";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";

export default function Home() {
  return (
    <SmoothScroll>
      <Nav />
      <main>
        <Hero />
        <Transformation />
        <Pillars />
        <ContactCta />
      </main>
      <Footer />
    </SmoothScroll>
  );
}
