import express from "express";
import {
  getUsers,
  approveUser,
  rejectUser,
  updateUserRole,
  deleteUser,
} from "../controllers/adminController.js";
import { verifyToken, requireRole } from "../middleware/authMiddleware.js";

const router = express.Router();

// Middleware: All admin routes require authentication AND 'superadmin' role
router.use(verifyToken, requireRole(["superadmin"]));

// Routes
router.get("/users", getUsers); // ?status=pending
router.patch("/users/:id/approve", approveUser);
router.patch("/users/:id/reject", rejectUser);
router.delete("/users/:id", deleteUser);

// Only Super Admin can change roles
router.patch("/users/:id/role", requireRole(["superadmin"]), updateUserRole);

export default router;
