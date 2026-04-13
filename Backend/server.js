import "dotenv/config";
import express from "express";
import contactRoutes from "./routes/contactRoutes.js";
import contactInfoRoutes from "./routes/contactInfoRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";
import serviceRoutes from "./routes/serviceRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import eventsRoutes from "./routes/eventsRoutes.js";
import caseStudyRoutes from "./routes/caseStudyRoutes.js";
import teamMemberRoutes from "./routes/teamMemberRoutes.js";
import jobOpeningRoutes from "./routes/jobOpeningRoutes.js";
import jobCandidateRoutes from "./routes/jobCandidateRoutes.js";
import newsletterRoutes from "./routes/newsletterRoutes.js";
import industryRoutes from "./routes/industryRoutes.js";
import connectDB from "./services/mongodbService.js";
import corsMiddleware from "./middleware/corsMiddleware.js";

const app = express();
const port = process.env.PORT || 5000;

// Connect to MongoDB
await connectDB();

// Middleware
app.use(corsMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get("/", (req, res) => {
  res.send("Welcome to Truqualves Backend");
});

app.use("/api/contact", contactRoutes);
app.use("/api/contact-info", contactInfoRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/events", eventsRoutes);
app.use("/api/case-studies", caseStudyRoutes);
app.use("/api/team", teamMemberRoutes);
app.use("/api/job-openings", jobOpeningRoutes);
app.use("/api/job-candidates", jobCandidateRoutes);
app.use("/api/newsletter", newsletterRoutes);
app.use("/api/industries", industryRoutes);

// Start server
app.listen(port, () => {
  console.log(`✅ Server is running on http://localhost:${port}`);
});
