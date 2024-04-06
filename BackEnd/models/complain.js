const mongoose = require("mongoose");

const complainSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.ObjectId,
      required: true,
      ref: "Student", // Reference to the Student model
    },
    typeOfComplain: {
      type: String,
      enum: ["Public", "Private"],
      
      default: "Public",
    },
    name: String, // Name of Student
    phoneNo: {
      type: Number,
      // unique: true,
      required: true,
    },
    title: {
      type: String,
      default: "Complaint",
    },
    complainHandler: {
      type: mongoose.Schema.ObjectId,
      ref: "Admin", // Reference to the Admin model
      default:"660e9020117805cb4a95d7cd"
    },
    descriptionOfComplain: {
      type: String,
      unique:true,
      required: true,
    },
    likedBy: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Student", // Reference to the Student model
      },
    ],
    status: {
      type: String,
      default: "Unresolved",
    }, // Complain which is Resolved or Unresolved
  },
  {
    timestamps: true,
  }
);

const ComplainDetail = mongoose.model("ComplainDetail", complainSchema);

module.exports = ComplainDetail;
