const mongoose = require("mongoose");

const attendanceTypeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
});
const AttendanceType = mongoose.model("Attendance", attendanceTypeSchema);

module.exports = AttendanceType;
