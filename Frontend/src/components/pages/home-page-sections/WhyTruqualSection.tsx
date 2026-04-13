import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import SectionLabel from "@/components/layout/SectionLabel";
import { truqualvesPillars } from "@/components/pages/constant/home.data";

export default function WhyTruqualSection() {
  return (
    <section className="py-12 md:py-16 relative overflow-hidden bg-background">
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "linear-gradient(hsla(213,39%,11%,0.04) 1px, transparent 1px), linear-gradient(90deg, hsla(213,39%,11%,0.04) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />

      <div className="container-narrow relative z-10">
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-stretch">
          <div className="reveal relative overflow-hidden rounded-[28px] border border-border/80 bg-white p-6 md:p-8 shadow-[0_24px_60px_rgba(15,23,42,0.08)]">
            <div className="relative">
              <SectionLabel label="Why TruQual" />
              <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-extrabold leading-tight text-foreground max-w-xl mb-4">
                Built for regulated teams that need speed, proof, and zero ambiguity.
              </h2>
              <p className="max-w-2xl text-sm sm:text-base text-muted-foreground leading-relaxed mb-8">
                TruQualVES combines validation depth, audit-ready documentation, and practical execution support so your teams can move from qualification to inspection with confidence.
              </p>

              <div className="grid gap-4 sm:grid-cols-3">
                {[
                  ["Risk-first planning", "Site-specific validation logic from day one"],
                  ["Cross-functional delivery", "Quality, engineering, and operations in sync"],
                  ["Inspection-ready output", "Evidence packages structured for review"],
                ].map(([title, desc]) => (
                  <div
                    key={title}
                    className="rounded-2xl border border-border/70 bg-secondary/40 px-4 py-5 backdrop-blur-sm"
                  >
                    <div className="font-heading text-xs font-bold uppercase tracking-[0.18em] text-amber mb-2">
                      {title}
                    </div>
                    <p className="text-sm leading-relaxed text-muted-foreground">{desc}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:items-center sm:justify-center">
                <Link
                  to="/about"
                  className="inline-flex w-full sm:w-auto justify-center items-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-heading font-bold uppercase tracking-wide text-primary-foreground no-underline transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/30 active:scale-[0.97]"
                >
                  Explore Our Approach
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>

          <div className="stagger-children grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            {truqualvesPillars.map((pillar, index) => (
              <div
                key={pillar.title}
                className={`reveal relative overflow-hidden rounded-[24px] border p-5 md:p-6 shadow-[0_18px_45px_rgba(15,23,42,0.08)] ${
                  index === 1
                    ? "border-accent/30 bg-white"
                    : "border-border/80 bg-white/90"
                }`}
              >
                <div
                  className="absolute inset-x-0 top-0 h-1"
                  style={{
                    background:
                      index === 1
                        ? "linear-gradient(90deg, hsl(var(--amber)), hsl(var(--green)))"
                        : "linear-gradient(90deg, hsla(37,91%,53%,0.55), hsla(103,62%,59%,0.4))",
                  }}
                />
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-secondary/70">
                    <pillar.icon size={22} className="text-amber" />
                  </div>
                  <div>
                    <div className="font-heading text-lg font-bold text-foreground mb-2">
                      {pillar.title}
                    </div>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {pillar.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            <div className="reveal grid grid-cols-3 gap-3 rounded-[24px] border border-border/80 bg-white p-4 md:p-5 shadow-[0_18px_45px_rgba(15,23,42,0.06)]">
              {[
                ["GMP", "Aligned"],
                ["CSV", "Structured"],
                ["QA", "Defensible"],
              ].map(([value, label]) => (
                <div key={value} className="rounded-2xl bg-secondary/50 px-3 py-4 text-center">
                  <div className="font-heading text-lg sm:text-xl font-extrabold text-amber">
                    {value}
                  </div>
                  <div className="mt-1 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
