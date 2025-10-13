const AcTopic = require("../models/acceptTopic.model");

//Topic accept create controller
exports.createActTopicController = async (req, res) => {
  const {
    groupID,
    supervisorName,
    researchTopic,
    coSupervisorName,
    status,
    remarks
  } = req.body;

  try {
    const newTopic = new AcTopic();
    newTopic.groupID = groupID;
    newTopic.supervisorName = supervisorName;
    newTopic.researchTopic = researchTopic;
    newTopic.coSupervisorName = coSupervisorName;
    newTopic.status = status;
    newTopic.remarks = remarks;

    await newTopic.save();

    res.json({
      successMessage: "Topic Accepted Successfully",
    });
  } catch (err) {
    console.log("createActTopicController error:", err);
    res.status(500).json({
      errorMessage: "Server Error",
    });
  }
};

//Retrive all the accepted topic details in backend
exports.getActTopicInfo = async (req, res) => {
    AcTopic.find().exec((err, actTopic1) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.status(200).json({
      success: true,
      existingStaff: actTopic1,
    });
  });
};

//Specific Data retrive
exports.getActTopicInfoById = async (req, res) => {
  let userId = req.params.id;

  AcTopic.findById(userId, (err, actTopic) => {
    if (err) {
      return res.status(400).json({ success: false, err });
    }
    return res.status(200).json({
      success: true,
      actTopic,
    });
  });
};

//Update Accept Topic Details

exports.updateActTopic = async (req, res) => {

    AcTopic.findByIdAndUpdate(req.params.id, {
      $set: req.body,
    })
      .then(() => {
        res.status(200).json({ success: "Accept topic Details are updated" });
    })
      .catch((err) => {
        console.log(err);
        res
          .status(500)
          .json({ status: "Error with updating data", error: err.message });  
      });  
  };



//Delete the data from the backend
exports.deleteActTopicController = async (req, res) => {
    AcTopic.findByIdAndDelete(req.params.id).exec((err, deleteActTopic) => {
      if (err)
        return res.status(400).json({
          message: "Delete Unsuccessfull",
          err,
        });
  
      return res.json({
        message: "Delete Successfull",
        deleteActTopic,
      });
    });
};