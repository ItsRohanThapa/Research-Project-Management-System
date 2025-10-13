const mongoose = require("mongoose");

const panelmemberSchema = new mongoose.Schema({
  staffID: {
    type: String,
    require: true
  },
  panelmemberID: {
    type: String,
    require: true
  },
  panelmemberName: {
    type: String,
    require: true
  },
  p_researchArea: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model("Panelmember", panelmemberSchema);
