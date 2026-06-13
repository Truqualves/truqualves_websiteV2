import AboutPage from "../model/AboutPage.js";
import imagekit from "../services/imageKit.js";
import fs from "fs";

const cleanupTempFile = (file) => {
  if (!file?.path) return;
  fs.unlink(file.path, (err) => {
    if (err) console.error("Error deleting temp file:", err);
  });
};

const uploadToImageKit = async (file, folder) => {
  try {
    const fileStream = fs.createReadStream(file.path);
    const response = await imagekit.files.upload({
      file: fileStream,
      fileName: `about_${folder}_${Date.now()}`,
      folder: `/about/${folder}`,
    });
    return response.url;
  } catch (error) {
    throw new Error(`Upload failed for ${folder}: ${error.message}`);
  } finally {
    cleanupTempFile(file);
  }
};

// GET /api/about-page
export const getAboutPage = async (req, res) => {
  try {
    const content = await AboutPage.findOne({});
    return res.status(200).json(content || {});
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// PUT /api/about-page
export const updateAboutPage = async (req, res) => {
  try {
    const existing = await AboutPage.findOne({});
    
    // In many dashbord implementations, complex nested data is sent as a stringified 'data' field
    // or as individual fields. We'll support both to be safe, but prioritize parsed JSON.
    let payload = req.body;
    if (payload.data && typeof payload.data === "string") {
        try {
            payload = JSON.parse(payload.data);
        } catch (e) {
            console.error("Failed to parse data field:", e);
        }
    }

    // Handle Image Uploads via upload.fields
    if (req.files) {
      if (req.files.storyImage) {
        const url = await uploadToImageKit(req.files.storyImage[0], "story");
        if (!payload.story) payload.story = {};
        payload.story.image = url;
      }
      if (req.files.missionImage) {
        const url = await uploadToImageKit(req.files.missionImage[0], "mission");
        if (!payload.mission) payload.mission = {};
        payload.mission.image = url;
      }
      if (req.files.visionImage) {
        const url = await uploadToImageKit(req.files.visionImage[0], "vision");
        if (!payload.vision) payload.vision = {};
        payload.vision.image = url;
      }
      if (req.files.videoThumbnail) {
        const url = await uploadToImageKit(req.files.videoThumbnail[0], "howWeWork");
        if (!payload.howWeWork) payload.howWeWork = {};
        payload.howWeWork.videoThumbnail = url;
      }
    }

    let aboutPage;
    if (existing) {
      aboutPage = await AboutPage.findByIdAndUpdate(existing._id, payload, {
        new: true,
        runValidators: true,
      });
    } else {
      aboutPage = await AboutPage.create(payload);
    }

    return res.status(200).json({
      message: "About page updated successfully",
      content: aboutPage,
    });
  } catch (error) {
    // Cleanup any files that might not have been cleaned up in uploadToImageKit
    if (req.files) {
        Object.values(req.files).flat().forEach(cleanupTempFile);
    }
    return res.status(500).json({ message: error.message });
  }
};
