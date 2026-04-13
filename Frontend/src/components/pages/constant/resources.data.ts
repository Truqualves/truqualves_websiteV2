import { BookOpenText, Download, FileText, Scale, ShieldCheck } from "lucide-react";

export const resourceArticles = [
  {
    date: "14 Mar",
    tag: "Regulatory Update",
    title: "FDA Draft Guidance on Process Validation: Key Changes to Review",
    summary:
      "A practical summary of proposed updates that affect process design, lifecycle monitoring, and continued process verification plans.",
    icon: Scale,
  },
  {
    date: "08 Mar",
    tag: "CSV",
    title: "GAMP 5 Second Edition: What Changes for Validation Teams",
    summary:
      "An implementation-focused guide to risk-based testing, software categorization updates, and cloud validation expectations.",
    icon: ShieldCheck,
  },
  {
    date: "01 Mar",
    tag: "Data Integrity",
    title: "Top Data Integrity Findings and How to Close Them Fast",
    summary:
      "Common integrity gaps seen in inspections and a prioritized remediation sequence teams can execute without disrupting operations.",
    icon: BookOpenText,
  },
];

export const resourceDownloads = [
  {
    title: "Validation Master Plan Template",
    description: "Editable framework for risk-based VMP development.",
    icon: FileText,
  },
  {
    title: "Risk Assessment Matrix",
    description: "Simple FMEA-based scoring sheet for GxP processes.",
    icon: Download,
  },
];
