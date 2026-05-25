import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import generateRoutes from "./routes/generateRoutes.js";
import { errorHandler } from "./middleware/errorMiddleware.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Set up CORS configurations
const allowedOrigins = [
  "http://localhost:3000",
  "https://ai-test-case-generation-agent.vercel.app"
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1 || process.env.NODE_ENV !== "production") {
      return callback(null, true);
    } else {
      return callback(new Error("CORS policy violation"), false);
    }
  },
  credentials: true
}));

app.use(express.json());

// Main Router
app.use("/api", generateRoutes);

// Root route handler for browser testing
app.get("/", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "TestGen AI Backend API is running successfully.",
    endpoints: {
      health: "/health",
      generate: "/api/generate (POST)"
    }
  });
});

// Catch-all health check route
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", timestamp: new Date().toISOString() });
});

// Error handling middleware
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`[Server] Running on port ${PORT} with CORS enabled for ${corsOrigin}`);
});

export default app;
