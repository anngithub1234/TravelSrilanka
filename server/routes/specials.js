const express = require("express");
const router = express.Router();
const Special = require("../models/special");
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

// Create a new special
router.post("/", async (req, res) => {
  try {
    const special = new Special(req.body);
    await special.save();
    res.status(201).send(special);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get all specials
router.get("/", async (req, res) => {
  try {
    const specials = await Special.find();
    res.send(specials);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get a specific special by ID
router.get("/:id", async (req, res) => {
  try {
    const special = await Special.findById(req.params.id);
    if (!special) {
      return res.status(404).send("Special not found");
    }
    res.send(special);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update a special
router.put("/:id", async (req, res) => {
  try {
    const special = await Special.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!special) {
      return res.status(404).send("Special not found");
    }
    res.send(special);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete a special
router.delete("/:id", async (req, res) => {
  try {
    const special = await Special.findByIdAndDelete(req.params.id);
    if (!special) {
      return res.status(404).send("Special not found");
    }
    res.send(special);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;