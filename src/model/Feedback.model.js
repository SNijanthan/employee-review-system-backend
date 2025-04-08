const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema(
  {
    reviewId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Review",
    },
    givenBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    comment: {
      type: String,
      required: true,
      trim: true,
      minLength: 4,
      maxLength: 100,
    },
  },
  { timestamps: true }
);

const Feedback = mongoose.model("Feedback", feedbackSchema);

module.exports = { Feedback };
