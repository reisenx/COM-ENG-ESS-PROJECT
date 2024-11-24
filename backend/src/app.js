import cors from "cors";
import express from "express";

import LeaderboardRoute from "./routes/leaderboardRoute.js";
import UserRoute from "./routes/userRoute.js";

const app = express();

// body-parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// allow request from other origin (Frontend which is at different port)
app.use(cors());

app.use((req, res, next) => {
  console.log(`Request URL: ${req.url}`);
  next();
});

// use routes
app.use("/users", UserRoute);
app.use("/leaderboard", LeaderboardRoute);

export default app;
