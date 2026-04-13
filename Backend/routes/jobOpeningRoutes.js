import express from "express";
import {
  getJobOpenings,
  createJobOpening,
  updateJobOpening,
  deleteJobOpening,
} from "../controllers/jobOpeningController.js";
import { verifyToken, requireRole } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getJobOpenings);

router.use(verifyToken, requireRole(["user", "admin", "superadmin"]));

router.post("/", createJobOpening);
router.put("/:id", updateJobOpening);
router.delete("/:id", deleteJobOpening);

export default router;
