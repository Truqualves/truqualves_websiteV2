import mongoose from "mongoose";

const faqItemSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      trim: true,
      required: true,
    },
    answer: {
      type: String,
      trim: true,
      required: true,
    },
  },
  { _id: false },
);

const serviceSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
      unique: true,
      index: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    shortDescription: {
      type: String,
      required: true,
      trim: true,
    },
    heroImage: {
      type: String,
      default: "",
      trim: true,
    },
    iconKey: {
      type: String,
      default: "Wrench",
      trim: true,
    },
    category: [
      {
        type: String,
        trim: true,
      },
    ],
    featured: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
      index: true,
    },
    displayOrder: {
      type: Number,
      default: 0,
      index: true,
    },
    contentBody: {
      overview: { type: String, default: "", trim: true },
      scope: { type: String, default: "", trim: true },
      methodology: { type: String, default: "", trim: true },
      deliverables: [{ type: String, trim: true }],
      faq: [faqItemSchema],
      conclusion: { type: String, default: "", trim: true },
    },
  },
  {
    timestamps: true,
  },
);

serviceSchema.index({ status: 1, featured: -1, displayOrder: 1, createdAt: -1 });

const Service = mongoose.model("Service", serviceSchema);

export default Service;
