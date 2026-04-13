import express from "express";
import {
  getJobCandidates,
  createJobCandidate,
  updateJobCandidateStatus,
  deleteJobCandidate,
} from "../controllers/jobCandidateController.js";
import { verifyToken, requireRole } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", createJobCandidate);

router.use(verifyToken, requireRole(["user", "admin", "superadmin"]));

router.get("/", getJobCandidates);
router.patch("/:id/status", updateJobCandidateStatus);
router.delete("/:id", deleteJobCandidate);

export default router;
