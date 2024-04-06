const mongoose = require("mongoose");

const busSchema = new mongoose.Schema(
  {
    name: String, // Name of Bus User
    phoneNo: {
      type: Number,
      // unique: true,
      required: true,
    },
    seatNo: {
      type: Number,
      unique: true,
    },
    userId: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const BusDetail = mongoose.model("BusDetail", busSchema);

module.exports = BusDetail;
