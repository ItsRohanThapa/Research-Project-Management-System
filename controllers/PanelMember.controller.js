let PanelMembers = require("../models/panelMember.model");

//Save PanelMember Details
const createPanelMember = async (req, res) => {
  const newPanelMembers = new PanelMembers(req.body);

  newPanelMembers.save((err) => {
    console.log(newPanelMembers._id);
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.status(200).json({
      success: " Saved successfully",
      data: newPanelMembers._id,
    });
  });
};

//Get All PanelMember Details
const getAllPanelMembers = async (req, res) => {
  PanelMembers.find()
    .then((PanelMembers) => {
      res.json({
        success: true,
        PanelMembersList: PanelMembers,
      });
    })
    .catch((err) => {
      res.json({ error: err.message });
    });
};

//Get specific PanelMember Details
const getPanelMember = async (req, res) => {
  let userId = req.params.id;
  PanelMembers.findById(userId)
    .then((PanelMember) => {
      res.status(200).json({ success: true, PanelMember });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ success: false, error: err.message });
    });
};

//Update PanelMember Details
const updatePanelMember = async (req, res) => {
  PanelMembers.findByIdAndUpdate(req.params.id, {
    $set: req.body,
  })
    .then(() => {
      res.status(200).json({ success: "PanelMember Details are updated" });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .json({ status: "Error with updating data", error: err.message });
    });
};

//Delete PanelMember Details
const deletePanelMember = async (req, res) => {
  PanelMembers.findByIdAndDelete(req.params.id)
    .then(() => {
      res.status(200).json({ status: "PanelMembers Deleted Succesfully" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        status: "Error with deleting PanelMember",
        error: err.message,
      });
    });
};

module.exports = {
  createPanelMember,
  getAllPanelMembers,
  getPanelMember,
  updatePanelMember,
  deletePanelMember,
};
