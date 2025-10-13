const router = require("express").Router();

let panelMembercontroller = require("../Controllers/panelMember.controller");
let panelcontroller = require("../Controllers/panel.controller");
let finalMarkcontroller = require("../Controllers/finalMarks.controller");

// PanelMember Router Paths
router.post("/panelMembers/save", panelMembercontroller.createPanelMember); //Save PanelMember Details
router.get("/panelMembers/view/", panelMembercontroller.getAllPanelMembers); //Get All PanelMember Details
router.get("/panelMembers/view/:id", panelMembercontroller.getPanelMember); //Get a specific PanelMember Details
router.put("/panelMembers/update/:id", panelMembercontroller.updatePanelMember); //Update PanelMember Details
router.delete("/panelMembers/delete/:id", panelMembercontroller.deletePanelMember); //Delete PanelMember

// panel Router Paths
router.post("/panel/save", panelcontroller.createPanel); //Save panel Details
router.get("/panel/view/", panelcontroller.getAllPanel); //Get All panel Details
router.get("/panel/view/:id", panelcontroller.getPanel); //Get a specific panel Details
router.put("/panel/update/:id", panelcontroller.updatePanel); //Update panel Details
router.delete("/panel/delete/:id", panelcontroller.deletePanel); //Delete panel

// Final Marks Paths
router.post("/finalMarks/save", finalMarkcontroller.createFinalMark); //Save Final Marks Details
router.get("/finalMarks/view/", finalMarkcontroller.getAllFinalMarks); //Get All Final Marks Details
router.get("/finalMarks/view/:id", finalMarkcontroller.getFinalMark); //Get a specific Final Marks Details
router.put("/finalMarks/update/:id", finalMarkcontroller.updateFinalMark); //Update Final Marks Details
router.delete("/finalMarks/delete/:id", finalMarkcontroller.deleteFinalMark); //Delete Final Marks

module.exports = router;
