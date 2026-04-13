import Industry from "../model/Industry.js";

// GET /api/industries
export const getIndustries = async (req, res) => {
  try {
    const industries = await Industry.find({}).sort({ createdAt: -1 });
    return res.status(200).json(industries);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// POST /api/industries
export const createIndustry = async (req, res) => {
  try {
    const { title, description, iconKey } = req.body;

    if (!title || !description || !iconKey) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const industry = await Industry.create({
      title,
      description,
      iconKey,
    });

    return res.status(201).json(industry);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// PUT /api/industries/:id
export const updateIndustry = async (req, res) => {
  try {
    const { title, description, iconKey } = req.body;

    const industry = await Industry.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
        iconKey,
      },
      { new: true, runValidators: true },
    );

    if (!industry) {
      return res.status(404).json({ message: "Industry not found" });
    }

    return res.status(200).json(industry);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// DELETE /api/industries/:id
export const deleteIndustry = async (req, res) => {
  try {
    const industry = await Industry.findByIdAndDelete(req.params.id);

    if (!industry) {
      return res.status(404).json({ message: "Industry not found" });
    }

    return res.status(200).json({ message: "Industry deleted successfully" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
