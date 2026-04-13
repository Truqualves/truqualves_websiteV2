import type { LucideIcon } from "lucide-react";
import {
  Wrench,
  Monitor,
  Shield,
  FlaskConical,
  ClipboardCheck,
  AlertTriangle,
  Thermometer,
  Factory,
  GraduationCap,
  Layers,
  GitBranch,
  Database,
  Microscope,
  ScanLine,
  HeartPulse,
  Snowflake,
  Package,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Wrench,
  Monitor,
  Shield,
  FlaskConical,
  ClipboardCheck,
  AlertTriangle,
  Thermometer,
  Factory,
  GraduationCap,
  Layers,
  GitBranch,
  Database,
  Microscope,
  ScanLine,
  HeartPulse,
  Snowflake,
  Package,
};

export const getServiceIcon = (iconKey?: string): LucideIcon =>
  iconMap[iconKey || ""] || Wrench;
