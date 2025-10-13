const express = require("express");
const bodyParser = require("body-parser");
const User = require("../models/Users.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

require("dotenv").config();

const app = express();
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

exports.signupController = async (req, res) => {
  console.log("REQ BODY", req.body);
  const {
    fullName,
    stdID,
    NIC,
    email,
    userType,
    password,
    phoneNumber,
    specialization,
    roleID,
  } = req.body;

  try {
    const user = await User.findOne({ email: email });
    console.log(user);
    if (user) {
      return res.status(400).json({
        errorMessage: "Email already exists",
      });
    }

    const newStudent = new User();

    newStudent.email = email;
    newStudent.roleID = roleID;
    newStudent.stdID = stdID;
    newStudent.fullName = fullName;
    newStudent.NIC = NIC;
    newStudent.phoneNumber = phoneNumber;
    newStudent.specialization = specialization;
    newStudent.userID = null;
    newStudent.userType = userType;
    newStudent.userSubType = null;
    newStudent.firstName = null;
    newStudent.lastName = null;
    newStudent.topicArea = null;
    newStudent.username = null;
    newStudent.panelID = null;

    const salt = await bcrypt.genSalt(10);
    newStudent.password = await bcrypt.hash(password, salt);

    await newStudent.save();

    res.json({
      successMessage: "Registration Success. Please Sign-In",
    });
  } catch (err) {
    console.log("signupController error:", err);
    res.status(500).json({
      errorMessage: "Server Error",
    });
  }
};

exports.signinController = async (req, res) => {
  console.log(req.body);
  try {
    // Get user input
    const { email, password } = req.body;

    // Validate user input
    if (!(email && password)) {
      res.status(400).send("All input is required");
    }
    // Validate if user exist in our database
    const user = await User.findOne({ email: email });

    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );
      // save user token
      user.token = token;
      // user
      res.status(200).json(user);
    }
    res.status(400).send({ message: "Invalid Credentials" });
  } catch (err) {
    console.log(err);
  }
};

//Retrive the user details in backend
exports.getAllUsers = async (req, res) => {
  User.find().exec((err, user) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.status(200).json({
      success: true,
      existingUser: user,
    });
  });
};

//Specific Data retrive
exports.getUserInfoById = async (req, res) => {
  let userId = req.params.id;

  User.findById(userId, (err, user) => {
    if (err) {
      return res.status(400).json({ isSuccess: false, err });
    }
    return res.status(200).json({
      success: true,
      user,
    });
  });
};
