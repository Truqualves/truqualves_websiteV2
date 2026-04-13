import mongoose from "mongoose";

const jobOpeningSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      required: true,
      trim: true,
    },
    experience: {
      type: String,
      required: true,
      trim: true,
    },
    skills: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

const JobOpening = mongoose.model("JobOpening", jobOpeningSchema);

export default JobOpening;
