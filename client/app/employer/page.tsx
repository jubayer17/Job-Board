"use client";

import EmployerNavbar from "@/components/employer/EmployerNavbar";
import EmployerHero from "@/components/employer/EmployerHero";
import EmployerFeatures from "@/components/employer/EmployerFeatures";
import EmployerSteps from "@/components/employer/EmployerSteps";
import EmployerBenefits from "@/components/employer/EmployerBenefits";
import EmployerCTA from "@/components/employer/EmployerCTA";
import EmployerFooter from "@/components/employer/EmployerFooter";

export default function EmployerPage() {
  return (
    <main className="min-h-screen bg-white">
      <EmployerNavbar />
      <EmployerHero />
      <EmployerFeatures />
      <EmployerSteps />
      <EmployerBenefits />
      <EmployerCTA />
      <EmployerFooter />
    </main>
  );
}
