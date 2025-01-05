const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const TaskSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "pending",
      enum: ["pending", "in-progress", "completed"],
    },
  },
  { timeStamp: true }
);

module.exports = mongoose.model("task", TaskSchema);
