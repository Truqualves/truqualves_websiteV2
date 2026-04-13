import express from "express";
import { syncUser, getCurrentUser } from "../controllers/authController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// Protected routes (require valid Firebase Token)
router.post("/sync", verifyToken, syncUser);
router.get("/me", verifyToken, getCurrentUser);

export default router;
