import express from "express";
import * as userController from "../controllers/userController.js";

const router = express.Router();

router.post("/", userController.handleUser);
router.get("/", userController.getUsers);
router.get("/data", userController.getUserData);

export default router;
