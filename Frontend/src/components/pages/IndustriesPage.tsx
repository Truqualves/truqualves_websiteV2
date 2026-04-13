import { useEffect } from "react";
import {
  Pill,
  Stethoscope,
  Factory,
  Beaker,
  Building2,
  Leaf,
  FlaskConical,
  Microscope,
  HeartPulse,
  ShieldCheck,
  Cpu,
  Database,
  Dna,
  TestTube2,
  Syringe,
  Hospital,
  LucideIcon,
} from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import PageBanner from "@/components/layout/PageBanner";
import SectionLabel from "@/components/layout/SectionLabel";
import { useIndustriesQuery } from "@/hooks/useIndustriesQuery";

const INDUSTRY_ICONS: Record<string, LucideIcon> = {
  Pill,
  Stethoscope,
  Factory,
  Beaker,
  Building2,
  Leaf,
  FlaskConical,
  Microscope,
  HeartPulse,
  ShieldCheck,
  Cpu,
  Database,
  Dna,
  TestTube2,
  Syringe,
  Hospital,
};

export default function IndustriesPage() {
  const { data: industries = [], isLoading, isError } = useIndustriesQuery();
  const cardShapeClass = "rounded-[3.5rem_1.2rem_3.5rem_1.2rem]";
  useScrollReveal([isLoading, industries.length]);
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <>
      <PageBanner
        title="Industries We Serve"
        subtitle="Deep domain expertise across regulated industries worldwide."
      />

      <section className="section-padding bg-background">
        <div className="container-narrow">
          <div className="reveal mb-10">
            <SectionLabel label="Sectors" />
            <h2 className="font-heading font-extrabold text-2xl md:text-3xl text-foreground mb-2 leading-tight">
              Cross-Industry Validation Mastery
            </h2>
            <div className="h-[3px] w-14 gradient-bar rounded-full mt-4" />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 stagger-children">
            {isLoading ? (
              <div className="rounded-xl border border-border bg-card p-6 text-sm text-muted-foreground sm:col-span-2 lg:col-span-3">
                Loading industries...
              </div>
            ) : null}

            {!isLoading && isError ? (
              <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-6 text-sm text-destructive sm:col-span-2 lg:col-span-3">
                Unable to load industries right now. Please try again shortly.
              </div>
            ) : null}

            {!isLoading && !isError && industries.length === 0 ? (
              <div className="rounded-xl border border-border bg-card p-6 text-sm text-muted-foreground sm:col-span-2 lg:col-span-3">
                No industries available at the moment.
              </div>
            ) : null}

            {!isLoading && !isError && industries.map((ind) => {
              const Icon = INDUSTRY_ICONS[ind.iconKey] || Building2;
              return (
              <div
                key={ind._id}
                className={`reveal group relative bg-card border border-border p-6 min-h-[220px] transition-all duration-300 hover:shadow-xl hover:shadow-black/5 hover:-translate-y-1 hover:border-accent overflow-hidden ${cardShapeClass}`}
              >
                <div className="absolute top-0 left-0 right-0 h-[3px] gradient-bar origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent/15 to-primary/10 flex items-center justify-center mb-4">
                  <Icon size={22} className="text-accent" />
                </div>
                <h3 className="font-heading font-bold text-base text-foreground mb-2">
                  {ind.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {ind.description}
                </p>
              </div>
            )})}
          </div>
        </div>
      </section>
    </>
  );
}
