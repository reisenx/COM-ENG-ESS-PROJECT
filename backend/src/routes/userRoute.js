import express from "express";
import * as userController from "../controllers/userController.js";

const router = express.Router();

router.post("/", userController.registerUser);
router.post("/", userController.loginUser);
router.post("/", userController.playGame);
router.get("/", userController.getLeaderboard);

export default router;
