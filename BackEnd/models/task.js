const mongoose = require("mongoose");
//For Mangig tasks
const taskSchema = new mongoose.Schema(
  {
    title: { type: String, default: "Tasks" },
    description: {
      type: String,
      require: true,
    },
    createrId: {
      type: mongoose.Schema.ObjectId,
      required: true,
      ref: "Admin", // Reference to the Admin Model
    },
    reciverId: {
      type: mongoose.Schema.ObjectId,
      required: true,
      ref: "Admin",
    },
    status: {
      type: String,
      default: "Pending",
    },
    deadline: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const TaskDetail = mongoose.model("TaskDetail", taskSchema);

module.exports = TaskDetail;
