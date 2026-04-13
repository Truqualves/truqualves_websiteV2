import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import SectionLabel from "@/components/layout/SectionLabel";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useServiceQuery } from "@/hooks/useServicesQuery";

export default function ServiceDetailsPage() {
  useScrollReveal();
  const { slug } = useParams<{ slug: string }>();
  const { data: service, isLoading, isError } = useServiceQuery(slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  return (
    <section className="section-padding bg-background">
      <div className="container-narrow">
        <div className="mb-8">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors no-underline"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="font-heading font-medium text-sm">Back to all services</span>
          </Link>
        </div>

        {isLoading ? (
          <div className="rounded-xl border border-border bg-card p-10">
            <div className="flex flex-col items-center justify-center gap-3">
              <div className="h-10 w-10 animate-spin rounded-full border-2 border-accent/30 border-t-accent" />
              <p className="text-sm text-muted-foreground">Loading service details...</p>
            </div>
          </div>
        ) : null}

        {!isLoading && isError ? (
          <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-6 text-sm text-destructive">
            Service not found or failed to load.
          </div>
        ) : null}

        {!isLoading && !isError && !service ? (
          <div className="rounded-xl border border-border bg-card p-6 text-sm text-muted-foreground">
            Service not found.
          </div>
        ) : null}

        {!isLoading && !isError && service ? (
          <article>
            <header className="mb-8">
              {service.category?.length ? (
                <div className="flex flex-wrap gap-2 justify-center mb-5">
                  {service.category.map((cat) => (
                    <span
                      key={cat}
                      className="px-3 py-1 rounded-full bg-amber/15 text-amber text-xs font-heading font-bold uppercase tracking-wide"
                    >
                      {cat}
                    </span>
                  ))}
                </div>
              ) : null}

              <h1 className="font-heading font-extrabold text-3xl md:text-4xl text-foreground leading-tight text-center mb-6">
                {service.title}
              </h1>

              <p className="text-base md:text-lg text-muted-foreground leading-relaxed text-center max-w-3xl mx-auto pb-8 border-b border-border">
                {service.shortDescription}
              </p>
            </header>

            {service.heroImage ? (
              <div className="rounded-2xl overflow-hidden border border-border bg-secondary/30 max-w-2xl mx-auto mb-10">
                <img
                  src={service.heroImage}
                  alt={service.title}
                  className="w-full h-full object-contain max-h-[340px]"
                />
              </div>
            ) : null}

            <div className="max-w-4xl mx-auto">
              <section className="mb-8">
                <SectionLabel label="Overview" />
                {service.contentBody?.overview ? (
                  <p className="text-sm md:text-base text-foreground leading-relaxed">
                    {service.contentBody.overview}
                  </p>
                ) : (
                  <p className="text-sm md:text-base text-muted-foreground italic">
                    No data to display
                  </p>
                )}
              </section>

              <section className="mb-8">
                <SectionLabel label="Scope" />
                {service.contentBody?.scope ? (
                  <p className="text-sm md:text-base text-foreground leading-relaxed">
                    {service.contentBody.scope}
                  </p>
                ) : (
                  <p className="text-sm md:text-base text-muted-foreground italic">
                    No data to display
                  </p>
                )}
              </section>

              <section className="mb-8">
                <SectionLabel label="Methodology" />
                {service.contentBody?.methodology ? (
                  <p className="text-sm md:text-base text-foreground leading-relaxed">
                    {service.contentBody.methodology}
                  </p>
                ) : (
                  <p className="text-sm md:text-base text-muted-foreground italic">
                    No data to display
                  </p>
                )}
              </section>

              <section className="mb-8">
                <SectionLabel label="Deliverables" />
                {service.contentBody?.deliverables?.length ? (
                  <ul className="list-disc pl-6 space-y-2 text-sm md:text-base text-foreground leading-relaxed">
                    {service.contentBody.deliverables.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm md:text-base text-muted-foreground italic">
                    No data to display
                  </p>
                )}
              </section>

              <section className="mb-8">
                <SectionLabel label="FAQ" />
                {service.contentBody?.faq?.length ? (
                  <div className="space-y-4">
                    {service.contentBody.faq.map((item) => (
                      <div key={`${item.question}-${item.answer}`} className="rounded-xl border border-border bg-card p-4">
                        <h3 className="font-heading font-bold text-foreground mb-1">{item.question}</h3>
                        <p className="text-sm md:text-base text-foreground leading-relaxed">
                          {item.answer}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm md:text-base text-muted-foreground italic">
                    No data to display
                  </p>
                )}
              </section>

              <section>
                <SectionLabel label="Conclusion" />
                {service.contentBody?.conclusion ? (
                  <p className="text-sm md:text-base text-foreground leading-relaxed">
                    {service.contentBody.conclusion}
                  </p>
                ) : (
                  <p className="text-sm md:text-base text-muted-foreground italic">
                    No data to display
                  </p>
                )}
              </section>
            </div>
          </article>
        ) : null}
      </div>
    </section>
  );
}
