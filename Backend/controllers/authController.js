import User from "../model/User.js";
import { sendApprovalRequestEmail } from "../services/emailService.js";

// @desc    Sync user from Firebase to MongoDB
// @route   POST /api/auth/sync
// @access  Private (Firebase Token)
export const syncUser = async (req, res) => {
  try {
    const { uid, email, name, displayName } = req.user; // from verifyToken middleware
    const providedName = req.body?.name;
    const resolvedName = providedName || name || displayName;

    let user = await User.findOne({ firebaseUid: uid });

    if (!user) {
      try {
        // Create new user if not exists
          user = await User.create({
            firebaseUid: uid,
            email: email,
            name: resolvedName,
            role: "user", // Default role
            status: "pending", // Default status
          });
        // Notify superadmin for approval
        try {
          const superadmin = await User.findOne({ role: "superadmin" });
          await sendApprovalRequestEmail(superadmin?.email, user);
        } catch (emailError) {
          console.error("Approval email error:", emailError);
        }

        return res.status(201).json({ success: true, user, isNew: true });
      } catch (error) {
        // Handle duplicate key error (Race condition)
        if (error.code === 11000) {
          user = await User.findOne({ firebaseUid: uid });
          return res.status(200).json({ success: true, user, isNew: false });
        }
        throw error;
      }
    }

    // Update missing name if provided
    if (!user.name && resolvedName) {
      user.name = resolvedName;
      await user.save();
    }

    // Return existing user
    res.status(200).json({ success: true, user, isNew: false });
  } catch (error) {
    console.error("Sync User Error:", error);
    res.status(500).json({ message: "Server Error syncing user" });
  }
};

// @desc    Get current user profile
// @route   GET /api/auth/me
// @access  Private
export const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.mongoId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ success: true, user });
  } catch (error) {
    console.error("Get Me Error:", error);
    res.status(500).json({ message: "Server Error fetching profile" });
  }
};
