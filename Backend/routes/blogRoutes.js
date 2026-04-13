import express from "express";
import {
  getAllBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
} from "../controllers/blogController.js";
import upload from "../services/multer.js";

const blogRouter = express.Router();

blogRouter.get("/", getAllBlogs);
blogRouter.get("/:id", getBlogById);
blogRouter.post("/", upload.single("image"), createBlog);
blogRouter.put("/:id", upload.single("image"), updateBlog);
blogRouter.delete("/:id", deleteBlog);

export default blogRouter;
