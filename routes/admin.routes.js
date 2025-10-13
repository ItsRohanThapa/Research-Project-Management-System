const router = require("express").Router();
require("dotenv").config();

const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");

const s3 = new aws.S3({
  accessKeyId: process.env.S3_ACCESS_KEY,
  secretAccessKey: process.env.S3_SECRET_KEY,
  region: process.env.BUCKET_REIGEN,
});

const multerMemoryStorage = multer.memoryStorage();
const multerUploadInMemory = multer({
  storage: multerMemoryStorage,
});

let doccontroller = require("../Controllers/document.controller");
let noticontroller = require("../Controllers/notice.controller");
let regcontroller = require("../Controllers/regUser.controller");
let prescontroller = require("../Controllers/presentation.controller");

let noticeModel = require("../models/notice.model");
let documentModel = require("../models/document.model");
let presentationModel = require("../models/presentation.model");

//Document Routes
router.post(
  "/documents/add",
  multerUploadInMemory.single("file"),
  async (req, res) => {
    console.log(req.body);
    console.log(req.file);

    const uploadResult = await s3
      .upload({
        Bucket: "PROJEXPERT-bucket",
        Key: req.file.originalname,
        Body: req.file.buffer,
      })
      .promise();

    console.log(`Upload Successful!`);
    console.log(uploadResult.Location);

    var newDocObj = {
      documentDescription: req.body.documentDescription,
      supervisorID: req.body.supervisorID,
      groupID: req.body.groupID,
      docURL: uploadResult.Location,
    };

    const newDocument = new documentModel(newDocObj);
    newDocument
      .save()
      .then(() => {
        res.status(200).json({ success: "Document added" });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send({ success: false, error: err.message });
      });
  }
);
router.get(
  "/documents/viewBySupervisor/:staffID",
  doccontroller.getCategoryDocuments
);
router.get(
  "/documents/viewByGroup/:groupID",
  doccontroller.getCategoryDocumentsGroup
);
router.get("/documents/view", doccontroller.getAllDocuments);
router.get("/documents/view/:id", doccontroller.getDocument);
router.put("/documents/update/:id", doccontroller.updateDocument);

//presentations Routes
router.post(
  "/presentations/add",
  multerUploadInMemory.single("file"),
  async (req, res) => {
    console.log(req.body);
    console.log(req.file);

    const uploadResult = await s3
      .upload({
        Bucket: "PROJEXPERT-bucket",
        Key: req.file.originalname,
        Body: req.file.buffer,
      })
      .promise();

    console.log(`Upload Successful!`);
    console.log(uploadResult.Location);

    var newPresObj = {
      presentationType: req.body.presentationType,
      panelID: req.body.panelID,
      groupID: req.body.groupID,
      docURL: uploadResult.Location,
    };

    const newPresentation = new presentationModel(newPresObj);
    newPresentation
      .save()
      .then(() => {
        res.status(200).json({ success: "Presentation added" });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send({ success: false, error: err.message });
      });
  }
);
router.get(
  "/presentations/viewByPanel/:panelID",
  prescontroller.getCategoryPresentations
);
router.get(
  "/presentations/viewByGroup/:groupID",
  prescontroller.getCategoryPresentationsGroup
);
router.get("/presentations/view", prescontroller.getAllPresentations);
router.get("/presentations/view/:id", prescontroller.getPresentation);
router.put("/presentations/update/:id", prescontroller.updatePresentation);

//notice Routes
router.post(
  "/notices/add",
  multerUploadInMemory.single("file"),
  async (req, res) => {
    console.log(req.body);
    console.log(req.file);

    const uploadResult = await s3
      .upload({
        Bucket: "PROJEXPERT-bucket",
        Key: req.file.originalname,
        Body: req.file.buffer,
      })
      .promise();

    console.log(`Upload Successful!`);
    console.log(uploadResult.Location);

    var newNoticeObj = {
      noticeHeader: req.body.noticeHeader,
      roleID: req.body.roleID,
      noticeCategory: req.body.noticeCategory,
      description: req.body.description,
      docURL: uploadResult.Location,
    };

    const newNotice = new noticeModel(newNoticeObj);
    newNotice
      .save()
      .then(() => {
        res.status(200).json({ success: "Notice added" });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send({ success: false, error: err.message });
      });
  }
);
router.get("/notices/viewByRole/:roleID", noticontroller.getCategoryNotices);
router.get("/notices/view/", noticontroller.getAllNotices);
router.get("/notices/view/:id", noticontroller.getNotice);
router.delete("/notices/delete/:id", noticontroller.deleteNotice);

//reguser Routes
router.post("/users/add", regcontroller.createUser);
router.get("/users/view/", regcontroller.getAllUsers);
router.get("/users/view/:userID", regcontroller.getUser);
router.delete("/users/delete/:id", regcontroller.deleteUser);

module.exports = router;
