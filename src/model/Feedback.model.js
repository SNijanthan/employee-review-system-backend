const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema(
  {
    reviewerId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    reviewedId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    assignedBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    comments: {
      type: String,
      default: "",
      maxLength: 300,
    },
  },
  { timestamps: true }
);

const Feedback = mongoose.model("Feedback", feedbackSchema);

module.exports = { Feedback };
