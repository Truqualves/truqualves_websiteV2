import express from "express";
import {
  subscribeNewsletter,
  unsubscribeNewsletter,
  getNewsletterSubscribers,
  sendNewsletter,
  deleteNewsletterSubscriber,
} from "../controllers/newsletterController.js";
import { verifyToken, requireRole } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/subscribe", subscribeNewsletter);
router.post("/unsubscribe", unsubscribeNewsletter);

router.get(
  "/",
  verifyToken,
  requireRole(["user", "admin", "superadmin"]),
  getNewsletterSubscribers,
);

router.post(
  "/send",
  verifyToken,
  requireRole(["user", "admin", "superadmin"]),
  sendNewsletter,
);
router.delete(
  "/:id",
  verifyToken,
  requireRole(["user", "admin", "superadmin"]),
  deleteNewsletterSubscriber,
);

export default router;
