import admin from "firebase-admin";
import { createRequire } from "module";
import User from "../model/User.js";

const serviceAccountJson = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;
let serviceAccount;

if (serviceAccountJson) {
  try {
    serviceAccount = JSON.parse(serviceAccountJson);
  } catch (error) {
    console.error("Invalid FIREBASE_SERVICE_ACCOUNT_JSON:", error);
    throw error;
  }
} else {
  const require = createRequire(import.meta.url);
  serviceAccount = require("../firebasekeys.json");
}

// Prevent multiple initializations
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken;

    // Fetch user role and status from MongoDB
    const user = await User.findOne({ firebaseUid: decodedToken.uid });

    if (!user) {
      // If user is not in MongoDB yet (fresh signup), we might still want to allow them
      // to hit the sync endpoint. For other endpoints, this might be an issue.
      // We will handle specific 'user not found' cases in the controllers or
      // allow the request to proceed with just firebase info for now.
      // However, for strict role checks, a user MUST exist.
    } else {
      req.user.role = user.role;
      req.user.status = user.status;
      req.user.mongoId = user._id;
    }

    next();
  } catch (error) {
    console.error("Token verification failed:", error);
    res.status(401).json({ message: "Invalid token." });
  }
};

export const requireRole = (roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res
        .status(403)
        .json({ message: "Access denied. Insufficient permissions." });
    }
    next();
  };
};

export const requireApproval = (req, res, next) => {
  if (!req.user || req.user.status !== "approved") {
    return res
      .status(403)
      .json({ message: "Access denied. Account not approved." });
  }
  next();
};
