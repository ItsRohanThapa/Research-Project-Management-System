const EvDocument = require("../models/EvaluationDocument.model");

//Evaluation Document create controller
exports.createEvDocumentController = async (req, res) => {
  const {
    groupID,
    supervisorName,
    evDocument,
    documentMarks,
  } = req.body;

  try {
    const newEvDocument = new EvDocument();
    newEvDocument.groupID = groupID;
    newEvDocument.supervisorName = supervisorName;
    newEvDocument.evDocument = evDocument;
    newEvDocument.documentMarks = documentMarks;

    await newEvDocument.save();

    res.json({
      successMessage: "Evaluation document marked successfully",
    });
  } catch (err) {
    console.log("createEvDocumentController error:", err);
    res.status(500).json({
      errorMessage: "Server Error",
    });
  }
};

//Retrive all the Evaluation Document in backend
exports.getEvDocumentInfo = async (req, res) => {
    EvDocument.find().exec((err, evDoc1) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.status(200).json({
      success: true,
      existingStaff: evDoc1,
    });
  });
};

//Specific Data retrive Evaluation Document
exports.getEvDocumentById = async (req, res) => {
  let userId = req.params.id;

  EvDocument.findById(userId, (err, evDoc) => {
    if (err) {
      return res.status(400).json({ success: false, err });
    }
    return res.status(200).json({
      success: true,
      evDoc,
    });
  });
};

//Update Evaluation Document

exports.updateEvDocument = async (req, res) => {

    EvDocument.findByIdAndUpdate(req.params.id, {
      $set: req.body,
    })
      .then(() => {
        res.status(200).json({ success: "Evaluation document details are updated" });
    })
      .catch((err) => {
        console.log(err);
        res
          .status(500)
          .json({ status: "Error with updating data", error: err.message });  
      });  
  };



//Delete the Evaluation Document from the backend
exports.deleteEvDocumentController = async (req, res) => {
    EvDocument.findByIdAndDelete(req.params.id).exec((err, deleteevDoc) => {
      if (err)
        return res.status(400).json({
          message: "Delete Unsuccessfull",
          err,
        });
  
      return res.json({
        message: "Delete Successfull",
        deleteevDoc,
      });
    });
};