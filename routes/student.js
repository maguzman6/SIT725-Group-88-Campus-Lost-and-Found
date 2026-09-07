const express = require("express");
const router = express.Router();
const studentController = require("../controllers/studentController");

// GET /api/student
router.get("/", studentController.getStudent);

module.exports = router;
