const mongoose = require("mongoose");
const EvaluationDocumentSchema = new mongoose.Schema(
  {
    groupID: {
      type: String,
      required: true,
    },
    supervisorName: {
      type: String,
      required: true,
    },
    evDocument: {
      type: String,
      required: true,
    },
    documentMarks: {
      type: String,
      required: true,
    },
  },
);

const EvDocument = mongoose.model("EvalDocument", EvaluationDocumentSchema);
module.exports = EvDocument;
