const mongoose = require("mongoose");
const StudentSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    stdID: {
      type: String,
      required: true,
    },
    NIC: {
      type: String,
      required: true,
    },
    stdEmail: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: Number,
      required: true,
    },
    specialization: {
      type: String,
      required: true,
    },
    roleID: {
      type: Number,
      default: 0, // 0: student, 1: admin, 2: staff
    },
  },
  { timestamps: true }
);

const Student = mongoose.model("students", StudentSchema);
module.exports = Student;
