const mongoose = require("mongoose");
const research_group = new mongoose.Schema(
  {
    groupID: {
      type: String,
      required: true,
    },
    leaderID: {
      type: String,
      required: true,
    },
    supervisorID: {
      type: String,
      required: true,
    },
    co_supervisorID: {
      type: String,
      //required: true,
    },
    panelID: {
      type: String,
      required: true,
    },
    topic: {
      type: String,
      required: true,
    },
    result: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const researchGroup = mongoose.model("research.group", research_group);
module.exports = researchGroup;
