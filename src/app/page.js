export const dynamic = "force-dynamic";
import HeroSection from "@/components/home/HeroSection";
import CategorySection from "@/components/home/CategorySection";
import FeaturedStudios from "@/components/home/FeaturedStudios";
import HowItWorks from "@/components/home/HowItWorks";
import TrustSection from "@/components/home/TrustSection";

export default function Home() {
  return (
    <>
      <HeroSection />

      <CategorySection />

      <FeaturedStudios />

      <HowItWorks />

      <TrustSection />
    </>
  );
}
