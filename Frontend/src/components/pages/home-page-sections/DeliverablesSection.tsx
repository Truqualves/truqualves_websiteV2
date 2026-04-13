import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import SectionLabel from "@/components/layout/SectionLabel";
import { deliverables } from "@/components/pages/constant/home.data";

export default function DeliverablesSection() {
  return (
    <section className="py-12 md:py-16 bg-background">
      <div className="container-narrow">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8 items-stretch">
          <div className="reveal-left bg-card border border-border rounded-2xl p-6 md:p-8 shadow-lg">
            <SectionLabel label="What You Receive" />
            <h2 className="font-heading font-extrabold text-2xl md:text-3xl text-foreground mb-4 leading-tight">
              Deliverables That Stand Up to Review
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8 max-w-2xl">
              Every engagement is structured around usable documentation, clean traceability,
              and practical handoff materials your quality and operations teams can rely on.
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              {deliverables.map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 rounded-xl border border-border/80 bg-secondary/30 px-4 py-4"
                >
                  <CheckCircle2 size={18} className="text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-foreground leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="reveal-right relative overflow-hidden rounded-2xl border border-border bg-card p-6 md:p-8 shadow-lg">
            <div className="relative z-10">
              <SectionLabel label="Execution Standard" />
              <h3 className="font-heading font-extrabold text-2xl text-foreground mb-4 leading-tight">
                Ready for Internal QA and External Inspection
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                We build documentation packages that are clear enough for operators,
                defensible enough for auditors, and structured enough for long-term maintenance.
              </p>

              <div className="space-y-4 mb-8">
                {[
                  ["Risk-based rationale", "Aligned to ICH, GAMP 5, and site-specific quality requirements."],
                  ["Traceable evidence", "Protocols, deviations, approvals, and reports remain connected and reviewable."],
                  ["Operational handoff", "Your internal team gets documentation they can actually sustain after go-live."],
                ].map(([title, desc]) => (
                  <div key={title} className="border-b border-border/80 pb-4 last:border-b-0 last:pb-0">
                    <div className="font-heading font-bold text-sm uppercase tracking-wide text-amber mb-1">
                      {title}
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
                  </div>
                ))}
              </div>

              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-primary text-primary-foreground font-heading font-bold text-sm uppercase tracking-wide no-underline transition-all duration-200 hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5 active:scale-[0.97]"
              >
                Discuss Your Project
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
