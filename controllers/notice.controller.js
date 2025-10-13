let noticeModel = require("../models/notice.model");

//Get Notices by roleID
const getCategoryNotices = async (req, res) => {
  let role = req.params.roleID;
  noticeModel
    .find({ roleID: { $in: [role, "all"] } })
    .then((notices) => {
      res.status(200).json({
        success: true,
        noticeList: notices,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ success: false, error: err.message });
    });
};

//Get all Notices
const getAllNotices = async (req, res) => {
  noticeModel
    .find()
    .then((notices) => {
      res.json({
        success: true,
        noticeList: notices,
      });
    })
    .catch((err) => {
      res.json({ error: err.message });
    });
};

//Get specific Notice
const getNotice = async (req, res) => {
  let userId = req.params.id;
  noticeModel
    .findById(userId)
    .then((Notice) => {
      res.status(200).json({ success: true, Notice });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ success: false, error: err.message });
    });
};

// //Update Notice
// const updateNotice = async (req, res) => {
//     noticeModel.findByIdAndUpdate(req.params.id,
//         {
//             $set:req.body
//         })
//     .then(()=>{
//         res.status(200).json({success: "Notice updated"})
//     }).catch((err)=>{
//         console.log(err);
//         res.status(500).json({status: "Error with updating data", error: err.message});
//     })
// }

//Delete Notice
const deleteNotice = async (req, res) => {
  noticeModel
    .findByIdAndDelete(req.params.id)
    .then(() => {
      res.status(200).json({ status: "Notice deleted" });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .json({ status: "Error with deleting Notice", error: err.message });
    });
};

module.exports = {
  getCategoryNotices,
  getAllNotices,
  getNotice,
  deleteNotice,
};
