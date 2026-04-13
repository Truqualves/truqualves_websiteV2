interface PageBannerProps {
  title: string;
  subtitle: string;
}

export default function PageBanner({ title, subtitle }: PageBannerProps) {
  return (
    <div className="relative overflow-hidden pt-[110px] pb-16 text-center bg-background">
      <div className="relative z-10">
        <h1 className="font-heading font-extrabold text-3xl md:text-4xl text-foreground mb-3 leading-tight">
          {title}
        </h1>
        <p className="text-base text-muted-foreground max-w-[600px] mx-auto px-6">
          {subtitle}
        </p>
      </div>
      {/* Gradient bar at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-px gradient-bar" />
    </div>
  );
}
