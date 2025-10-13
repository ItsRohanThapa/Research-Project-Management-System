const express = require("express");
const router = express.Router();

//Validator Routes
const {
  StaffsignupValidator,
  ActTopicValidator,
  EvDocumentValidator,
  validatorResult,
} = require("../middleware/staffValidator");

//Controller Routes

/** Staff Contoller */
const {
  StaffSignUpController,
  deleteStaffController,
  getStaffInfo,
  getStaffInfoById,
} = require("../controllers/staff.controller");

/** Accept Topic Contoller */
const {
  createActTopicController,
  getActTopicInfo,
  getActTopicInfoById,
  updateActTopic,
  deleteActTopicController,
} = require("../controllers/acceptTopic.controller");

/** Evaluation Document Contoller */
const {
  createEvDocumentController,
  getEvDocumentInfo,
  getEvDocumentById,
  updateEvDocument,
  deleteEvDocumentController,
} = require("../controllers/EvaluationDocument.controller");

/** Chat Controller */
const {getGroupChatsByStaff
} = require("../controllers/chat.controller");


/** Begin of Staff  Signup Routes **/
//Staff Save details
router.post(
  "/staff/save",
  StaffsignupValidator,
  validatorResult,
  StaffSignUpController
);
//Staff Get all the details
router.get("/staff/view", getStaffInfo);
//Staff Specific data retrive
router.get("/staff/view/:id", getStaffInfoById);
//Staff delete
router.delete("/staff/delete/:id", deleteStaffController);
/** End of Staff  Signup Routes **/

/** Begin of Accept Topic Routes **/
//Accept Topic save
router.post(
  "/actTopic/save",
  ActTopicValidator,
  validatorResult,
  createActTopicController
);
//Accept Topic Get all details
router.get("/actTopic/view", getActTopicInfo);
//Get specifict topic accept detail
router.get("/actTopic/view/:id", getActTopicInfoById);
//Update the topic details
router.put("/actTopic/update/:id", updateActTopic);
//Delete the accepted topic details
router.delete("/actTopic/delete/:id", deleteActTopicController);
/** End of Accept Topic Routes **/

/** Begin of Evaluation Document Routes **/
//Evaluation Document save
router.post(
  "/evDoc/save",
  EvDocumentValidator,
  validatorResult,
  createEvDocumentController
);
//Evaluation Document Get all details
router.get("/evDoc/view", getEvDocumentInfo);
//Get specifict Evaluation Document
router.get("/evDoc/view/:id", getEvDocumentById);
//Update the Evaluation Document
router.put("/evDoc/update/:id", updateEvDocument);
//Delete the Evaluation Document
router.delete("/evDoc/delete/:id", deleteEvDocumentController);
/** End of Evaluation Document Routes **/

/** Chat Route */
router.get("/chat/getChatsByStaff",getGroupChatsByStaff);

module.exports = router;

