import express from "express";
import {
  getAllTeamMembers,
  getTeamMemberById,
  createTeamMember,
  updateTeamMember,
  deleteTeamMember,
} from "../controllers/teamMemberController.js";
import upload from "../services/multer.js";
import { verifyToken, requireRole } from "../middleware/authMiddleware.js";

const teamMemberRouter = express.Router();

teamMemberRouter.get("/", getAllTeamMembers);
teamMemberRouter.get("/:id", getTeamMemberById);

teamMemberRouter.use(verifyToken, requireRole(["user", "admin", "superadmin"]));

teamMemberRouter.post("/", upload.single("image"), createTeamMember);
teamMemberRouter.put("/:id", upload.single("image"), updateTeamMember);
teamMemberRouter.delete("/:id", deleteTeamMember);

export default teamMemberRouter;
