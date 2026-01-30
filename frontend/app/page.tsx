import Navbar from "@/components/FirstPage/Navbar";
import TitlePage from "@/components/FirstPage/TitlePage";
import CoreFeatures from "@/components/FirstPage/CoreFeatures";
import WhyChooseUs from "@/components/FirstPage/WhyChooseUse";
import Capabilities from "@/components/FirstPage/Capabilities";
import FAQ from "@/components/FirstPage/FAQs";
import Footer from "@/components/FirstPage/Footer";
import ScrollProgress from "@/components/FirstPage/ScrollProgress";

export default function LandingPage() {
  return (
    <>
      <ScrollProgress />
      <Navbar />
      <TitlePage />
      <WhyChooseUs />
      <CoreFeatures />
      <Capabilities />
      <FAQ />
      <Footer />
    </>
  );
}
