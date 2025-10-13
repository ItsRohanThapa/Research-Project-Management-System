const mongoose = require("mongoose");
const AcceptTopicSchema = new mongoose.Schema(
  {
    groupID: {
      type: String,
      required: true,
    },
    supervisorName: {
      type: String,
      required: true,
    },
    researchTopic: {
      type: String,
      required: true,
    },
    coSupervisorName: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    remarks: {
      type: String,
      required: true,
    },
  },
);

const AcTopic = mongoose.model("ActTopics", AcceptTopicSchema);
module.exports = AcTopic;
