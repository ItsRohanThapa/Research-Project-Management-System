let documentModel = require("../models/document.model");

//Get Documents by Supervisor
const getCategoryDocuments = async (req, res) => {
  let id = req.params.staffID;
  documentModel
    .find({ supervisorID: id })
    .then((documents) => {
      res.status(200).json({
        success: true,
        documentList: documents,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ success: false, error: err.message });
    });
};

//Get Documents by groupID
const getCategoryDocumentsGroup = async (req, res) => {
  let id = req.params.groupID;
  documentModel
    .find({ groupID: id })
    .then((documents) => {
      res.status(200).json({
        success: true,
        documentList: documents,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ success: false, error: err.message });
    });
};

//Get all Documents
const getAllDocuments = async (req, res) => {
  documentModel
    .find()
    .then((documents) => {
      res.json({
        success: true,
        documentList: documents,
      });
    })
    .catch((err) => {
      res.json({ error: err.message });
    });
};

module.exports = {
  getCategoryDocuments,
  getCategoryDocumentsGroup,
  getAllDocuments,
};

//Get specific Document
const getDocument = async (req, res) => {
  let userId = req.params.id;
  documentModel
    .findById(userId)
    .then((Document) => {
      res.status(200).json({ success: true, Document });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ success: false, error: err.message });
    });
};

//Update Document
const updateDocument = async (req, res) => {
  documentModel
    .findByIdAndUpdate(req.params.id, {
      $set: req.body,
    })
    .then(() => {
      res.status(200).json({ success: "Document updated" });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .json({ status: "Error with updating Document", error: err.message });
    });
};

module.exports = {
  getCategoryDocuments,
  getCategoryDocumentsGroup,
  getAllDocuments,
  getDocument,
  updateDocument,
};
