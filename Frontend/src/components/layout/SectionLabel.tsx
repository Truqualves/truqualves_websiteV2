interface SectionLabelProps {
  label: string;
  className?: string;
}

export default function SectionLabel({ label, className = "" }: SectionLabelProps) {
  return (
    <span
      className={`font-heading font-bold text-xs tracking-[2px] uppercase text-amber block mb-3 ${className}`}
    >
      {label}
    </span>
  );
}
