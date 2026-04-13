import mongoose from "mongoose";
import JobCandidate from "../model/JobCandidate.js";

const VALID_STATUSES = ["new_request", "shortlisted", "rejected"];

// GET /api/job-candidates
export const getJobCandidates = async (req, res) => {
  try {
    const { status } = req.query;
    const query = status && VALID_STATUSES.includes(status) ? { status } : {};

    const candidates = await JobCandidate.find(query)
      .populate("jobOpeningId", "title")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: candidates.length,
      candidates,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// POST /api/job-candidates
export const createJobCandidate = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      currentLocation,
      totalExperience,
      currentSalary,
      expectedSalary,
      roleAppliedFor,
      jobOpeningId,
      currentCompany,
      resumeLink,
      whyShouldWeHireYou,
    } = req.body;

    if (
      !firstName ||
      !lastName ||
      !email ||
      !phone ||
      !currentLocation ||
      !totalExperience ||
      !currentSalary ||
      !expectedSalary ||
      !roleAppliedFor
    ) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const payload = {
      firstName,
      lastName,
      email,
      phone,
      currentLocation,
      totalExperience,
      currentSalary,
      expectedSalary,
      roleAppliedFor,
      currentCompany,
      resumeLink,
      whyShouldWeHireYou,
    };

    if (jobOpeningId && mongoose.Types.ObjectId.isValid(jobOpeningId)) {
      payload.jobOpeningId = jobOpeningId;
    }

    const candidate = await JobCandidate.create(payload);
    return res.status(201).json({ success: true, candidate });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// PATCH /api/job-candidates/:id/status
export const updateJobCandidateStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ message: "Status is required" });
    }

    if (!VALID_STATUSES.includes(status)) {
      return res.status(400).json({ message: "Invalid status specified" });
    }

    const candidate = await JobCandidate.findById(req.params.id);

    if (!candidate) {
      return res.status(404).json({ message: "Candidate not found" });
    }

    if (candidate.status === status) {
      return res.status(400).json({ message: "Status is already set" });
    }

    candidate.status = status;
    await candidate.save();

    return res.status(200).json({
      success: true,
      message: "Candidate status updated",
      candidate,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// DELETE /api/job-candidates/:id
export const deleteJobCandidate = async (req, res) => {
  try {
    const candidate = await JobCandidate.findByIdAndDelete(req.params.id);

    if (!candidate) {
      return res.status(404).json({ message: "Candidate not found" });
    }

    return res.status(200).json({ success: true, message: "Candidate deleted" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
