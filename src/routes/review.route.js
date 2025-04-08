const express = require("express");

const { auth } = require("../middleware/auth.middleware");

const reviewRouter = express.Router();

reviewRouter.get("/reviews", auth, async (req, res) => {
  try {
    const user = req.user;

    res.status(200).json({
      success: true,
      role: user.role,
      message:
        user.role === "admin"
          ? "Welcome to Admin Dashboard"
          : "Welcome to Employee Dashboard",
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

module.exports = { reviewRouter };
