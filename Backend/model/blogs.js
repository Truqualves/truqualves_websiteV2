import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
      unique: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    category: [
      {
        type: String,
      },
    ],
    featured: {
      type: Boolean,
      default: false,
    },
    contentBody: {
      introduction: { type: String },
      keyTakeaways: [{ type: String }],
      elaborated: { type: String },
      quote: { type: String },
      conclusion: { type: String },
    },
  },
  {
    timestamps: true,
  },
);

const Blog = mongoose.model("Blog", blogSchema);

export default Blog;
