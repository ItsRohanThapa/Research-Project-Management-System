let panel = require("../models/panel.model");

//Save panel Details
const createPanel = async (req, res) => {
  let newPanel = new panel(req.body);

  newPanel.save((err) => {
    console.log(newPanel._id);
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.status(200).json({
      success: " Saved successfully",
      data: newPanel._id,
    });
  });
};

//Get All panel Details
const getAllPanel = async (req, res) => {
  panel
    .find()
    .then((panels) => {
      res.json({
        success: true,
        PanelList: panels,
      });
    })
    .catch((err) => {
      res.json({ error: err.message });
    });
};

//Get specific panel Details
const getPanel = async (req, res) => {
  let userId = req.params.id;
  panel
    .findById(userId)
    .then((panel) => {
      res.status(200).json({ success: true, panel });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ success: false, error: err.message });
    });
};

//Update Panel Details
const updatePanel = async (req, res) => {
  panel
    .findByIdAndUpdate(req.params.id, {
      $set: req.body,
    })
    .then(() => {
      res.status(200).json({ success: "Panel Details are updated" });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .json({ status: "Error with updating data", error: err.message });
    });
};

//Delete Panel Details
const deletePanel = async (req, res) => {
  panel
    .findByIdAndDelete(req.params.id)
    .then(() => {
      res.status(200).json({ status: "Panel Detail Deleted Succesfully" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        status: "Error with deleting Panel Record",
        error: err.message,
      });
    });
};

module.exports = {
  createPanel,
  getAllPanel,
  getPanel,
  updatePanel,
  deletePanel,
};
