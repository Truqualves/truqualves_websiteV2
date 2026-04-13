import { useEffect, useState } from "react";
import { ArrowRight, Clock, Mail, MapPin, Phone } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import PageBanner from "@/components/layout/PageBanner";
import SectionLabel from "@/components/layout/SectionLabel";
import { toast } from "sonner";
import { useServicesQuery } from "@/hooks/useServicesQuery";
import { useContactInfoQuery } from "@/hooks/useContactInfoQuery";
export default function ContactPage() {
  useScrollReveal();
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const { data: services = [], isLoading: servicesLoading } = useServicesQuery();
  const { data: contactInfo = {}, isLoading: contactInfoLoading } = useContactInfoQuery();
  const serviceOptions = services.map((service) => service.title);
  const contactRows = [
    { icon: MapPin, title: "Office Address", text: contactInfo.officeAddress },
    { icon: Phone, title: "Phone", text: contactInfo.phone },
    { icon: Mail, title: "Email", text: contactInfo.email },
    { icon: Clock, title: "Business Hours", text: contactInfo.businessHours },
  ].filter((item) => item.text);

  const [formData, setFormData] = useState({
    firstName: "", lastName: "", email: "", company: "", service: "", message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent! We'll get back to you within 24 hours.");
    setFormData({ firstName: "", lastName: "", email: "", company: "", service: "", message: "" });
  };

  return (
    <>
      <PageBanner
        title="Contact Us"
        subtitle="Talk to our validation experts today — free consultation available."
      />

      <section className="section-padding bg-background">
        <div className="container-narrow">
          <div className="grid lg:grid-cols-[1fr_1.5fr] gap-10">
            {/* Left — Info */}
            <div className="reveal-left">
              <SectionLabel label="Get In Touch" />
              <h2 className="font-heading font-extrabold text-2xl md:text-3xl text-foreground mb-4 leading-tight">
                Let's Discuss Your Validation Needs
              </h2>
              <div className="h-[3px] w-14 gradient-bar rounded-full mb-8" />

              <div className="space-y-5 mb-8">
                {contactInfoLoading ? (
                  <p className="text-sm text-muted-foreground">Loading contact details...</p>
                ) : null}
                {!contactInfoLoading && contactRows.length === 0 ? (
                  <p className="text-sm text-muted-foreground">Contact details will be available soon.</p>
                ) : null}
                {contactRows.map((item) => (
                  <div key={item.title} className="flex gap-3 items-start">
                    <div className="w-10 h-10 rounded-lg bg-secondary border border-border flex items-center justify-center flex-shrink-0">
                      <item.icon size={18} className="text-amber" />
                    </div>
                    <div>
                      <h4 className="font-heading font-bold text-sm mb-0.5">{item.title}</h4>
                      <p className="text-sm text-muted-foreground whitespace-pre-line">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>

              {contactInfo.consultationText ? (
                <div className="p-4 bg-green-muted border border-accent/20 rounded-xl">
                  <h4 className="font-heading font-bold text-sm mb-1">✅ Initial Consultation</h4>
                  <p className="text-sm text-muted-foreground">
                    {contactInfo.consultationText}
                  </p>
                </div>
              ) : null}
            </div>

            {/* Right — Form */}
            <div className="reveal-right">
              <form onSubmit={handleSubmit} className="bg-secondary rounded-2xl p-6 md:p-8 border border-border">
                <h3 className="font-heading font-bold text-lg mb-6">Send Us a Message</h3>

                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block font-heading font-bold text-xs uppercase tracking-wide mb-1.5">
                      First Name
                    </label>
                    <input
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      placeholder="Rajesh"
                      className="w-full px-3 py-2.5 rounded-lg border border-border bg-card text-foreground text-sm focus:border-accent focus:outline-none transition-colors"
                      required
                    />
                  </div>
                  <div>
                    <label className="block font-heading font-bold text-xs uppercase tracking-wide mb-1.5">
                      Last Name
                    </label>
                    <input
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      placeholder="Mehta"
                      className="w-full px-3 py-2.5 rounded-lg border border-border bg-card text-foreground text-sm focus:border-accent focus:outline-none transition-colors"
                      required
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block font-heading font-bold text-xs uppercase tracking-wide mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="rajesh@company.com"
                    className="w-full px-3 py-2.5 rounded-lg border border-border bg-card text-foreground text-sm focus:border-accent focus:outline-none transition-colors"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block font-heading font-bold text-xs uppercase tracking-wide mb-1.5">
                    Company
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="Your Company Name"
                    className="w-full px-3 py-2.5 rounded-lg border border-border bg-card text-foreground text-sm focus:border-accent focus:outline-none transition-colors"
                  />
                </div>

                <div className="mb-4">
                  <label className="block font-heading font-bold text-xs uppercase tracking-wide mb-1.5">
                    Service of Interest
                  </label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-lg border border-border bg-card text-foreground text-sm focus:border-accent focus:outline-none transition-colors"
                  >
                    <option value="">Select a service...</option>
                    {servicesLoading ? (
                      <option value="" disabled>Loading services...</option>
                    ) : null}
                    {serviceOptions.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                    <option value="Other / Multiple Services">Other / Multiple Services</option>
                  </select>
                </div>

                <div className="mb-6">
                  <label className="block font-heading font-bold text-xs uppercase tracking-wide mb-1.5">
                    Message
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your validation requirements or questions..."
                    rows={4}
                    className="w-full px-3 py-2.5 rounded-lg border border-border bg-card text-foreground text-sm focus:border-accent focus:outline-none transition-colors resize-vertical"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-lg bg-primary text-primary-foreground font-heading font-bold text-sm uppercase tracking-wide transition-all duration-200 hover:opacity-90 active:scale-[0.97] flex items-center justify-center gap-2"
                >
                  Send Message & Request Consultation
                  <ArrowRight size={16} />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}


