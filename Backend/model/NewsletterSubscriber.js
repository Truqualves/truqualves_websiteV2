import mongoose from "mongoose";
import crypto from "crypto";

const newsletterSubscriberSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
      index: true,
    },
    status: {
      type: String,
      enum: ["subscribed", "unsubscribed"],
      default: "subscribed",
      index: true,
    },
    unsubscribeToken: {
      type: String,
      required: true,
      unique: true,
      index: true,
      default: () => crypto.randomBytes(24).toString("hex"),
    },
  },
  {
    timestamps: true,
  },
);

const NewsletterSubscriber = mongoose.model(
  "NewsletterSubscriber",
  newsletterSubscriberSchema,
);

export default NewsletterSubscriber;
