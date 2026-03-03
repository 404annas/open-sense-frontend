import Footer from "@/components/Footer";
import RevealingText from "@/components/RevealingText";
import About from "@/sections/About/About";
import ContactUs from "@/sections/Contactus/Contactus";
import Hero from "@/sections/Hero/Hero";
import Work from "@/sections/Work/Work";
import Works from "@/sections/Works/Works";
import Image from "next/image";
import HomeSEO from "@/seo/HomeSEO";

export default function Home() {
  return (
    <>
      <HomeSEO />
      <div className="scroll-smooth transition-all duration-200">
        <Hero />
        <Work />
        {/* <Works /> */}
        {/* <RevealingText /> */}
        <ContactUs />
        <Footer />
      </div>
    </>
  );
}
