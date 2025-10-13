let userModel = require("../models/regUser.model");

//New User
const createUser = async (req, res) => {
  const newUser = new userModel(req.body);

  newUser
    .save()
    .then(() => {
      res.status(200).json({ success: "User added" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ success: false, error: err.message });
    });
};

//Get all Users
const getAllUsers = async (req, res) => {
  userModel
    .find()
    .then((users) => {
      res.json({
        success: true,
        userList: users,
      });
    })
    .catch((err) => {
      res.json({ error: err.message });
    });
};

//Get specific User
const getUser = async (req, res) => {
  let userId = req.params.userID;
  userModel
    .find({ userID: userId })
    .then((user) => {
      res.status(200).json({ success: true, user });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ success: false, error: err.message });
    });
};

//Delete User
const deleteUser = async (req, res) => {
  userModel
    .findByIdAndDelete(req.params.id)
    .then(() => {
      res.status(200).json({ status: "User deleted" });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .json({ status: "Error with deleting User", error: err.message });
    });
};

module.exports = {
  createUser,
  getAllUsers,
  getUser,
  deleteUser,
};
