import CaseStudy from "../model/CaseStudy.js";

export const getAllCaseStudies = async (req, res) => {
  try {
    const caseStudies = await CaseStudy.find({}).sort({ createdAt: -1 });
    return res.status(200).json(caseStudies);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getCaseStudyById = async (req, res) => {
  try {
    const caseStudy = await CaseStudy.findById(req.params.id);

    if (!caseStudy) {
      return res.status(404).json({ message: "Case study not found" });
    }

    return res.status(200).json(caseStudy);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const createCaseStudy = async (req, res) => {
  try {
    const { tag, industry, title, challenge, approach, result } = req.body;

    const caseStudy = await CaseStudy.create({
      tag,
      industry,
      title,
      challenge,
      approach,
      result,
    });

    return res.status(201).json(caseStudy);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const updateCaseStudy = async (req, res) => {
  try {
    const { tag, industry, title, challenge, approach, result } = req.body;

    const caseStudy = await CaseStudy.findByIdAndUpdate(
      req.params.id,
      {
        tag,
        industry,
        title,
        challenge,
        approach,
        result,
      },
      { new: true, runValidators: true },
    );

    if (!caseStudy) {
      return res.status(404).json({ message: "Case study not found" });
    }

    return res.status(200).json(caseStudy);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const deleteCaseStudy = async (req, res) => {
  try {
    const caseStudy = await CaseStudy.findByIdAndDelete(req.params.id);

    if (!caseStudy) {
      return res.status(404).json({ message: "Case study not found" });
    }

    return res.status(200).json({ message: "Case study deleted successfully" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
