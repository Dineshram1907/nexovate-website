import React from "react";
import { SEO } from "@/components/SEO";
import { NexovateShowcase } from "@/showcase/NexovateShowcase";

export const Showcase: React.FC = () => {
  return (
    <>
      <SEO
        title="Nexovate App Showcase — Intelligence Designed To Evolve"
        description="Experience the Nexovate 3-screen mobile product suite: Brand Philosophy, Interactive Home, and Innovation Labs."
      />
      <NexovateShowcase />
    </>
  );
};

export default Showcase;
