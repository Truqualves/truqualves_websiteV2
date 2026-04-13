import { useEffect } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useCaseStudiesQuery } from "@/hooks/useCaseStudiesQuery";
import PageBanner from "@/components/layout/PageBanner";
import SectionLabel from "@/components/layout/SectionLabel";

export default function CaseStudiesPage() {
  const { data: caseStudies = [], isLoading, isError } = useCaseStudiesQuery();

  useScrollReveal([isLoading, caseStudies.length]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <PageBanner
        title="Case Studies"
        subtitle="Real-world validation challenges solved with precision and expertise."
      />

      <section className="section-padding bg-background">
        <div className="container-narrow">
          <div className="reveal mb-10">
            <SectionLabel label="Our Work" />
            <h2 className="font-heading font-extrabold text-2xl md:text-3xl text-foreground mb-2 leading-tight">
              Proven Results Across Industries
            </h2>
            <div className="h-[3px] w-14 gradient-bar rounded-full mt-4" />
          </div>

          {isLoading ? (
            <div className="rounded-xl border border-border bg-card p-10">
              <div className="flex flex-col items-center justify-center gap-3">
                <div className="h-10 w-10 animate-spin rounded-full border-2 border-accent/30 border-t-accent" />
                <p className="text-sm text-muted-foreground">Loading case studies...</p>
              </div>
            </div>
          ) : null}

          {!isLoading && isError ? (
            <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-6 text-sm text-destructive">
              Unable to load case studies right now. Please try again shortly.
            </div>
          ) : null}

          {!isLoading && !isError && caseStudies.length === 0 ? (
            <div className="rounded-xl border border-border bg-card p-6 text-sm text-muted-foreground">
              No case studies are available yet.
            </div>
          ) : null}

          {!isLoading && !isError && caseStudies.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-6 stagger-children">
              {caseStudies.map((caseStudy) => (
                <div
                  key={caseStudy._id}
                  className="reveal rounded-xl border border-border overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-black/5 hover:-translate-y-1"
                >
                  <div className="bg-secondary border-b border-border p-5">
                    <div className="flex justify-between items-center gap-3 mb-3">
                      <span className="text-xs font-heading font-bold text-accent bg-accent/15 px-3 py-1 rounded-full">
                        {caseStudy.tag}
                      </span>
                      <span className="text-xs font-heading font-semibold text-muted-foreground uppercase tracking-wider text-right">
                        {caseStudy.industry}
                      </span>
                    </div>
                    <h3 className="font-heading font-bold text-base text-foreground leading-snug">
                      {caseStudy.title}
                    </h3>
                  </div>

                  <div className="p-5 space-y-4">
                    <div>
                      <div className="text-xs font-heading font-bold uppercase tracking-wider text-amber mb-1">
                        Challenge
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {caseStudy.challenge}
                      </p>
                    </div>
                    <div>
                      <div className="text-xs font-heading font-bold uppercase tracking-wider text-amber mb-1">
                        Our Approach
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {caseStudy.approach}
                      </p>
                    </div>
                    <div className="bg-green-muted border-l-[3px] border-accent rounded-r-lg p-3">
                      <p className="text-sm text-foreground font-medium">
                        {caseStudy.result}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </section>
    </>
  );
}
