import mongoose from "mongoose";

const caseStudySchema = new mongoose.Schema(
  {
    tag: {
      type: String,
      required: true,
      trim: true,
    },
    industry: {
      type: String,
      required: true,
      trim: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    challenge: {
      type: String,
      required: true,
      trim: true,
    },
    approach: {
      type: String,
      required: true,
      trim: true,
    },
    result: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

const CaseStudy = mongoose.model("CaseStudy", caseStudySchema);

export default CaseStudy;
