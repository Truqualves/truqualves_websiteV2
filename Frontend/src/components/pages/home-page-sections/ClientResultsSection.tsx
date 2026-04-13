import { Star } from "lucide-react";
import SectionLabel from "@/components/layout/SectionLabel";
import { clientTestimonials } from "@/components/pages/constant/home.data";

function StarRating() {
  return (
    <div className="flex items-center gap-0.5 mb-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={13} className="text-amber fill-amber" />
      ))}
    </div>
  );
}

export default function ClientResultsSection() {
  return (
    <section className="section-padding bg-background">
      <div className="container-narrow">
        <div className="reveal text-center max-w-2xl mx-auto mb-12">
          <SectionLabel label="Client Results" />
          <h2 className="font-heading font-extrabold text-2xl md:text-3xl text-foreground mb-3 leading-tight">
            Trusted by Regulated Teams Across the Lifecycle
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            From first qualification to post-market surveillance - here&apos;s what
            teams say after working with TruQual.
          </p>
          <div className="h-[3px] w-14 gradient-bar rounded-full mt-5 mx-auto" />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 stagger-children mb-16">
          {clientTestimonials.map((t) => (
            <div
              key={t.name}
              className="reveal group relative bg-card border border-border rounded-xl p-6 transition-all duration-300 hover:shadow-xl hover:shadow-black/5 hover:-translate-y-1 hover:border-accent overflow-hidden flex flex-col"
            >
              <div className="absolute top-0 left-0 right-0 h-[3px] gradient-bar origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />

              <StarRating />

              <p className="text-sm text-muted-foreground leading-relaxed flex-1 mb-6">
                &quot;{t.quote}&quot;
              </p>

              <div className="flex items-center gap-3 pt-5 border-t border-border/60">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center font-heading font-bold text-xs flex-shrink-0 bg-amber/10 text-amber border border-amber/20"
                >
                  {t.initials}
                </div>
                <div>
                  <div className="font-heading font-bold text-sm text-foreground leading-tight">
                    {t.name}
                  </div>
                  <div className="text-[11px] text-muted-foreground mt-0.5">
                    {t.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
