import express from "express";
import {
  getAllCaseStudies,
  getCaseStudyById,
  createCaseStudy,
  updateCaseStudy,
  deleteCaseStudy,
} from "../controllers/caseStudyController.js";
import { verifyToken, requireRole } from "../middleware/authMiddleware.js";

const caseStudyRouter = express.Router();

caseStudyRouter.get("/", getAllCaseStudies);
caseStudyRouter.get("/:id", getCaseStudyById);

caseStudyRouter.use(verifyToken, requireRole(["user", "admin", "superadmin"]));

caseStudyRouter.post("/", createCaseStudy);
caseStudyRouter.put("/:id", updateCaseStudy);
caseStudyRouter.delete("/:id", deleteCaseStudy);

export default caseStudyRouter;
