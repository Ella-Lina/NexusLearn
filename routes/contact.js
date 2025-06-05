const express = require("express");
const contactController = require("../controllers/contactController");

const router = express.Router();

router.get("/", contactController.get);

router.post("/", contactController.post);

module.exports = router;
