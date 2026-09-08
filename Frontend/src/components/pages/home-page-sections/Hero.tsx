import { ArrowRight, Sparkles, Stethoscope } from "lucide-react";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <main className="relative bg-[hsl(210,20%,98%)] overflow-hidden font-body">
      {/* Ambient glows */}
      <div className="absolute -top-[180px] -left-[180px] w-[600px] h-[600px] rounded-full pointer-events-none z-0 bg-[radial-gradient(circle,hsla(37,91%,53%,0.14)_0%,transparent_70%)] blur-[60px]" />
      <div className="absolute -bottom-[120px] -right-[120px] w-[600px] h-[600px] rounded-full pointer-events-none z-0 bg-[radial-gradient(circle,hsla(103,62%,59%,0.12)_0%,transparent_70%)] blur-[60px]" />

      {/* Grid overlay */}
      <div className="absolute inset-0 z-0 opacity-[0.07] pointer-events-none bg-[size:60px_60px] bg-[linear-gradient(hsla(213,39%,11%,0.5)_1px,transparent_1px),linear-gradient(90deg,hsla(213,39%,11%,0.5)_1px,transparent_1px)]" />

      {/* Energy lines SVG */}
      <svg
        className="absolute inset-0 w-full h-full z-0 pointer-events-none"
        viewBox="0 0 1440 820"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="energy" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f5b529" stopOpacity="0" />
            <stop offset="56%" stopColor="#f5b529" stopOpacity=".56" />
            <stop offset="100%" stopColor="#a7e85a" />
          </linearGradient>
          <linearGradient id="energyGlow" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f5b529" stopOpacity="0" />
            <stop offset="76%" stopColor="#a7e85a" stopOpacity=".45" />
            <stop offset="100%" stopColor="#a7e85a" stopOpacity="0" />
          </linearGradient>
          <filter id="softGlow">
            <feGaussianBlur stdDeviation="7" />
          </filter>
        </defs>
        <path d="M350 820 C710 690 1080 665 1480 320" stroke="url(#energyGlow)" strokeWidth="36" fill="none" filter="url(#softGlow)" />
        <path d="M340 820 C730 680 1090 650 1480 282" stroke="url(#energy)" strokeWidth="3" fill="none" />
        <path d="M440 820 C785 682 1100 640 1480 252" stroke="url(#energy)" strokeWidth="1.3" fill="none" opacity=".74" />
        <path d="M535 820 C835 676 1110 600 1480 216" stroke="url(#energy)" strokeWidth="1" fill="none" opacity=".52" />
        <path d="M760 820 C1000 676 1210 548 1480 472" stroke="#f5b529" strokeWidth="1" fill="none" opacity=".34" />
      </svg>

      {/* Hero */}
      <section className="relative z-10 max-w-[1320px] mx-auto px-5 pt-28 pb-16 md:px-8 md:pt-32 md:pb-24 text-center flex flex-col items-center gap-6" id="top">
        <a
          className="inline-flex items-center gap-2 border border-[hsl(214,20%,89%)] bg-white rounded-full px-4 py-[0.4rem] text-[0.8125rem] font-medium text-[hsl(215,16%,47%)] no-underline transition-all duration-200 ease-out shadow-[0_1px_4px_hsla(213,39%,11%,0.06)] hover:border-[hsl(37,91%,53%)] hover:text-[hsl(213,39%,11%)] hover:shadow-[0_2px_8px_hsla(37,91%,53%,0.18)]"
          href="#process"
        >
          <span className="text-[hsl(37,91%,53%)] font-semibold">Validation consulting</span>
          See our three-phase process <ArrowRight size={15} />
        </a>

        <h1 className="font-heading text-[clamp(2.4rem,5.5vw,4.25rem)] font-bold leading-[1.15] text-[hsl(213,39%,11%)] m-0 tracking-[-0.025em] max-w-[950px]">
          Validation You Can <span className="text-[hsl(37,91%,53%)] font-extrabold">Trust.</span>
          <br />
          Compliance You Can Prove.
        </h1>

        <p className="font-body text-lg text-[hsl(215,16%,47%)] leading-[1.75] max-w-[820px] m-0">
          End-to-end validation and regulatory compliance services for pharmaceutical,
          biotech, and medical device companies — from process design to FDA approval.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            className="inline-flex items-center gap-2 px-9 py-[0.9rem] bg-[hsl(37,91%,53%)] hover:bg-[hsl(37,91%,45%)] text-[hsl(213,39%,11%)] rounded-[0.875rem] font-bold text-base no-underline transition-all duration-200 ease-out shadow-[0_4px_16px_hsla(37,91%,53%,0.35)] hover:shadow-[0_8px_24px_hsla(37,91%,53%,0.45)] hover:-translate-y-0.5 cursor-pointer"
            to="/contact"
          >
            <Sparkles size={16} /> Request a consultation
          </Link>
          <Link
            to="/services"
            className="glow-hover-25 inline-flex items-center gap-2 rounded-lg border border-black bg-white px-6 py-3 text-sm font-semibold text-black transition-all hover:-translate-y-0.5"
          >
            Our Services
          </Link>
        </div>

        <p className="text-sm text-[hsl(215,16%,47%)] font-medium mt-2 mb-1">
          Trusted by quality leaders in regulated industries
        </p>

        <div className="flex flex-wrap items-center justify-center gap-9" aria-label="Trusted industries">
          <span className="flex items-center gap-[0.55rem] text-[1.0625rem] font-semibold text-[hsl(213,39%,11%)] tracking-[-0.01em]">
            <b className="not-italic text-[1.25rem] leading-none inline-flex items-center justify-center border-0 outline-none shadow-none select-none text-[hsl(37,91%,53%)]">ϟ</b> Specialty Pharma
          </span>
          <span className="flex items-center gap-[0.55rem] text-[1.0625rem] font-semibold text-[hsl(213,39%,11%)] tracking-[-0.01em]">
            <b className="not-italic text-[1.25rem] leading-none inline-flex items-center justify-center border-0 outline-none shadow-none select-none text-[hsl(103,62%,59%)]">◇</b> Biotech
          </span>
          <span className="flex items-center gap-[0.55rem] text-[1.0625rem] font-semibold text-[hsl(213,39%,11%)] tracking-[-0.01em]">
            <b className="not-italic text-[1.25rem] leading-none inline-flex items-center justify-center border-0 outline-none shadow-none select-none text-[hsl(37,91%,53%)]">≋</b> Medical Devices
          </span>
          <span className="flex items-center gap-[0.55rem] text-[1.0625rem] font-semibold text-[hsl(213,39%,11%)] tracking-[-0.01em]">
            <span className="not-italic text-[1.25rem] leading-none inline-flex items-center justify-center border-0 outline-none shadow-none select-none text-[hsl(103,62%,59%)]">
              <Stethoscope size={18} focusable={false} />
            </span> Clinical Operations
          </span>
        </div>
      </section>
    </main>
  );
}
