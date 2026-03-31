import { HeroSection } from "@/components/hero-section"
import { ProblemSection } from "@/components/problem-section"
import { SolutionSection } from "@/components/solution-section"
import { ServicesSection } from "@/components/services-section"
import { BenefitsSection } from "@/components/benefits-section"
import { WorksSection } from "@/components/works-section"
import { PricingSection } from "@/components/pricing-section"
import { FaqSection } from "@/components/faq-section"
import { CtaSection } from "@/components/cta-section"
import { NewsSection } from "@/components/news-section"
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <ProblemSection />
      <SolutionSection />
      <ServicesSection />
      <BenefitsSection />
      <WorksSection />
      <NewsSection />
      <PricingSection />
      <FaqSection />
      <CtaSection />
      <Footer />
    </main>
  )
}
