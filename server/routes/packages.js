const express = require("express");
const router = express.Router();
const Package = require("../models/package");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images"); // Make sure this folder exists
  },
  filename: function (req, file, cb) {
    cb(null,  (file.originalname)); // Appending extension
  },
});

const upload = multer({
  storage: storage,
});

router.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("File has been uploaded");
});

// Create a new package
router.post("/", async (req, res) => {
  try {
    const package = new Package(req.body);
    await package.save();
    res.status(201).send(package);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get all packages
router.get("/", async (req, res) => {
  try {
    const packages = await Package.find();
    res.send(packages);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get a specific package by ID
router.get("/:id", async (req, res) => {
  try {
    const package = await Package.findById(req.params.id);
    if (!package) {
      return res.status(404).send("Package not found");
    }
    res.send(package);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update a package
router.put("/:id", async (req, res) => {
  try {
    const package = await Package.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!package) {
      return res.status(404).send("Package not found");
    }
    res.send(package);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete a package
router.delete("/:id", async (req, res) => {
  try {
    const package = await Package.findByIdAndDelete(req.params.id);
    if (!package) {
      return res.status(404).send("Package not found");
    }
    res.send(package);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
