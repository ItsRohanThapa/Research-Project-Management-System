const mongoose = require("mongoose");

const UsersSchema = new mongoose.Schema(
  {
    userID: {
      type: String,
      required: false,
    },
    userType: {
      type: String,
      required: false, // Student, Staff, Admin
    },
    userSubType: {
      type: String,
      required: false, // Student -> learder & normal memeber, Staff -> supervisor, co-supervisor & panel memeber
    },
    firstName: {
      type: String,
      required: false,
    },
    lastName: {
      type: String,
      required: false,
    },
    topicArea: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: false,
    },
    username: {
      type: String,
      required: false,
    },
    password: {
      type: String,
      required: false,
    },
    fullName: {
      type: String,
      required: false,
    },
    stdID: {
      type: String,
      required: false,
    },
    NIC: {
      type: String,
      required: false,
    },
    phoneNumber: {
      type: Number,
      required: false,
    },
    specialization: {
      type: String,
      required: false,
    },
    panelID: {
      type: String,
      required: false,
    },
    roleID: {
      type: Number,
      default: 0, // 0: student, 1: admin, 2: staff
    },
  },
  { timestamps: true }
);

const User = mongoose.model("AllUser", UsersSchema);
module.exports = User;
