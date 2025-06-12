
import React from "react";
import Hero3 from "../components/Hero3";
import BlockchainFeatures from "../components/BlockchainFeatures";
import BenefitsSection from "../components/BenefitsSection";
import HowItWorksSection from "../components/HowItWorksSection";
import Partners from "../components/Partners";

const HomePage = () => {
    return (
      <>
        <Hero3 />
        <BlockchainFeatures />
        <BenefitsSection />
        <HowItWorksSection />
        <Partners />
      </>
    );
  };

export default HomePage;