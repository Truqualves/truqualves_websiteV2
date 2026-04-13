import { useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import SectionLabel from "@/components/layout/SectionLabel";
import { useBlogsQuery } from "@/hooks/useBlogsQuery";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export default function ResourcesPage() {
  const { data: blogs = [], isLoading, isError } = useBlogsQuery();
  useScrollReveal([isLoading, blogs.length]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="section-padding bg-background">
      <div className="container-narrow">
        <div className="reveal mb-8">
          <SectionLabel label="Latest Articles" />
          <h2 className="font-heading font-extrabold text-2xl md:text-3xl text-foreground mb-2 leading-tight">
            Blog & Insights
          </h2>
          <div className="h-[3px] w-14 gradient-bar rounded-full mt-4" />
        </div>

        {isLoading ? (
          <div className="rounded-xl border border-border bg-card p-10">
            <div className="flex flex-col items-center justify-center gap-3">
              <div className="h-10 w-10 animate-spin rounded-full border-2 border-accent/30 border-t-accent" />
              <p className="text-sm text-muted-foreground">Loading blog posts...</p>
            </div>
          </div>
        ) : null}

        {!isLoading && isError ? (
          <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-6 text-sm text-destructive">
            Unable to load blogs right now. Please try again shortly.
          </div>
        ) : null}

        {!isLoading && !isError && blogs.length === 0 ? (
          <div className="rounded-xl border border-border bg-card p-6 text-sm text-muted-foreground">
            No blog posts are available yet.
          </div>
        ) : null}

        {!isLoading && !isError && blogs.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 stagger-children">
            {blogs.map((blog) => (
              <div
                key={blog.id}
                className="reveal group relative bg-card border border-border rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-black/5 hover:-translate-y-1 hover:border-accent"
              >
                <div className="absolute top-0 left-0 right-0 h-[3px] gradient-bar origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 z-10" />
                <div className="relative overflow-hidden aspect-video bg-secondary/40 flex items-center justify-center">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-full object-contain"
                    loading="lazy"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-heading font-bold text-base text-foreground mb-2 line-clamp-2">
                    {blog.title}
                  </h3>
                  {/* <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                    {blog.description}
                  </p> */}
                  <Link
                    to={`/blogs/${blog.id}`}
                    className="inline-flex items-center gap-1 mt-4 text-amber font-heading font-bold text-xs uppercase tracking-wide no-underline hover:gap-2 transition-all"
                  >
                    Learn More <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
