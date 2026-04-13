import JobOpening from "../model/JobOpening.js";

export const getJobOpenings = async (req, res) => {
  try {
    const jobOpenings = await JobOpening.find({}).sort({ createdAt: -1 });
    return res.status(200).json(jobOpenings);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createJobOpening = async (req, res) => {
  try {
    const { title, location, type, experience, skills } = req.body;

    if (!title || !location || !type || !experience || !skills) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const jobOpening = await JobOpening.create({
      title,
      location,
      type,
      experience,
      skills,
    });

    return res.status(201).json(jobOpening);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const updateJobOpening = async (req, res) => {
  try {
    const { title, location, type, experience, skills } = req.body;

    const jobOpening = await JobOpening.findByIdAndUpdate(
      req.params.id,
      {
        title,
        location,
        type,
        experience,
        skills,
      },
      { new: true, runValidators: true },
    );

    if (!jobOpening) {
      return res.status(404).json({ message: "Job opening not found" });
    }

    return res.status(200).json(jobOpening);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const deleteJobOpening = async (req, res) => {
  try {
    const jobOpening = await JobOpening.findByIdAndDelete(req.params.id);

    if (!jobOpening) {
      return res.status(404).json({ message: "Job opening not found" });
    }

    return res.status(200).json({ message: "Job opening deleted successfully" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
