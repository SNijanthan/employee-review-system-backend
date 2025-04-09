const express = require("express");
const { auth } = require("../middleware/auth.middleware");
const { User } = require("../model/User.model");
const { Feedback } = require("../model/Feedback.model");
const feedbackRouter = express.Router();

// Assign a reviewer to give feedback on another employee (Admin only)

feedbackRouter.post(
  "/review/:reviewerId/:reviewedId",
  auth,
  async (req, res) => {
    try {
      const { role, _id } = req.user;

      if (role !== "admin") {
        return res.status(401).json({
          success: false,
          message: "Permission denied!. Once Admin can access",
        });
      }

      const { reviewerId, reviewedId } = req.params;

      const reviewer = await User.findById(reviewerId);
      const reviewed = await User.findById(reviewedId);

      if (!reviewer || !reviewed) {
        return res.status(404).json({
          success: false,
          message: "Admins cannot be assigned or reviewed",
        });
      }

      if (reviewer.role === "admin" || reviewed.role === "admin") {
        return res.status(404).json({
          success: false,
          message: "Incorrect action",
        });
      }

      const existingFeedback = await Feedback.findOne({
        reviewerId,
        reviewedId,
      });
      if (existingFeedback) {
        return res.status(409).json({
          success: false,
          message: "This review assignment already exists.",
        });
      }

      const newFeedback = new Feedback({
        reviewerId,
        reviewedId,
        assignedBy: _id,
      });

      await newFeedback.save();

      res.status(200).json({
        success: true,
        message: `Review assigned to ${reviewer.name}`,
        data: newFeedback,
      });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }
);

module.exports = { feedbackRouter };
