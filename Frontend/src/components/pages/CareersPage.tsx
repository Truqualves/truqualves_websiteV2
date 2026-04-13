import { useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import PageBanner from "@/components/layout/PageBanner";
import SectionLabel from "@/components/layout/SectionLabel";
import { useJobOpeningsQuery } from "@/hooks/useJobOpeningsQuery";
import { careerBenefits, roleMetaIcons } from "@/components/pages/constant/careers.data";
import type { JobOpening } from "@/types/jobOpening";
import ApplyJobDialog from "@/components/pages/careers/ApplyJobDialog";

export default function CareersPage() {
  const { data: jobOpenings = [], isLoading, isError } = useJobOpeningsQuery();
  useScrollReveal([isLoading, jobOpenings.length]);
  const [isApplyDialogOpen, setIsApplyDialogOpen] = useState(false);
  const [selectedOpening, setSelectedOpening] = useState<JobOpening | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleApplyClick = (opening: JobOpening) => {
    setSelectedOpening(opening);
    setIsApplyDialogOpen(true);
  };

  return (
    <>
      <PageBanner
        title="Careers at Truqual"
        subtitle="Build your career with a quality-first team delivering validation excellence."
      />

      <section className="section-padding bg-background">
        <div className="container-narrow">
          <div className="reveal mb-10">
            <SectionLabel label="Why Join Us" />
            <h2 className="font-heading font-extrabold text-2xl md:text-3xl text-foreground mb-2 leading-tight">
              Grow With Purpose
            </h2>
            <div className="h-[3px] w-14 gradient-bar rounded-full mt-4" />
          </div>

          <div className="grid md:grid-cols-3 gap-5 stagger-children mb-14">
            {careerBenefits.map((item) => (
              <div
                key={item.title}
                className="reveal bg-card border border-border rounded-xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/5 hover:border-accent"
              >
                <div className="w-12 h-12 rounded-xl border border-border bg-secondary/60 flex items-center justify-center mb-4">
                  <item.icon size={22} className="text-amber" />
                </div>
                <h3 className="font-heading font-bold text-base text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="reveal mb-10">
            <SectionLabel label="Open Positions" />
            <h2 className="font-heading font-extrabold text-2xl md:text-3xl text-foreground mb-2 leading-tight">
              Current Openings
            </h2>
            <div className="h-[3px] w-14 gradient-bar rounded-full mt-4" />
          </div>

          <div className="space-y-4 stagger-children">
            {isLoading ? (
              <div className="rounded-xl border border-border bg-card p-6 text-sm text-muted-foreground">
                Loading job openings...
              </div>
            ) : null}

            {!isLoading && isError ? (
              <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-6 text-sm text-destructive">
                Unable to load job openings right now. Please try again shortly.
              </div>
            ) : null}

            {!isLoading && !isError && jobOpenings.length === 0 ? (
              <div className="rounded-xl border border-border bg-card p-6 text-sm text-muted-foreground">
                No openings available at the moment.
              </div>
            ) : null}

            {!isLoading && !isError && jobOpenings.length > 0
              ? jobOpenings.map((role) => (
                  <div
                    key={role._id}
                    className="reveal bg-card border border-border rounded-xl p-5 md:p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 transition-all duration-300 hover:shadow-lg hover:shadow-black/5 hover:border-accent"
                  >
                    <div>
                      <h3 className="font-heading font-bold text-lg text-foreground mb-2">{role.title}</h3>
                      <div className="flex flex-wrap gap-2.5">
                        <span className="inline-flex items-center gap-1.5 text-xs font-heading font-semibold px-3 py-1.5 rounded-full border border-border bg-secondary/40 text-foreground">
                          <roleMetaIcons.location size={13} className="text-amber" />
                          {role.location}
                        </span>
                        <span className="inline-flex items-center gap-1.5 text-xs font-heading font-semibold px-3 py-1.5 rounded-full border border-border bg-secondary/40 text-foreground">
                          <roleMetaIcons.type size={13} className="text-amber" />
                          {role.type}
                        </span>
                        <span className="inline-flex items-center gap-1.5 text-xs font-heading font-semibold px-3 py-1.5 rounded-full border border-border bg-secondary/40 text-foreground">
                          <roleMetaIcons.experience size={13} className="text-amber" />
                          {role.experience}
                        </span>
                        <span className="inline-flex items-center text-xs font-heading font-semibold px-3 py-1.5 rounded-full border border-border bg-secondary/40 text-foreground">
                          {role.skills}
                        </span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleApplyClick(role)}
                      className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-md bg-primary text-primary-foreground font-heading font-bold text-xs uppercase tracking-wide no-underline hover:opacity-90 transition-opacity md:self-start"
                    >
                      Apply Now
                      <ArrowRight size={14} />
                    </button>
                  </div>
                ))
              : null}
          </div>
        </div>
      </section>

      <ApplyJobDialog
        isOpen={isApplyDialogOpen}
        selectedOpening={selectedOpening}
        openings={jobOpenings}
        onClose={() => setIsApplyDialogOpen(false)}
      />
    </>
  );
}
