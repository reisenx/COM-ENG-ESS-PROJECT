import Leaderboard from "../models/leaderboardModel.js";

// Get all leaderboard entries
export const getAllEntries = async (req, res) => {
  try {
    const entries = await Leaderboard.find();
    res.status(200).json({
      status: "success",
      data: {
        entries,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

// Get a single leaderboard entry by ID
export const getEntryById = async (req, res) => {
  try {
    const entry = await Leaderboard.findById(req.params.id);
    if (!entry) {
      return res.status(404).json({
        status: "fail",
        message: "No entry found with that ID",
      });
    }
    res.status(200).json({
      status: "success",
      data: {
        entry,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

// Create a new leaderboard entry
export const createEntry = async (req, res) => {
  try {
    const newEntry = await Leaderboard.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        entry: newEntry,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

// Update an existing leaderboard entry by ID
export const updateEntry = async (req, res) => {
  try {
    const entry = await Leaderboard.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!entry) {
      return res.status(404).json({
        status: "fail",
        message: "No entry found with that ID",
      });
    }
    res.status(200).json({
      status: "success",
      data: {
        entry,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

// Delete a leaderboard entry by ID
export const deleteEntry = async (req, res) => {
  try {
    const entry = await Leaderboard.findByIdAndDelete(req.params.id);
    if (!entry) {
      return res.status(404).json({
        status: "fail",
        message: "No entry found with that ID",
      });
    }
    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};
