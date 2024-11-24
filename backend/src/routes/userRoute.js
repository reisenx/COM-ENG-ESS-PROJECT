import express from "express";
import * as userController from "../controllers/userController.js";

const router = express.Router();

router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);
router.post("/play", userController.playGame);
router.get("/leaderboard", userController.getLeaderboard);

export default router;
