//const AutoIncrementPlugin = require("auto-increment-plugin");
const mongoose = require("mongoose");
const student_group = new mongoose.Schema(
  {
    groupID: {
      type: String,
      required: true,
    },
    leaderID: {
      type: String,
      required: true,
    },
    members: [
      {
        member_1: {
          type: String,
        },
        member_2: {
          type: String,
        },
        member_3: {
          type: String,
        },
      },
    ],
  },
  { timestamps: true }
);

// student_group.plugin(AutoIncrementPlugin, {
//   model_name: "student.groups",
// });

const studentGroup = mongoose.model("student.groups", student_group);
module.exports = studentGroup;
