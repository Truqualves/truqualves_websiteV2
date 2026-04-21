import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import PageBanner from "@/components/layout/PageBanner";
import SectionLabel from "@/components/layout/SectionLabel";
import { useServicesQuery } from "@/hooks/useServicesQuery";
import { getServiceIcon } from "@/components/pages/service-pages/serviceIconMap";

export default function ServicesPage() {
  const { data: services = [], isLoading, isError } = useServicesQuery();
  useScrollReveal([isLoading, services.length]);
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <>
      <PageBanner
        title="Our Services"
        subtitle="Comprehensive validation and compliance solutions tailored to your industry needs."
      />

      <section className="section-padding bg-background">
        <div className="container-narrow">
          <div className="reveal mb-10">
            <SectionLabel label="Service Portfolio" />
            <h2 className="font-heading font-extrabold text-2xl md:text-3xl text-foreground mb-2 leading-tight">
              End-to-End Validation Expertise
            </h2>
            <div className="h-[3px] w-14 gradient-bar rounded-full mt-4" />
          </div>

          {isLoading ? (
            <div className="rounded-xl border border-border bg-card p-10">
              <div className="flex flex-col items-center justify-center gap-3">
                <div className="h-10 w-10 animate-spin rounded-full border-2 border-accent/30 border-t-accent" />
                <p className="text-sm text-muted-foreground">Loading services...</p>
              </div>
            </div>
          ) : null}

          {!isLoading && isError ? (
            <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-6 text-sm text-destructive">
              Unable to load services right now. Please try again shortly.
            </div>
          ) : null}

          {!isLoading && !isError && services.length === 0 ? (
            <div className="rounded-xl border border-border bg-card p-6 text-sm text-muted-foreground">
              No services are available yet.
            </div>
          ) : null}

          {!isLoading && !isError && services.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 stagger-children">
              {services.map((s) => {
                const ServiceIcon = getServiceIcon(s.iconKey);
                return (
                  <div
                    key={s.slug}
                    className="reveal group relative bg-card border border-border rounded-xl p-6 transition-all duration-300 hover:shadow-xl hover:shadow-black/5 hover:-translate-y-1 hover:border-accent overflow-hidden"
                  >
                    <div className="absolute top-0 left-0 right-0 h-[3px] gradient-bar origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent/15 to-primary/10 flex items-center justify-center mb-4">
                      <ServiceIcon size={22} className="text-accent" />
                    </div>
                    <h3 className="font-heading font-bold text-base text-foreground mb-2">
                      {s.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {s.shortDescription}
                    </p>
                    <Link
                      to={`/services/${s.slug}`}
                      className="inline-flex items-center gap-1 mt-4 text-amber font-heading font-bold text-xs uppercase tracking-wide no-underline hover:gap-2 transition-all"
                    >
                      Learn More <ArrowRight size={14} />
                    </Link>
                  </div>
                );
              })}
            </div>
          ) : null}
        </div>
      </section>
    </>
  );
}
