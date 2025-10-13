const mongoose = require("mongoose");

const supervisorSelection = new mongoose.Schema({
  groupID: {
    type: String,
    required: false,
  },
  supervisorID: {
    type: String,
    required: false,
  },
  co_supervisorID: {
    type: String,
    required: false,
  },
  topic: {
    type: String,
    required: false,
  },
  status: {
    type: String,
    //required: true,
  },
  remarks: {
    type: String,
    //required: true,
  },
});

module.exports = mongoose.model("supervisor.selection", supervisorSelection);
