const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: true,
      trim: true,
    },
    time: {
      type: Date,
      required: true,
      trim: true,
    },
    conclusive: {
      type: Boolean,
      default: false,
    },
    attended: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    type: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "AttendanceType",
    },
  },
  {
    timestamps: true,
  }
);

const Attendance = mongoose.model("Attendance", attendanceSchema);

module.exports = Attendance;
