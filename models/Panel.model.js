const mongoose = require("mongoose");

const panelSchema = new mongoose.Schema({
    panelGroupID: {
    type: String,
    require: true
  },
  panelHead: {
    type: String,
    require: true
  },
  panel_researchArea: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model("Panel", panelSchema);
