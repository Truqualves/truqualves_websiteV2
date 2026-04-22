import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import SectionLabel from "@/components/layout/SectionLabel";
import { truqualvesPillars, whyTruqualLeftCardItems } from "@/components/pages/constant/home.data";

const SLIDE_DURATION_MS = 4500;

export default function WhyTruqualSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setActiveIndex((prev) => (prev + 1) % whyTruqualLeftCardItems.length);
    }, SLIDE_DURATION_MS);

    return () => window.clearTimeout(timer);
  }, [activeIndex]);

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

      <div className="mx-auto max-w-[88rem] relative z-10">
        <div className="reveal text-center max-w-2xl mx-auto mb-12">
          <SectionLabel label="Why TruQual" />
          <h2 className="font-heading font-extrabold text-2xl md:text-3xl text-foreground mb-3 leading-tight">
            Built for regulated teams that need speed, proof, and zero ambiguity.
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            TruQualves combines validation depth, audit-ready documentation, and practical execution support so your teams can move from qualification to inspection with confidence.
          </p>
          <div className="h-[3px] w-14 gradient-bar rounded-full mt-5 mx-auto" />
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-stretch">
          <div className="reveal relative overflow-hidden rounded-[28px] border border-border/80 bg-white p-4 md:p-5 shadow-[0_24px_60px_rgba(15,23,42,0.08)]">
            <div className="relative">
              <div className="overflow-hidden rounded-[22px] border border-border/70 bg-card">
                <div className="p-4 md:p-5 bg-secondary/20">
                  <div className="grid gap-4 sm:grid-cols-3">
                    {whyTruqualLeftCardItems.map((item, index) => {
                      const isActive = index === activeIndex;
                      const Icon = item.icon;

                      return (
                        <button
                          type="button"
                          key={item.title}
                          onClick={() => setActiveIndex(index)}
                          className={`relative rounded-xl border px-3 py-4 text-left transition-all duration-300 ${
                            isActive
                              ? "border-accent/40 bg-card shadow-sm"
                              : "border-border/70 bg-card/70 hover:border-accent/30"
                          }`}
                        >
                          <div className="absolute left-0 top-0 h-[3px] w-full bg-border/80" />
                          <div
                            className="absolute left-0 top-0 h-[3px] gradient-bar"
                            style={{
                              width: isActive ? "100%" : "0%",
                              transition: isActive
                                ? `width ${SLIDE_DURATION_MS}ms linear`
                                : "none",
                            }}
                          />
                          <div
                            className={`mb-3 flex items-center gap-2 font-heading text-lg font-bold leading-tight ${
                              isActive ? "text-foreground" : "text-muted-foreground"
                            }`}
                          >
                            <Icon
                              size={18}
                              className={isActive ? "text-accent" : "text-muted-foreground"}
                            />
                            <span>{item.title}</span>
                          </div>
                          <p
                            className={`text-sm leading-relaxed ${
                              isActive ? "text-foreground/80" : "text-muted-foreground"
                            }`}
                          >
                            {item.desc}
                          </p>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="relative h-64 overflow-hidden bg-secondary/20 sm:h-72 lg:h-80">
                  <img
                    src={whyTruqualLeftCardItems[activeIndex].image}
                    alt={whyTruqualLeftCardItems[activeIndex].title}
                    className="h-full w-full object-contain object-center"
                    loading="lazy"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/15 to-transparent" />
                </div>
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
