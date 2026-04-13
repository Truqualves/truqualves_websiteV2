import express from "express";
import {
  getContactInfo,
  updateContactInfo,
} from "../controllers/contactInfoController.js";
import { verifyToken, requireRole } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getContactInfo);

router.put(
  "/",
  verifyToken,
  requireRole(["user", "admin", "superadmin"]),
  updateContactInfo,
);

export default router;
