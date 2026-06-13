import { useEffect, useMemo } from "react";
import { 
  ShieldCheck, 
  Target, 
  CheckCircle2, 
  Eye, 
  Users, 
  FileCheck, 
  CalendarClock, 
  Lightbulb, 
  Scale, 
  ShieldAlert, 
  BookOpen, 
  Settings,
  Activity,
  Wrench,
  Briefcase,
  Play
} from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useTeamQuery } from "@/hooks/useTeamQuery";
import { useAboutPageQuery } from "@/hooks/useAboutPageQuery";
import PageBanner from "@/components/layout/PageBanner";
import SectionLabel from "@/components/layout/SectionLabel";

const iconMap: Record<string, any> = {
  ShieldCheck,
  Target,
  CheckCircle2,
  Eye,
  Users,
  FileCheck,
  CalendarClock,
  Lightbulb,
  Scale,
  ShieldAlert,
  BookOpen,
  Settings,
  Activity,
  Wrench,
  Briefcase
};

const getIcon = (key?: string) => iconMap[key || ""] || ShieldCheck;

export default function AboutPage() {
  const { data: teamMembers = [], isLoading: isTeamLoading, isError: isTeamError } = useTeamQuery();
  const { data: aboutContent, isLoading: isAboutLoading } = useAboutPageQuery();

  const isLoading = isTeamLoading || isAboutLoading;

  useScrollReveal([isLoading, teamMembers.length]);
  useEffect(() => { window.scrollTo(0, 0); }, []);

  // Use dynamic content or defaults if backend is empty
  const content = useMemo(() => ({
    story: aboutContent?.story || {
      title: "Built on a Foundation of Trust & Expertise",
      sinceYear: 2008,
      content: [
        "Truqual Validation Expert Services was founded with a singular mission: to help regulated industries navigate the complex landscape of validation and compliance with confidence and precision.",
        "With over 15 years of combined expertise, our team of seasoned validation specialists, quality engineers, and regulatory consultants has successfully supported clients across pharmaceutical, biotech, medical device, and food & beverage industries."
      ]
    },
    howWeWork: aboutContent?.howWeWork || {
      title: "A Partnership, Not a Patchwork",
      subtitle: "HOW WE WORK",
      desc: "We work alongside your team as embedded specialists, delivering audit-ready packages and milestone-driven results that align with your regulatory timelines.",
      videoLink: "#",
      items: []
    },
    values: aboutContent?.values || [],
    mission: aboutContent?.mission || { title: "Our Mission", desc: "", keyPoints: [] },
    vision: aboutContent?.vision || { title: "Our Vision", desc: "", keyPoints: [] },
    standards: aboutContent?.standards || {
      title: "Frameworks We Align With",
      subtitle: "Standards",
      desc: "Every engagement maps to the regulations and guidances your auditors care about.",
      items: []
    },
    milestones: aboutContent?.milestones || []
  }), [aboutContent]);

  if (isLoading && !aboutContent) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-accent/20 border-t-accent" />
          <p className="text-sm font-medium text-muted-foreground animate-pulse">Loading experience...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <PageBanner
        title="About Truqual"
        subtitle="Driven by precision, powered by expertise, committed to your compliance success."
      />

      <section className="px-6 pt-20 pb-14 md:px-8 lg:pt-28 lg:pb-16 bg-background overflow-hidden">
        <div className="container-narrow">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <div className="reveal-left">
              <SectionLabel label="Our Story" />
              <h2 className="font-heading font-extrabold text-2xl md:text-3xl text-foreground mb-4 leading-tight">
                {content.story.title}
              </h2>
              <div className="h-[3px] w-14 gradient-bar rounded-full mb-6" />
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                {content.story.content.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>
            <div className="reveal-right">
              <div className="bg-secondary border border-border rounded-2xl p-10 flex flex-col items-center justify-center min-h-[320px] gap-4 group relative overflow-hidden">
                {content.story.image ? (
                  <img
                    src={content.story.image}
                    alt="Our Story"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                ) : (
                  <>
                    <img
                      src="/logo.png"
                      alt="Truqual"
                      className="h-36 w-auto sm:h-44 max-h-[220px] object-contain relative z-10"
                    />
                    <span className="text-muted-foreground text-xs uppercase tracking-[3px] font-heading font-semibold relative z-10">
                      Since {content.story.sinceYear}
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* How We Work Section */}
          <div className="reveal">
            <SectionLabel label={content.howWeWork.subtitle || "HOW WE WORK"} />
            <h2 className="font-heading font-extrabold text-2xl md:text-3xl text-foreground mb-2 leading-tight">
              {content.howWeWork.title}
            </h2>
            <div className="h-[3px] w-14 gradient-bar rounded-full mt-4 mb-2" />
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-12">
            <div className="reveal">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl group cursor-pointer">
                <img
                  src={content.howWeWork.videoThumbnail || "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80"}
                  alt="Watch Our Story"
                  className="w-full h-auto max-h-[400px] object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center mx-auto mb-4 border border-white/30 group-hover:scale-110 transition-transform">
                      <Play className="w-8 h-8 text-white fill-current" />
                    </div>
                    <span className="text-white font-heading font-bold text-xs uppercase tracking-[0.2em]">Watch Our Story</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="reveal space-y-8">
              <h3 className="font-heading font-extrabold text-2xl md:text-3xl text-foreground leading-tight">
                {content.howWeWork.subtitle === "Partnership" ? "Your Trusted Partner in GxP Compliance" : content.howWeWork.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {content.howWeWork.desc}
              </p>
              <div className="space-y-6">
                {content.howWeWork.items.map((item, index) => {
                  const Icon = getIcon(item.icon);
                  return (
                    <div key={index} className="flex gap-4 group">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent group-hover:text-white transition-all duration-300">
                          <Icon size={24} className="text-accent group-hover:text-white" />
                        </div>
                      </div>
                      <div>
                        <h4 className="font-heading font-bold text-base text-foreground mb-1 group-hover:text-accent transition-colors">{item.title}</h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Values */}
          {content.values.length > 0 && (
            <>
              <div className="reveal mb-6 mt-20">
                <SectionLabel label="Our Values" />
                <h2 className="font-heading font-extrabold text-2xl md:text-3xl text-foreground mb-2 leading-tight">
                  What Drives Us
                </h2>
                <div className="h-[3px] w-14 gradient-bar rounded-full mt-4 mb-10" />
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 stagger-children">
                {content.values.map((v, i) => {
                  const Icon = getIcon(v.icon);
                  return (
                    <div
                      key={i}
                      className="reveal text-center p-8 border border-border rounded-2xl transition-all duration-300 hover:border-accent hover:shadow-2xl hover:shadow-accent/5 hover:-translate-y-1 bg-card"
                    >
                      <div className="w-16 h-16 rounded-2xl bg-accent/5 flex items-center justify-center mx-auto mb-6">
                        <Icon size={32} className="text-accent" />
                      </div>
                      <h3 className="font-heading font-bold text-base text-foreground mb-3">{v.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Mission, Vision */}
      <section className="px-6 pt-20 pb-20 md:px-8 lg:pt-28 lg:pb-32 bg-secondary/30 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 gradient-bar opacity-20" />
        <div className="container-narrow">
          <div className="reveal mb-12">
            <SectionLabel label="Direction" />
            <h2 className="font-heading font-extrabold text-2xl md:text-3xl text-foreground mb-2 leading-tight">
              Mission &amp; Vision
            </h2>
            <div className="h-[3px] w-14 gradient-bar rounded-full mt-4" />
          </div>

          {/* Mission Section */}
          <div className="reveal mb-24">
            <div className="grid md:grid-cols-2 gap-12 items-center text-left">
              <div className="relative group">
                <div className="absolute -inset-4 bg-accent/5 rounded-[2rem] blur-2xl group-hover:bg-accent/10 transition-colors" />
                <img
                  src={content.mission.image || "https://www.businessdoctorsmyanmar.com/wp-content/uploads/2015/08/shutterstock_698744419-scaled.jpg"}
                  alt="Our Mission"
                  className="relative w-full h-auto max-h-[400px] rounded-3xl object-cover shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]"
                />
              </div>
              <div className="space-y-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center">
                    <Target size={28} className="text-accent" />
                  </div>
                  <h3 className="font-heading font-extrabold text-2xl text-foreground">{content.mission.title}</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed text-lg italic border-l-4 border-accent pl-6">
                  {content.mission.desc}
                </p>
                <ul className="space-y-4 pt-4">
                  {content.mission.keyPoints.map((point, index) => (
                    <li key={index} className="flex items-start gap-3 group/item">
                      <div className="mt-1 w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0 group-hover/item:bg-emerald-500 transition-colors">
                        <CheckCircle2 size={14} className="text-emerald-500 group-hover/item:text-white transition-colors" />
                      </div>
                      <span className="text-muted-foreground leading-relaxed font-medium">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Vision Section */}
          <div className="reveal">
            <div className="grid md:grid-cols-2 gap-12 items-center text-left">
              <div className="space-y-6 md:order-1">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center">
                    <Eye size={28} className="text-accent" />
                  </div>
                  <h3 className="font-heading font-extrabold text-2xl text-foreground">{content.vision.title}</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed text-lg italic border-l-4 border-accent pl-6">
                  {content.vision.desc}
                </p>
                <ul className="space-y-4 pt-4">
                  {content.vision.keyPoints.map((point, index) => (
                    <li key={index} className="flex items-start gap-3 group/item">
                      <div className="mt-1 w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0 group-hover/item:bg-emerald-500 transition-colors">
                        <CheckCircle2 size={14} className="text-emerald-500 group-hover/item:text-white transition-colors" />
                      </div>
                      <span className="text-muted-foreground leading-relaxed font-medium">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="relative md:order-2 group">
                <div className="absolute -inset-4 bg-accent/5 rounded-[2rem] blur-2xl group-hover:bg-accent/10 transition-colors" />
                <img
                  src={content.vision.image || "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80"}
                  alt="Our Vision"
                  className="relative w-full h-auto max-h-[400px] rounded-3xl object-cover shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Standards */}
      <section className="px-6 pt-20 pb-20 md:px-8 lg:pt-28 lg:pb-32 bg-background">
        <div className="container-narrow">
          <div className="reveal mb-12 text-center md:text-left">
            <SectionLabel label={content.standards.subtitle || "Standards"} />
            <h2 className="font-heading font-extrabold text-2xl md:text-3xl text-foreground mb-4 leading-tight">
              {content.standards.title}
            </h2>
            <p className="text-muted-foreground text-base max-w-2xl mt-4 leading-relaxed">
              {content.standards.desc}
            </p>
            <div className="h-[3px] w-14 gradient-bar rounded-full mt-6 mx-auto md:mx-0" />
          </div>

          <div className="flex flex-wrap justify-center md:justify-start gap-3 stagger-children mb-24">
            {content.standards.items.map((f, i) => (
              <div
                key={i}
                className="reveal inline-flex items-center gap-2.5 rounded-full border border-border bg-card px-5 py-3 text-sm font-heading font-bold text-foreground hover:border-accent hover:text-accent transition-colors shadow-sm"
              >
                <ShieldCheck size={18} className="text-accent shrink-0" />
                {f}
              </div>
            ))}
          </div>

          {/* Milestones */}
          {content.milestones.length > 0 && (
            <>
              <div className="reveal mb-12">
                <SectionLabel label="Our Path" />
                <h2 className="font-heading font-extrabold text-2xl md:text-3xl text-foreground mb-2 leading-tight">
                  Milestones
                </h2>
                <div className="h-[3px] w-14 gradient-bar rounded-full mt-4" />
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 stagger-children">
                {content.milestones.map((ms, i) => (
                  <div
                    key={i}
                    className="reveal relative border border-border rounded-2xl p-8 bg-card overflow-hidden group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                  >
                    <div className="absolute top-0 left-0 right-0 h-1.5 gradient-bar scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500" />
                    <div className="font-heading font-extrabold text-3xl text-accent tabular-nums mb-2 tracking-tight">{ms.year}</div>
                    <div className="font-heading font-bold text-xs uppercase tracking-[0.2em] text-foreground/60 mb-4">{ms.label}</div>
                    <p className="text-sm text-muted-foreground leading-relaxed font-medium">{ms.text}</p>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Team */}
      <section className="px-6 pt-20 pb-24 md:px-8 lg:pt-28 lg:pb-36 bg-secondary/30 relative">
        <div className="absolute top-0 left-0 w-full h-1 gradient-bar opacity-10" />
        <div className="container-narrow text-center md:text-left">
          <div className="reveal mb-12">
            <SectionLabel label="Our Team" />
            <h2 className="font-heading font-extrabold text-2xl md:text-3xl text-foreground mb-2 leading-tight">
              Leadership &amp; Experts
            </h2>
            <div className="h-[3px] w-14 gradient-bar rounded-full mt-4 mx-auto md:mx-0" />
          </div>

          {isTeamLoading ? (
            <div className="rounded-2xl border border-border bg-card p-20 shadow-sm">
              <div className="flex flex-col items-center justify-center gap-4">
                <div className="h-12 w-12 animate-spin rounded-full border-4 border-accent/20 border-t-accent" />
                <p className="text-sm font-medium text-muted-foreground">Synchronizing team data...</p>
              </div>
            </div>
          ) : null}

          {!isTeamLoading && isTeamError ? (
            <div className="rounded-2xl border border-destructive/20 bg-destructive/5 p-8 text-center text-sm text-destructive font-medium shadow-sm">
              Unable to load team members right now. Please try again shortly.
            </div>
          ) : null}

          {!isTeamLoading && !isTeamError && teamMembers.length === 0 ? (
            <div className="rounded-2xl border border-border bg-card p-12 text-center text-sm text-muted-foreground font-medium shadow-sm">
              No team members are currently listed.
            </div>
          ) : null}

          {!isTeamLoading && !isTeamError && teamMembers.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 stagger-children">
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
