const User = require("../models/Users.model");
const bcrypt = require("bcryptjs");

//Signup controllers
exports.StaffSignUpController = async (req, res) => {
  const {
    userID,
    userType,
    userSubType,
    firstName,
    lastName,
    topicArea,
    email,
    username,
    password,
    roleID,
  } = req.body;

  try {
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        errorMessage: "Email already exists",
      });
    }

    const newStaff = new User();
    newStaff.userID = userID;
    newStaff.userType = userType;
    newStaff.userSubType = userSubType;
    newStaff.firstName = firstName;
    newStaff.lastName = lastName;
    newStaff.topicArea = topicArea;
    newStaff.email = email;
    newStaff.username = username;
    newStaff.roleID = roleID;
    newStaff.stdID = null;
    newStaff.fullName = null;
    newStaff.NIC = null;
    newStaff.phoneNumber = null;
    newStaff.specialization = null;
    newStaff.panelID = null;

    const salt = await bcrypt.genSalt(10);
    newStaff.password = await bcrypt.hash(password, salt);

    await newStaff.save();

    res.json({
      successMessage: "Registration Success. Please SignIn",
    });
  } catch (err) {
    console.log("StaffSignUpController error:", err);
    res.status(500).json({
      errorMessage: "Server Error",
    });
  }
};

//Retrive the staff details in backend
exports.getStaffInfo = async (req, res) => {
  User.find().exec((err, staff1) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.status(200).json({
      success: true,
      existingStaff: staff1,
    });
  });
};

//Specific Data retrive
exports.getStaffInfoById = async (req, res) => {
  let userId = req.params.id;

  User.findById(userId, (err, staff) => {
    if (err) {
      return res.status(400).json({ success: false, err });
    }
    return res.status(200).json({
      success: true,
      staff,
    });
  });
};

//Delte the data from the backend
exports.deleteStaffController = async (req, res) => {
  User.findByIdAndDelete(req.params.id).exec((err, deleteStaff) => {
    if (err)
      return res.status(400).json({
        message: "Delete unsuccessfull",
        err,
      });

    return res.json({
      message: "Delete Successfull",
      deleteStaff,
    });
  });
};
