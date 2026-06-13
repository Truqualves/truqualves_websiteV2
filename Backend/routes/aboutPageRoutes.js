import express from "express";
import { getAboutPage, updateAboutPage } from "../controllers/aboutPageController.js";
import { verifyToken, requireRole } from "../middleware/authMiddleware.js";
import upload from "../services/multer.js";

const router = express.Router();

// GET /api/about-page - Public access to read content
router.get("/", getAboutPage);

// PUT /api/about-page - Protected access to update content and images
router.put(
  "/",
  verifyToken,
  requireRole(["admin", "superadmin"]),
  upload.fields([
    { name: "storyImage", maxCount: 1 },
    { name: "missionImage", maxCount: 1 },
    { name: "visionImage", maxCount: 1 },
    { name: "videoThumbnail", maxCount: 1 },
  ]),
  updateAboutPage,
);

export default router;
