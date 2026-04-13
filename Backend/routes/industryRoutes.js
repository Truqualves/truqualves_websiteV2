import express from "express";
import {
  getIndustries,
  createIndustry,
  updateIndustry,
  deleteIndustry,
} from "../controllers/industryController.js";
import { verifyToken, requireRole } from "../middleware/authMiddleware.js";

const industryRouter = express.Router();

industryRouter.get("/", getIndustries);

industryRouter.use(verifyToken, requireRole(["user", "admin", "superadmin"]));

industryRouter.post("/", createIndustry);
industryRouter.put("/:id", updateIndustry);
industryRouter.delete("/:id", deleteIndustry);

export default industryRouter;
