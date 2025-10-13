const mongoose = require("mongoose");
const schema = mongoose.Schema;

const Assignment = new schema({
  asgName: {
    type: String,
    required: true,
  },
  endDate: {
    type: String,
    required: true,
  },
  endTime: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  template: {
    type: String,
    required: true,
  },
  cloudinary_id: {
    type: String,
    required: true,
  },
  fileName: {
    type: String,
    required: true,
  },
});

const assignment = mongoose.model("assignment", Assignment);
module.exports = assignment;
