import mongoose from "mongoose";

const sectionItemSchema = new mongoose.Schema(
  {
    icon: { type: String, trim: true },
    title: { type: String, trim: true },
    desc: { type: String, trim: true },
  },
  { _id: false },
);

const milestoneSchema = new mongoose.Schema(
  {
    year: { type: String, trim: true },
    label: { type: String, trim: true },
    text: { type: String, trim: true },
  },
  { _id: false },
);

const missionVisionSchema = new mongoose.Schema(
  {
    title: { type: String, trim: true },
    desc: { type: String, trim: true },
    keyPoints: [{ type: String, trim: true }],
    image: { type: String, trim: true },
  },
  { _id: false },
);

const aboutPageSchema = new mongoose.Schema(
  {
    story: {
      title: { type: String, trim: true },
      content: [{ type: String, trim: true }], // Paragraphs
      sinceYear: { type: Number },
      image: { type: String, trim: true },
    },
    howWeWork: {
      title: { type: String, trim: true },
      subtitle: { type: String, trim: true },
      desc: { type: String, trim: true },
      videoLink: { type: String, trim: true },
      videoThumbnail: { type: String, trim: true },
      items: [sectionItemSchema],
    },
    values: [sectionItemSchema],
    mission: missionVisionSchema,
    vision: missionVisionSchema,
    standards: {
      title: { type: String, trim: true },
      subtitle: { type: String, trim: true }, // Section Label
      desc: { type: String, trim: true },
      items: [{ type: String, trim: true }],
    },
    milestones: [milestoneSchema],
  },
  {
    timestamps: true,
  },
);

const AboutPage = mongoose.model("AboutPage", aboutPageSchema);

export default AboutPage;
