const express = require("express");
const router = express.Router();
const Destination = require("../models/destination");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images"); // Make sure this folder exists
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: storage,
});

router.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("File has been uploaded");
});

// Create a new destination
router.post("/", async (req, res) => {
  try {
    const destination = new Destination(req.body);
    await destination.save();
    res.status(201).send(destination);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get all destinations
router.get("/", async (req, res) => {
  try {
    const destinations = await Destination.find();
    res.send(destinations);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get a specific destination by ID
router.get("/:id", async (req, res) => {
  try {
    const destination = await Destination.findById(req.params.id);
    if (!destination) {
      return res.status(404).send("Destination not found");
    }
    res.send(destination);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update a destination
router.put("/:id", async (req, res) => {
  try {
    const destination = await Destination.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!destination) {
      return res.status(404).send("Destination not found");
    }
    res.send(destination);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete a destination
router.delete("/:id", async (req, res) => {
  try {
    const destination = await Destination.findByIdAndDelete(req.params.id);
    if (!destination) {
      return res.status(404).send("Destination not found");
    }
    res.send(destination);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;