const mongoose = require("mongoose");

const washingMachineSchema = new mongoose.Schema({
  userName: { type: String, required: true }, // User Name who use this machine
  phoneNo: { type: Number, required: true }, // Phone number of the user
  roomNo: { type: Number, required: true }, // Room No of user
  time: {
    //Time booked for machine
    type: Number,
    required: true,
  },
  timeAtAdded: {
    // Time at which the machine is booked for cleaning
    type: Number,
    required: true,
  },
  timeAtDelete: {
    // Time at which the machine is booked for cleaning will be deleted from database
    type: Number,
    required: true,
  },
  
  
});

const WashingMachine = mongoose.model(
  "WashingMachineData",
  washingMachineSchema
);

module.exports = WashingMachine;
