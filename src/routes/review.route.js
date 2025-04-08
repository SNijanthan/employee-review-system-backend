const express = require("express");

const { auth } = require("../middleware/auth.middleware");

const reviewRouter = express.Router();

reviewRouter.get("/reviews", auth, async (req, res) => {
  res.status(200).send("Welcome to the Dashboard..!");
});

module.exports = { reviewRouter };
