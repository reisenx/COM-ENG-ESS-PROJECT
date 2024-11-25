import express from "express";
import * as userController from "../controllers/userController.js";

const router = express.Router();

router.post("/", userController.handleUser);
router.get("/", userController.getUsers);
router.get("/data", userController.getUserData);
router.get("/data", userController.getLeaderboardData); // Add this line

export default router;
