const mongoose = require("mongoose");

const FinalMarkSchema = new mongoose.Schema({
  
  panelGroupID: {
    type: String,
    require: true
  },
  studentGroupID: {
    type: String,
    require: true
  },
  pp_01: {
    type: String,
    required: true
  },
  pp_02: {
    type: String,
    required: true
  },
  final_report: {
    type: String,
    required: true
  },
  finalmark: {
    type: String,
    required: true
  },
  finalgrade: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model("FinalMarks", FinalMarkSchema);
