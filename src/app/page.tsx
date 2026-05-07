import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ValueProposition from "@/components/ValueProposition";
import CoreFeatures from "@/components/CoreFeatures";
import WhoIsItFor from "@/components/WhoIsItFor";
import Tokenomics from "@/components/Tokenomics";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <ValueProposition />
      <CoreFeatures />
      <WhoIsItFor />
      <Tokenomics />
      <FAQ />
      <Footer />
    </div>
  );
}
