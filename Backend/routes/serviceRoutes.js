import express from "express";
import {
  getAllServices,
  getServiceBySlug,
  createService,
  updateService,
  deleteService,
} from "../controllers/serviceController.js";
import upload from "../services/multer.js";
import { verifyToken, requireRole } from "../middleware/authMiddleware.js";

const serviceRouter = express.Router();

// Public read routes
serviceRouter.get("/", getAllServices);
serviceRouter.get("/:slug", getServiceBySlug);

// Protected write routes
serviceRouter.use(verifyToken, requireRole(["user", "admin", "superadmin"]));
serviceRouter.post("/", upload.single("heroImage"), createService);
serviceRouter.put("/:id", upload.single("heroImage"), updateService);
serviceRouter.delete("/:id", deleteService);

export default serviceRouter;
