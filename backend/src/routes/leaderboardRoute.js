import express from "express";
import {
  createEntry,
  deleteEntry,
  getAllEntries,
  getEntryById,
  updateEntry,
} from "../controllers/leaderboardController.js";

const router = express.Router();

// Get all leaderboard entries
router.get("/", getAllEntries);

// Get a single leaderboard entry by ID
router.get("/:id", getEntryById);

// Create a new leaderboard entry
router.post("/", createEntry);

// Update an existing leaderboard entry by ID
router.put("/:id", updateEntry);

// Delete a leaderboard entry by ID
router.delete("/:id", deleteEntry);

export default router;
