import HeroPage from "./components/home/hero-page";
import FeaturePage from "./components/features/features";
import PricingPage from "./components/pricing/pricing";
import TestimonialPage from "./components/testimonial/testimonial";
import CtaPage from "./components/cta-section/cta";
export default function Home() {
  return (
    <div className="">
      <HeroPage/>
      <FeaturePage/>
      <PricingPage/>
      <TestimonialPage/>
      <CtaPage/>
      
    </div>
  );
}

