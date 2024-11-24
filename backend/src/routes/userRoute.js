import express from "express";
import * as userController from "../controllers/userController.js";

const router = express.Router();

router.post("/", userController.handleUser);

// Add a route to handle GET requests to /users
router.get("/users", userController.getUsers);

export default router;
