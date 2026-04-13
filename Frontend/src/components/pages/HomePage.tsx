import { useEffect, Suspense, lazy } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useServicesQuery } from "@/hooks/useServicesQuery";

const Hero = lazy(() => import("./home-page-sections/Hero"));
const ServicesSection = lazy(() => import("./home-page-sections/ServicesSection"));
const EngagementModelSection = lazy(() => import("./home-page-sections/EngagementModelSection"));
const WhyTruqualSection = lazy(() => import("./home-page-sections/WhyTruqualSection"));
const DeliverablesSection = lazy(() => import("./home-page-sections/DeliverablesSection"));
const ClientResultsSection = lazy(() => import("./home-page-sections/ClientResultsSection"));

function SectionFallback() {
  return (
    <div className="min-h-[200px] flex items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-accent/30 border-t-accent" />
    </div>
  );
}

export default function HomePage() {
  const { data: services = [], isLoading: servicesLoading } = useServicesQuery();
  const featuredServices = services.slice(0, 6);
  useScrollReveal([servicesLoading, featuredServices.length]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Suspense fallback={<SectionFallback />}>
      <Hero />
      <ServicesSection services={services} servicesLoading={servicesLoading} />
      <EngagementModelSection />
      <WhyTruqualSection />
      <DeliverablesSection />
      <ClientResultsSection />
    </Suspense>
  );
}
