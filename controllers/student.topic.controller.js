const supervisorRequest = require("../models/research.topic.model");
const Group = require("../models/student.groups.model");

//Create supervisor request with related group & topic
exports.requestSupervisor = async (req, res) => {
  const { groupID, supervisorID, topic } = req.body;

  const reqSupervisor = new supervisorRequest();
  reqSupervisor.groupID = groupID;
  reqSupervisor.supervisorID = supervisorID;
  reqSupervisor.topic = topic;

  await reqSupervisor.save((err) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.status(200).json({
      success: true,
      data: reqSupervisor.groupID, //return the topic id
    });
  });
};

//view all supervisor request with related group & topic 
exports.ViewAllTopics = async (req, res) => {
  const id = req.query.id;
  supervisorRequest.find({supervisorID: id}).exec((err, accept) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.status(200).json({
      success: true,
      statsTopics: accept,
    });
  });
};
exports.ViewAllTopicsByAdmin = async (req, res) => {
  supervisorRequest.find().exec((err, accept) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.status(200).json({
      success: true,
      statsTopics: accept,
    });
  });
};


//Update Topic status
exports.UpdateTopic = async (req, res) => {
  supervisorRequest
    .findByIdAndUpdate(req.params.id, {
      $set: req.body,
    })
    .then(() => {
      res.status(200).json({ success: "Topics are updated successfully" });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .json({ status: "Error with updating data", error: err.message });
    });
};


