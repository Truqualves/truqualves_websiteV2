import mongoose from "mongoose";

const INDUSTRY_ICON_KEYS = [
  "Pill",
  "Stethoscope",
  "Factory",
  "Beaker",
  "Building2",
  "Leaf",
  "FlaskConical",
  "Microscope",
  "HeartPulse",
  "ShieldCheck",
  "Cpu",
  "Database",
  "Dna",
  "TestTube2",
  "Syringe",
  "Hospital",
];

const industrySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    iconKey: {
      type: String,
      required: true,
      trim: true,
      enum: INDUSTRY_ICON_KEYS,
    },
  },
  {
    timestamps: true,
  },
);

const Industry = mongoose.model("Industry", industrySchema);

export default Industry;
