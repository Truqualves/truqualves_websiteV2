import {
  Radar,
  FileCheck2,
  Layers3,
  SlidersHorizontal,
  Handshake,
  ShieldCheck,
} from "lucide-react";
import AssessMapImg from "@/assets/Assess_map.webp";
import DocumentExecuteImg from "@/assets/Document_execute.webp";
import SustainImproveImg from "@/assets/Sustain_improve.webp";
import CrossFunctionalImg from "@/assets/Cross-functional.png";
import InspectionReadyImg from "@/assets/Inspection-ready.png";
import RiskFirstImg from "@/assets/risk_first.png";

export const stats = [
  { value: "10+", label: "Projects Delivered" },
  { value: "15+", label: "Enterprise Clients" },
  { value: "98.3%", label: "Audit Pass Rate" },
  { value: "2+", label: "Years Expertise" },
];

export const processSteps = [
  {
    step: "01",
    title: "Assess & Map",
    desc: "We review your facility, systems, and regulatory obligations to define a practical validation roadmap.",
    image: AssessMapImg,
  },
  {
    step: "02",
    title: "Document & Execute",
    desc: "Our team builds protocols, executes qualification activities, and captures evidence with inspection-ready rigor.",
    image: DocumentExecuteImg,
  },
  {
    step: "03",
    title: "Sustain & Improve",
    desc: "We close gaps, train stakeholders, and support long-term compliance through change control and periodic review.",
    image: SustainImproveImg,
  },
];

export const truqualvesPillars = [
  {
    title: "Precision-Led Strategy",
    desc: "Every validation path is shaped around your process risk, system complexity, and inspection exposure rather than generic templates.",
    icon: Radar,
  },
  {
    title: "Documentation That Holds",
    desc: "Protocols, evidence, and approvals are built to remain readable, traceable, and defensible long after project handoff.",
    icon: FileCheck2,
  },
  {
    title: "Execution With Control",
    desc: "We align engineering, quality, and operations so qualification work moves quickly without weakening compliance discipline.",
    icon: Layers3,
  },
];

export const whyTruqualLeftCardItems = [
  {
    title: "Risk-first planning",
    desc: "Site-specific validation logic from day one",
    image: RiskFirstImg,
    icon: SlidersHorizontal,
  },
  {
    title: "Cross-functional delivery",
    desc: "Quality, engineering, and operations in sync",
    image: CrossFunctionalImg,
    icon: Handshake,
  },
  {
    title: "Inspection-ready output",
    desc: "Evidence packages structured for review",
    image: InspectionReadyImg,
    icon: ShieldCheck,
  },
];

export const deliverables = [
  "Validation master plans aligned to your site and product risk profile",
  "IQ/OQ/PQ, CSV, and method validation protocols with traceable evidence",
  "Gap assessments and remediation plans for inspections and audits",
  "Standard operating procedures and training support for operational readiness",
];

export interface ClientTestimonial {
  quote: string;
  name: string;
  role: string;
  initials: string;
}

export const clientTestimonials: ClientTestimonial[] = [
  {
    quote:
      "Our FDA inspection was the smoothest we've had in 12 years. The documentation package TruQual delivered had zero observations against it. We've never felt that confident walking into an audit.",
    name: "Sarah R.",
    role: "VP Quality - Specialty Pharma, NJ",
    initials: "SR",
  },
  {
    quote:
      "We were 6 weeks behind on a critical CSV project. TruQual embedded with our team, got up to speed in days, and we hit our go-live date. The traceability matrix alone saved us weeks of back-and-forth with QA.",
    name: "Marcus P.",
    role: "Director IT Compliance - Biotech, MA",
    initials: "MP",
  },
  {
    quote:
      "What set them apart was that they understood both the regulatory side and the operational side. We didn't have to translate between QA and engineering - TruQual bridged it naturally.",
    name: "Jennifer L.",
    role: "Head of Operations - Medical Devices, CA",
    initials: "JL",
  },
];

export const clientTrustSignals = [
  "No commitment required",
  "Response within 1 business day",
  "NDA available on request",
];
