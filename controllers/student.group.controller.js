const Group = require("../models/student.groups.model");

//Create student group
exports.createStudentGroup = async (req, res) => {
  const newGroup = new Group(req.body);

  newGroup.save((err) => {
    console.log(newGroup._id);
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.status(200).json({
      success: " Student group successfully created",
      data: newGroup._id,
    });
  });
};

//Get all student groups
exports.getAllStudentGroups = async (req, res) => {
  Group.find().exec((err, user) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.status(200).json({
      success: true,
      studentGroups: user,
    });
  });
};
