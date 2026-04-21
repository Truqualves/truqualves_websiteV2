import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import SectionLabel from "@/components/layout/SectionLabel";
import { getServiceIcon } from "@/components/pages/service-pages/serviceIconMap";
import type { Service } from "@/types/service";

interface ServicesSectionProps {
  services: Service[];
  servicesLoading: boolean;
}

export default function ServicesSection({ services, servicesLoading }: ServicesSectionProps) {
  const featuredServices = services.slice(0, 6);
  const cardShapeClass = "rounded-[3.5rem_1.2rem_3.5rem_1.2rem]";

  return (
    <section className="section-padding bg-background">
      <div className="container-narrow">
        <div className="reveal">
          <SectionLabel label="What We Do" />
          <h2 className="font-heading font-extrabold text-2xl md:text-3xl text-foreground mb-2 leading-tight">
            End-to-End Validation Expertise
          </h2>
          <div className="h-[3px] w-14 gradient-bar rounded-full mt-4 mb-10" />
        </div>

        {servicesLoading ? (
          <div className="rounded-xl border border-border bg-card p-10">
            <div className="flex flex-col items-center justify-center gap-3">
              <div className="h-10 w-10 animate-spin rounded-full border-2 border-accent/30 border-t-accent" />
              <p className="text-sm text-muted-foreground">Loading services...</p>
            </div>
          </div>
        ) : null}

        {!servicesLoading && featuredServices.length === 0 ? (
          <div className="rounded-xl border border-border bg-card p-6 text-sm text-muted-foreground">
            Services will be available soon.
          </div>
        ) : null}

        {!servicesLoading && featuredServices.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 stagger-children">
            {featuredServices.map((s) => {
              const ServiceIcon = getServiceIcon(s.iconKey);
              return (
                <div
                  key={s.slug}
                  className={`reveal group relative bg-card border border-border p-6 min-h-[220px] transition-all duration-300 hover:shadow-xl hover:shadow-black/5 hover:-translate-y-1 hover:border-accent overflow-hidden ${cardShapeClass}`}
                >
                  {/* Top accent bar */}
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
  );
}
