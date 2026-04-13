import mongoose from "mongoose";

const contactInfoSchema = new mongoose.Schema(
  {
    officeAddress: {
      type: String,
      trim: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
    },
    businessHours: {
      type: String,
      trim: true,
    },
    consultationText: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

const ContactInfo = mongoose.model("ContactInfo", contactInfoSchema);

export default ContactInfo;
