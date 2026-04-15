import SectionLabel from "@/components/layout/SectionLabel";
import { processSteps } from "@/components/pages/constant/home.data";

export default function EngagementModelSection() {
  return (
    <section className="pt-12 pb-20 md:pt-16 md:pb-24 bg-secondary/40 border-y border-border/60">
      <div className="container-narrow">
        <div className="reveal text-center max-w-2xl mx-auto mb-12">
          <SectionLabel label="How We Work" />
          <h2 className="font-heading font-extrabold text-2xl md:text-3xl text-foreground mb-3 leading-tight">
            A Validation Approach Built for Regulated Teams
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            We combine regulatory depth with execution discipline so your team gets
            fast momentum without sacrificing documentation quality.
          </p>
          <div className="h-[3px] w-14 gradient-bar rounded-full mt-5 mx-auto" />
        </div>

        <div className="grid lg:grid-cols-3 gap-6 stagger-children">
          {processSteps.map((item) => (
            <div
              key={item.step}
              className="reveal relative bg-card border border-border rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/5 hover:border-accent group"
            >
              <span className="absolute top-[2px] left-1/2 -translate-x-1/2 -translate-y-1/2 inline-flex items-center justify-center w-12 h-12 rounded-full bg-accent text-white font-heading font-bold text-lg">
                {item.step}
              </span>
              <div className="p-6 pt-10 text-center">
                <h3 className="font-heading font-bold text-lg text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.desc}
                </p>
              </div>
              <div className="relative h-64 overflow-hidden flex items-center justify-center bg-muted/20">
                <img
                  src={item.image}
                  alt={item.title}
                  className="max-w-[80%] max-h-full object-contain"
                  loading="lazy"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
