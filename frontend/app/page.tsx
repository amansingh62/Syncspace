import Navbar from "@/components/Navbar";
import TitlePage from "@/components/TitlePage";
import CoreFeatures from "@/components/CoreFeatures";
import WhyChooseUs from "@/components/WhyChooseUse";
import Capabilities from "@/components/Capabilities";
import FAQ from "@/components/FAQs";

export default function LandingPage(){
    return (
        <>
        <Navbar />
        <TitlePage />
        <WhyChooseUs />
        <CoreFeatures />
        <Capabilities />
        <FAQ />
        </>
    )
}