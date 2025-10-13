const mongoose = require("mongoose");

const PresentationSchema = new mongoose.Schema({
  presentationType: {
    type: String,
    required: true,
  },
  panelID: {
    type: String,
  },
  groupID: {
    type: String,
  },
  docURL: {
    type: String,
  },
  comments: {
    type: String,
    default: "Not Evaluated Yet",
  },
  marks: {
    type: String,
    default: "Not Evaluated Yet",
  },
});

module.exports = mongoose.model("Presentations", PresentationSchema);
