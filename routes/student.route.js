const express = require("express");
const router = express.Router();
const cloudinary = require("../utils/cloudinary");
const upload = require("../utils/multer");

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

require("dotenv").config();

const Assignment = require("../models/assignment");
const topicModel = require("../models/student.topics.panel.model");

//Student Registration/ Login
const {
  signupController,
  getAllUsers,
  signinController,
  getUserInfoById,
} = require("./../controllers/student.controller");

//Student Group
const {
  createStudentGroup,
  getAllStudentGroups,
} = require("../controllers/student.group.controller");

//Student Research Topic
const {
  requestSupervisor,
  ViewAllTopics,
  UpdateTopic,
  ViewAllTopicsByAdmin,
  test,
} = require("../controllers/student.topic.controller");

//topic Registation
let topiccontroller = require("../Controllers/student.topic.panel.controller");

/** Chat Controller */
const { getGroupChatsByStudent } = require("../controllers/chat.controller");

//Student routes
router.post("/register", signupController);
router.get("/getAllUsers", getAllUsers);
router.post("/login", signinController);
router.get("/user/:id", getUserInfoById);

//Student group routes
router.post("/studentgroup/create", createStudentGroup);
router.get("/studentgroup/getAll", getAllStudentGroups);

//Research topic routes
router.post("/topic/create", requestSupervisor);
router.get("/topic/status", ViewAllTopics);
router.put("/topic/update/:id", UpdateTopic);
router.get("/topic/getTopicsAdmin", ViewAllTopicsByAdmin);

//topics Registation
router.post(
  "/topics/add",
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

    var newTopicObj = {
      groupID: req.body.groupID,
      topic: req.body.topic,
      supervisorID: req.body.supervisorID,
      co_supervisorID: req.body.co_supervisorID,
      docURL: uploadResult.Location,
    };

    const newTopic = new topicModel(newTopicObj);
    newTopic
      .save()
      .then(() => {
        res.status(200).json({ success: "Topic registered" });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send({ success: false, error: err.message });
      });
  }
);

router.get("/topics/view", topiccontroller.getAllTopics);
router.get(
  "/topics/viewByGroup/:groupID",
  topiccontroller.getCategoryTopicsGroup
);
router.get("/topics/viewByPanel/:panelID", topiccontroller.getCategoryTopics);
router.get("/topics/view/:id", topiccontroller.getTopic);
router.put("/topics/update/:id", topiccontroller.updateTopic);

//File upload
// router.route("/upload").post(upload.single("file"), async (req, res) => {
//   try {
//     const result = await cloudinary.uploader.upload(req.file.path);
//     console.log(result);
//   } catch (error) {
//     console.log(error);
//   }
// });

router.post("/test/add", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return err.json("File is empty");
    }

    const result = await cloudinary.uploader.upload(req.file.path, {
      resource_type: "raw",
      folder: "Template",
      public_id: req.file.originalname,
    });
    console.log(result);

    const assignment = new Assignment({
      asgName: req.body.asgName,
      endDate: req.body.endDate,
      endTime: req.body.endTime,
      department: req.body.department,
      template: result.secure_url,
      cloudinary_id: result.public_id,
      fileName: req.body.fileName,
    });
    await assignment
      .save()
      .then(() => {
        res.json("Assignment Added Successfully...");
      })
      .catch((err) => res.json(err.message));
  } catch (err) {}
});

/** Chat Route */
router.get("/chat/getChatsByStudent", getGroupChatsByStudent);

module.exports = router;
