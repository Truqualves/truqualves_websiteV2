import { useEffect } from "react";
import { ArrowLeft, Calendar, User } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import SectionLabel from "@/components/layout/SectionLabel";
import { useBlogQuery } from "@/hooks/useBlogsQuery";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export default function BlogDetailsPage() {
  useScrollReveal();

  const { id } = useParams<{ id: string }>();
  const blogId = Number(id);
  const isInvalidId = !Number.isFinite(blogId);
  const { data: post, isLoading, isError } = useBlogQuery(blogId);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  return (
    <section className="section-padding bg-background">
        <div className="container-narrow">
        <div className="mb-8">
          <Link
            to="/resources"
            className="inline-flex items-center gap-2 text-foreground hover:text-accent transition-colors no-underline"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="font-heading font-medium text-sm">Back to all posts</span>
          </Link>
        </div>

        {isLoading ? (
          <div className="rounded-xl border border-border bg-card p-10">
            <div className="flex flex-col items-center justify-center gap-3">
              <div className="h-10 w-10 animate-spin rounded-full border-2 border-accent/30 border-t-accent" />
              <p className="text-sm text-foreground">Loading blog details...</p>
            </div>
          </div>
        ) : null}

        {!isLoading && isInvalidId ? (
          <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-6 text-sm text-destructive">
            Blog post not found.
          </div>
        ) : null}

        {!isLoading && !isInvalidId && isError ? (
          <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-6 text-sm text-destructive">
            Blog post not found or failed to load.
          </div>
        ) : null}

        {!isLoading && !isInvalidId && !isError && !post ? (
          <div className="rounded-xl border border-border bg-card p-6 text-sm text-foreground">
            Blog post not found.
          </div>
        ) : null}

        {!isLoading && !isInvalidId && !isError && post ? (
          <article>
            <header className="mb-8">
              {post.category?.length ? (
                <div className="flex flex-wrap gap-2 justify-center mb-5">
                  {post.category.map((cat) => (
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
                {post.title}
              </h1>

              <div className="flex flex-wrap items-center justify-center gap-6 pb-8 border-b border-border">
                <div className="flex items-center gap-2 text-foreground">
                  <span className="w-9 h-9 rounded-full bg-secondary/70 border border-border inline-flex items-center justify-center">
                    <User className="w-4 h-4" />
                  </span>
                  <span className="font-heading font-semibold text-foreground">{post.author}</span>
                </div>

                <div className="flex items-center gap-2 text-foreground">
                  <Calendar className="w-4 h-4" />
                  <span>{post.date}</span>
                </div>
              </div>
            </header>

            <div className="rounded-2xl overflow-hidden border border-border bg-secondary/30 max-w-3xl mx-auto mb-10">
              <img src={post.image} alt={post.title} className="w-full h-full object-contain max-h-[420px]" />
            </div>

            <div className="max-w-4xl mx-auto">
              <section className="mb-8">
                <SectionLabel label="Description" />
                <p className="text-base md:text-lg text-foreground leading-relaxed">
                  {post.description}
                </p>
              </section>

              {post.contentBody?.introduction ? (
                <section className="mb-8">
                  <SectionLabel label="Introduction" />
                  <p className="text-sm md:text-base text-foreground leading-relaxed">
                    {post.contentBody.introduction}
                  </p>
                </section>
              ) : null}

              {post.contentBody?.keyTakeaways?.length ? (
                <section className="mb-8">
                  <SectionLabel label="Key Takeaways" />
                  <ul className="list-disc pl-6 space-y-2 text-sm md:text-base text-foreground leading-relaxed">
                    {post.contentBody.keyTakeaways.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>
              ) : null}

              {post.contentBody?.elaborated ? (
                <section className="mb-8">
                  <SectionLabel label="Detailed Insights" />
                  <p className="text-sm md:text-base text-foreground leading-relaxed">
                    {post.contentBody.elaborated}
                  </p>
                </section>
              ) : null}

              {post.contentBody?.quote ? (
                <blockquote className="mb-8 rounded-lg border border-border bg-secondary/40 p-5 font-heading italic text-foreground">
                  "{post.contentBody.quote}"
                </blockquote>
              ) : null}

              {post.contentBody?.conclusion ? (
                <section>
                  <SectionLabel label="Conclusion" />
                  <p className="text-sm md:text-base text-foreground leading-relaxed">
                    {post.contentBody.conclusion}
                  </p>
                </section>
              ) : null}
            </div>
          </article>
        ) : null}
      </div>
    </section>
  );
}
