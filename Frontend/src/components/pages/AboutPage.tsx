import { useEffect } from "react";
import { ShieldCheck, Target, CheckCircle2, Eye } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useTeamQuery } from "@/hooks/useTeamQuery";
import PageBanner from "@/components/layout/PageBanner";
import SectionLabel from "@/components/layout/SectionLabel";
import {
  values,
  missionVision,
  howWePartner,
  frameworks,
  milestones,
} from "@/components/pages/constant/about.data";

export default function AboutPage() {
  const { data: teamMembers = [], isLoading: isTeamLoading, isError: isTeamError } = useTeamQuery();

  useScrollReveal([isTeamLoading, teamMembers.length]);
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <>
      <PageBanner
        title="About Truqual"
        subtitle="Driven by precision, powered by expertise, committed to your compliance success."
      />

      <section className="px-6 pt-20 pb-14 md:px-8 lg:pt-28 lg:pb-16 bg-background">
        <div className="container-narrow">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <div className="reveal-left">
              <SectionLabel label="Our Story" />
              <h2 className="font-heading font-extrabold text-2xl md:text-3xl text-foreground mb-4 leading-tight">
                Built on a Foundation of Trust & Expertise
              </h2>
              <div className="h-[3px] w-14 gradient-bar rounded-full mb-6" />
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Truqual Validation Expert Services was founded with a singular mission: to help regulated
                  industries navigate the complex landscape of validation and compliance with confidence and precision.
                </p>
                <p>
                  With over 15 years of combined expertise, our team of seasoned validation specialists, quality engineers,
                  and regulatory consultants has successfully supported clients across pharmaceutical, biotech,
                  medical device, and food & beverage industries.
                </p>
                <p>
                  We believe that robust validation is not just a regulatory requirement — it's a competitive advantage.
                </p>
              </div>
            </div>
            <div className="reveal-right">
              <div className="bg-secondary border border-border rounded-2xl p-10 flex flex-col items-center justify-center min-h-[320px] gap-4">
                <img
                  src="/logo.png"
                  alt="Truqual"
                  className="h-36 w-auto sm:h-44 max-h-[220px] object-contain"
                  decoding="async"
                />
                <span className="text-muted-foreground text-xs uppercase tracking-[3px] font-heading font-semibold">
                  Since 2008
                </span>
              </div>
            </div>
          </div>

          {/* Values */}
          <div className="reveal mb-6">
            <SectionLabel label="Our Values" />
            <h2 className="font-heading font-extrabold text-2xl md:text-3xl text-foreground mb-2 leading-tight">
              What Drives Us
            </h2>
            <div className="h-[3px] w-14 gradient-bar rounded-full mt-4 mb-10" />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 stagger-children">
            {values.map((v) => (
              <div
                key={v.title}
                className="reveal text-center p-6 border border-border rounded-xl transition-all duration-300 hover:border-amber hover:shadow-lg hover:shadow-black/5"
              >
                <v.icon size={28} className="text-accent mx-auto mb-3" />
                <h3 className="font-heading font-bold text-sm mb-2">{v.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission, partnership model */}
      <section className="px-6 pt-12 pb-16 md:px-8 md:pt-14 lg:pt-14 lg:pb-20 bg-secondary/50">
        <div className="container-narrow">
          <div className="reveal mb-8">
            <SectionLabel label="Direction" />
            <h2 className="font-heading font-extrabold text-2xl md:text-3xl text-foreground mb-2 leading-tight">
              Mission &amp; Vision
            </h2>
            <div className="h-[3px] w-14 gradient-bar rounded-full mt-4" />
          </div>

          {/* Mission Section */}
          <div className="reveal mb-20">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="relative">
                <img
                  src="https://www.businessdoctorsmyanmar.com/wp-content/uploads/2015/08/shutterstock_698744419-scaled.jpg"
                  alt="Our Mission"
                  className="w-full h-auto max-h-[300px] rounded-2xl object-cover shadow-xl"
                />
              </div>
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-4">
                  <Target size={32} className="text-accent" />
                  <h3 className="font-heading font-extrabold text-2xl text-foreground">Our Mission</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  {missionVision[0].desc}
                </p>
                <ul className="space-y-3">
                  {missionVision[0].keyPoints.map((point, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle2 size={20} className="text-green-500 shrink-0 mt-0.5" />
                      <span className="text-muted-foreground leading-relaxed">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Vision Section */}
          <div className="reveal mb-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-6 md:order-1">
                <div className="flex items-center gap-3 mb-4">
                  <Eye size={32} className="text-accent" />
                  <h3 className="font-heading font-extrabold text-2xl text-foreground">Our Vision</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  {missionVision[1].desc}
                </p>
                <ul className="space-y-3">
                  {missionVision[1].keyPoints.map((point, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle2 size={20} className="text-green-500 shrink-0 mt-0.5" />
                      <span className="text-muted-foreground leading-relaxed">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="relative md:order-2">
                <img
                  src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80"
                  alt="Our Vision"
                  className="w-full h-auto max-h-[300px] rounded-2xl object-cover shadow-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How We Work Section */}
      <section className="px-6 pt-12 pb-16 md:px-8 md:pt-14 lg:pt-14 lg:pb-20 bg-background">
        <div className="container-narrow">
          <div className="reveal mb-8">
            <SectionLabel label="HOW WE WORK" />
            <h2 className="font-heading font-extrabold text-2xl md:text-3xl text-foreground mb-2 leading-tight">
              A Partnership, Not a Patchwork
            </h2>
            <div className="h-[3px] w-14 gradient-bar rounded-full mt-4" />
          </div>

          <div className="grid md:grid-cols-3 gap-6 stagger-children">
            {howWePartner.map((item) => (
              <div
                key={item.title}
                className="reveal bg-card border border-border rounded-xl p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/5 hover:border-amber"
              >
                <item.icon size={32} className="text-accent mb-4" />
                <h3 className="font-heading font-bold text-base text-foreground mb-3">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Frameworks & timeline */}
      <section className="px-6 pt-12 pb-16 md:px-8 md:pt-14 lg:pt-14 lg:pb-20 bg-background">
        <div className="container-narrow">
          <div className="reveal mb-8">
            <SectionLabel label="Standards" />
            <h2 className="font-heading font-extrabold text-2xl md:text-3xl text-foreground mb-2 leading-tight">
              Frameworks We Align With
            </h2>
            <p className="text-muted-foreground text-sm max-w-2xl mt-4 leading-relaxed">
              Every engagement maps to the regulations and guidances your auditors care about — so evidence is consistent from protocol to inspection.
            </p>
            <div className="h-[3px] w-14 gradient-bar rounded-full mt-4" />
          </div>

          <div className="flex flex-wrap gap-3 stagger-children mb-12">
            {frameworks.map((f) => (
              <div
                key={f}
                className="reveal inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2.5 text-sm font-heading font-semibold text-foreground"
              >
                <ShieldCheck size={16} className="text-accent shrink-0" />
                {f}
              </div>
            ))}
          </div>

          <div className="reveal mb-8">
            <SectionLabel label="Our Path" />
            <h2 className="font-heading font-extrabold text-2xl md:text-3xl text-foreground mb-2 leading-tight">
              Milestones
            </h2>
            <div className="h-[3px] w-14 gradient-bar rounded-full mt-4" />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 stagger-children">
            {milestones.map((ms) => (
              <div
                key={ms.year + ms.label}
                className="reveal relative border border-border rounded-xl p-6 bg-card overflow-hidden group"
              >
                <div className="absolute top-0 left-0 right-0 h-1 gradient-bar scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300" />
                <div className="font-heading font-extrabold text-2xl text-amber tabular-nums mb-1">{ms.year}</div>
                <div className="font-heading font-bold text-xs uppercase tracking-wide text-foreground mb-2">{ms.label}</div>
                <p className="text-sm text-muted-foreground leading-relaxed">{ms.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="px-6 pt-12 pb-20 md:px-8 md:pt-14 lg:pt-14 lg:pb-28 bg-secondary/50">
        <div className="container-narrow">
          <div className="reveal mb-8">
            <SectionLabel label="Our Team" />
            <h2 className="font-heading font-extrabold text-2xl md:text-3xl text-foreground mb-2 leading-tight">
              Leadership &amp; Experts
            </h2>
            <div className="h-[3px] w-14 gradient-bar rounded-full mt-4" />
          </div>

          {isTeamLoading ? (
            <div className="rounded-xl border border-border bg-card p-10">
              <div className="flex flex-col items-center justify-center gap-3">
                <div className="h-10 w-10 animate-spin rounded-full border-2 border-accent/30 border-t-accent" />
                <p className="text-sm text-muted-foreground">Loading team members...</p>
              </div>
            </div>
          ) : null}

          {!isTeamLoading && isTeamError ? (
            <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-6 text-sm text-destructive">
              Unable to load team members right now. Please try again shortly.
            </div>
          ) : null}

          {!isTeamLoading && !isTeamError && teamMembers.length === 0 ? (
            <div className="rounded-xl border border-border bg-card p-6 text-sm text-muted-foreground">
              No team members are available yet.
            </div>
          ) : null}

          {!isTeamLoading && !isTeamError && teamMembers.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children">
              {teamMembers.map((member) => (
                <div
                  key={member._id}
                  className="reveal rounded-xl border border-border overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-black/5 hover:-translate-y-1 bg-card"
                >
                  <div className="aspect-[3/2] bg-secondary overflow-hidden">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover object-top"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="font-heading font-bold text-base mb-0.5">{member.name}</h3>
                    <div className="text-amber font-heading font-bold text-xs uppercase tracking-wide mb-2">
                      {member.role}
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{member.desc}</p>
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
