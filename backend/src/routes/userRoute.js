import express from "express";
import {
  getLeaderboard,
  loginUser,
  playGame,
  registerUser,
  updateUsername,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/play", playGame);
router.get("/leaderboard", getLeaderboard);
router.put("/update/:id", updateUsername); // New route for updating username

export default router;
