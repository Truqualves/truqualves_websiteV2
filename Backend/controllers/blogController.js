import Blog from "../model/blogs.js";
import imagekit from "../services/imageKit.js";
import fs from "fs";

// Get all blog posts
// GET: /api/blogs
export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({}).sort({ createdAt: -1 });
    return res.status(200).json(blogs);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Get single blog post by numeric ID
// GET: /api/blogs/:id
export const getBlogById = async (req, res) => {
  try {
    const { id } = req.params;

    // Find by custom 'id' field, not _id
    const blog = await Blog.findOne({ id: Number(id) });

    if (!blog) {
      return res.status(404).json({ message: "Blog post not found" });
    }

    return res.status(200).json(blog);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// Create a new blog post
// POST: /api/blogs
export const createBlog = async (req, res) => {
  try {
    const {
      id,
      title,
      description,
      author,
      date,
      image,
      category,
      featured,
      contentBody,
    } = req.body;
    let imageUrl = image;

    // Check if an image file was uploaded
    if (req.file) {
      const file = req.file;
      try {
        const fileStream = fs.createReadStream(file.path);
        const uploadResponse = await imagekit.files.upload({
          file: fileStream,
          fileName: `blog_${id}_${Date.now()}`,
          folder: "/blogs",
        });
        imageUrl = uploadResponse.url;
      } catch (uploadError) {
        return res
          .status(500)
          .json({ message: "Image upload failed", error: uploadError.message });
      } finally {
        // Clean up the local file
        fs.unlink(file.path, (err) => {
          if (err) console.error("Error deleting temp file:", err);
        });
      }
    }

    // Basic validation for required fields (imageUrl check strictly depends if image is mandatory)
    // Assuming image URL string can come from body OR be result of upload
    if (!id || !title || !description || !author || !date) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Check for duplicate numeric ID
    const existingBlog = await Blog.findOne({ id });
    if (existingBlog) {
      return res
        .status(400)
        .json({ message: "Blog with this ID already exists" });
    }

    const newBlog = await Blog.create({
      id,
      title,
      description,
      author,
      date,
      image: imageUrl,
      category,
      featured,
      contentBody,
    });

    return res
      .status(201)
      .json({ message: "Blog created successfully", blog: newBlog });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// Update a blog post
// PUT: /api/blogs/:id
export const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Check if an image file was uploaded
    if (req.file) {
      const file = req.file;
      try {
        const fileStream = fs.createReadStream(file.path);
        const uploadResponse = await imagekit.files.upload({
          file: fileStream,
          fileName: `blog_${id}_${Date.now()}`,
          folder: "/blogs",
        });
        updateData.image = uploadResponse.url;
      } catch (uploadError) {
        return res
          .status(500)
          .json({ message: "Image upload failed", error: uploadError.message });
      } finally {
        // Clean up the local file
        fs.unlink(file.path, (err) => {
          if (err) console.error("Error deleting temp file:", err);
        });
      }
    }

    // Prevent updating the immutable id field if needed
    if (updateData.id && Number(updateData.id) !== Number(id)) {
      return res.status(400).json({ message: "Cannot change blog ID" });
    }

    const updatedBlog = await Blog.findOneAndUpdate(
      { id: Number(id) },
      updateData,
      { new: true },
    );

    if (!updatedBlog) {
      return res.status(404).json({ message: "Blog post not found" });
    }

    return res
      .status(200)
      .json({ message: "Blog updated successfully", blog: updatedBlog });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// Delete a blog post
// DELETE: /api/blogs/:id
export const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedBlog = await Blog.findOneAndDelete({ id: Number(id) });

    if (!deletedBlog) {
      return res.status(404).json({ message: "Blog post not found" });
    }

    return res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
