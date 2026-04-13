import mongoose from "mongoose";

const jobCandidateSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    currentLocation: {
      type: String,
      required: true,
      trim: true,
    },
    totalExperience: {
      type: String,
      required: true,
      trim: true,
    },
    currentSalary: {
      type: String,
      required: true,
      trim: true,
    },
    expectedSalary: {
      type: String,
      required: true,
      trim: true,
    },
    roleAppliedFor: {
      type: String,
      required: true,
      trim: true,
    },
    jobOpeningId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "JobOpening",
      default: null,
    },
    currentCompany: {
      type: String,
      trim: true,
    },
    resumeLink: {
      type: String,
      trim: true,
    },
    whyShouldWeHireYou: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ["new_request", "shortlisted", "rejected"],
      default: "new_request",
      index: true,
    },
  },
  {
    timestamps: true,
  },
);

const JobCandidate = mongoose.model("JobCandidate", jobCandidateSchema);

export default JobCandidate;
