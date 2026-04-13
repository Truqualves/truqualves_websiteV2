import express from "express";
import { getEvents, updateEventStatus, getEventsSummary, deleteEvent } from "../controllers/eventsController.js";
import { verifyToken, requireRole } from "../middleware/authMiddleware.js";

const router = express.Router();

// All events routes require authentication
router.use(verifyToken);

// Summary for any authenticated user
router.get("/summary", getEventsSummary);

// Admin/Superadmin only
router.use(requireRole(["admin", "superadmin"]));

router.get("/", getEvents);
router.patch("/:id/status", updateEventStatus);
router.delete("/:id", deleteEvent);

export default router;
