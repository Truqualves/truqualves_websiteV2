import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import { stats } from "@/components/pages/constant/home.data";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.5, ease: "easeOut" as const },
  }),
};

export default function Hero() {
  return (
    <>
      {/* ===== HERO ===== */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden bg-background">
        {/* Light gradient background */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage:
              "linear-gradient(135deg, hsl(var(--background)) 0%, hsl(var(--background)) 44%, hsl(var(--primary) / 0.08) 100%)",
          }}
        />

        {/* Radial accents */}
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-primary/10 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-primary/5 blur-[100px] pointer-events-none" />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 z-0 opacity-[0.08]"
          style={{
            backgroundImage:
              "linear-gradient(hsl(var(--foreground) / 0.45) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground) / 0.45) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Vertical scanning line */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[2px] h-full z-0 overflow-hidden">
          <div className="w-full h-[80px] bg-gradient-to-b from-transparent via-primary/60 to-transparent" style={{ animation: "scanV 3s linear infinite" }} />
        </div>

        {/* Horizontal scanning line */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full h-[2px] z-0 overflow-hidden">
          <div className="h-full w-[80px] bg-gradient-to-r from-transparent via-primary/60 to-transparent" style={{ animation: "scanH 3s linear infinite" }} />
        </div>

        <style>{`@keyframes scanV{0%{transform:translateY(-100%)}100%{transform:translateY(100vh)}}@keyframes scanH{0%{transform:translateX(-100%)}100%{transform:translateX(100vw)}}`}</style>

        <div className="container relative z-10 py-20 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left */}
            <motion.div
              className="space-y-8"
              initial="hidden"
              animate="visible"
            >
              <motion.div custom={0} variants={fadeUp}>
                <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse-dot" />
                  Expert Services
                </span>
              </motion.div>

              <motion.h1
                custom={1}
                variants={fadeUp}
                className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] text-foreground"
              >
                Validation You Can{" "}
                <span className="text-primary">Trust.</span>
                <br />
                Compliance You Can{" "}
                <span className="text-green-500">Prove.</span>
              </motion.h1>

              <motion.p
                custom={2}
                variants={fadeUp}
                className="text-lg text-muted-foreground max-w-lg leading-relaxed"
              >
                End-to-end validation and regulatory compliance services for pharmaceutical,
                biotech, and medical device companies — from process design to FDA approval.
              </motion.p>

              <motion.div custom={3} variants={fadeUp} className="flex flex-wrap gap-4">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 hover:bg-primary/90 transition-all"
                >
                  Request Consultation
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/services"
                  className="inline-flex items-center gap-2 rounded-lg border border-border bg-background/80 backdrop-blur px-6 py-3 text-sm font-semibold text-foreground hover:bg-muted transition-all"
                >
                  Our Services
                </Link>
              </motion.div>

              {/* Stats */}
              <motion.div
                custom={4}
                variants={fadeUp}
                className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-4 border-t border-border/60"
              >
                {stats.map((s) => (
                  <div key={s.label} className="space-y-1">
                    <p className="text-2xl font-bold text-foreground">
                      {s.value}
                    </p>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">
                      {s.label}
                    </p>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right — feature cards */}
            <motion.div
              className="grid grid-cols-2 gap-4"
              initial="hidden"
              animate="visible"
            >
              {[
                { icon: "🔬", title: "CSV Standrads", desc: "21 CFR Part 11 ready" },
                { icon: "🏭", title: "GMP Validated", desc: "EU & WHO standards" },
                { icon: "📊", title: "Risk-Based", desc: "ICH Q9 methodology" },
                { icon: "🎯", title: "First-Pass Success", desc: "98.3% audit pass rate" },
              ].map((card, i) => (
                <motion.div
                  key={card.title}
                  custom={i + 2}
                  variants={fadeUp}
                  className="group relative rounded-2xl border border-border/60 bg-card/80 backdrop-blur-md p-6 shadow-sm hover:shadow-xl hover:border-primary/30 hover:-translate-y-1 transition-all duration-300"
                >
                  <span className="text-3xl block mb-3">{card.icon}</span>
                  <h3 className="font-semibold text-foreground mb-1">
                    {card.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{card.desc}</p>
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section className="border-t border-border/60 bg-muted/30 py-8">
        <div className="container flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          {["FDA 21 CFR Part 11", "EU GMP Annex 11", "ICH Q8/Q9/Q10", "ISO 13485", "GAMP 5 Certified", "ALCOA+"].map((item) => (
            <div key={item} className="flex items-center gap-2 text-muted-foreground">
              <CheckCircle className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium whitespace-nowrap">
                {item}
              </span>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
