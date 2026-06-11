import { Navbar }               from "@/components/marketing/navbar";
import { HeroSection }          from "@/components/marketing/hero-section";
import { StatsSection }         from "@/components/marketing/stats-section";
import { ServicesSection }      from "@/components/marketing/services-section";
import { FeaturedProductsSection } from "@/components/marketing/featured-products";
import { TestimonialsSection }  from "@/components/marketing/testimonials-section";
import { FAQSection }           from "@/components/marketing/faq-section";
import { ContactSection }       from "@/components/marketing/contact-section";
import { Footer }               from "@/components/marketing/footer";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <StatsSection />
      <ServicesSection />
      <FeaturedProductsSection />
      <TestimonialsSection />
      <FAQSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
