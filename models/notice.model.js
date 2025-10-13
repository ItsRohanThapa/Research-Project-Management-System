const mongoose = require("mongoose");

const NoticeSchema = new mongoose.Schema({
  noticeHeader: {
    type: String,
    required: true,
  },
  roleID: {
    type: String, //,staff
    required: true,
  },
  noticeCategory: {
    type: String, //topic,notice,presentation,document
    required: true,
  },
  description: {
    type: String,
  },
  docURL: {
    type: String,
  },
});

module.exports = mongoose.model("Notices", NoticeSchema);
