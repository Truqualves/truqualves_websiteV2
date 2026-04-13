import cors from "cors";

const envOrigins =
  process.env.CORS_ORIGINS?.split(",").map((origin) => origin.trim()).filter(Boolean) || [];

const allowedOrigins = envOrigins;

const corsMiddleware = cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error(`CORS blocked: ${origin}`));
  },
});

export default corsMiddleware;
