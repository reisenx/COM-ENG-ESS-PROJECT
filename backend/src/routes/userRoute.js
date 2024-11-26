import express from "express";
import * as userController from "../controllers/userController.js";

const router = express.Router();

// Add debugging middleware
router.use((req, res, next) => {
  console.log("=== Route Debug ===");
  console.log("URL:", req.url);
  console.log("Method:", req.method);
  console.log("Body:", req.body);
  console.log("=================");
  next();
});

router.post("/", userController.handleUser);
router.get("/", userController.getUsers);

export default router;

