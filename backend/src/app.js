import cors from "cors";
import express from "express";

import UserRoute from "./routes/userRoute.js";

const app = express();

// Move body parsers to the top
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS next
app.use(cors());

// Then logging middleware
app.use((req, res, next) => {
  console.log("=== Incoming Request ===");
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  console.log('Headers:', JSON.stringify(req.headers, null, 2));
  console.log('Body:', JSON.stringify(req.body, null, 2));
  console.log("======================");
  next();
});

// Route middleware
app.use("/users", (req, res, next) => {
  console.log("=== Users Route Hit ===");
  console.log("Method:", req.method);
  console.log("Path:", req.path);
  console.log("Body:", JSON.stringify(req.body, null, 2));
  console.log("======================");
  next();
}, UserRoute);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ message: "Internal server error", error: err.message });
});

export default app;
