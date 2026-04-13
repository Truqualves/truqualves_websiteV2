import TeamMember from "../model/TeamMember.js";
import imagekit from "../services/imageKit.js";
import fs from "fs";

const cleanupTempFile = (file) => {
  if (!file?.path) return;
  fs.unlink(file.path, (err) => {
    if (err) console.error("Error deleting temp file:", err);
  });
};

export const getAllTeamMembers = async (req, res) => {
  try {
    const teamMembers = await TeamMember.find({}).sort({ createdAt: -1 });
    return res.status(200).json(teamMembers);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getTeamMemberById = async (req, res) => {
  try {
    const teamMember = await TeamMember.findById(req.params.id);

    if (!teamMember) {
      return res.status(404).json({ message: "Team member not found" });
    }

    return res.status(200).json(teamMember);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const createTeamMember = async (req, res) => {
  try {
    const { name, role, desc, image } = req.body;
    let imageUrl = image;

    if (req.file) {
      const file = req.file;
      try {
        const fileStream = fs.createReadStream(file.path);
        const uploadResponse = await imagekit.files.upload({
          file: fileStream,
          fileName: `team_${Date.now()}`,
          folder: "/team",
        });
        imageUrl = uploadResponse.url;
      } catch (uploadError) {
        return res
          .status(500)
          .json({ message: "Image upload failed", error: uploadError.message });
      } finally {
        cleanupTempFile(file);
      }
    }

    const teamMember = await TeamMember.create({
      name,
      role,
      desc,
      image: imageUrl,
    });

    return res.status(201).json(teamMember);
  } catch (error) {
    cleanupTempFile(req.file);
    return res.status(400).json({ message: error.message });
  }
};

export const updateTeamMember = async (req, res) => {
  try {
    const updateData = { ...req.body };

    if (req.file) {
      const file = req.file;
      try {
        const fileStream = fs.createReadStream(file.path);
        const uploadResponse = await imagekit.files.upload({
          file: fileStream,
          fileName: `team_${Date.now()}`,
          folder: "/team",
        });
        updateData.image = uploadResponse.url;
      } catch (uploadError) {
        return res
          .status(500)
          .json({ message: "Image upload failed", error: uploadError.message });
      } finally {
        cleanupTempFile(file);
      }
    }

    const teamMember = await TeamMember.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true },
    );

    if (!teamMember) {
      return res.status(404).json({ message: "Team member not found" });
    }

    return res.status(200).json(teamMember);
  } catch (error) {
    cleanupTempFile(req.file);
    return res.status(400).json({ message: error.message });
  }
};

export const deleteTeamMember = async (req, res) => {
  try {
    const teamMember = await TeamMember.findByIdAndDelete(req.params.id);

    if (!teamMember) {
      return res.status(404).json({ message: "Team member not found" });
    }

    return res.status(200).json({ message: "Team member deleted successfully" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
