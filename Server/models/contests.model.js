const mongoose = require("mongoose");

const contestSchema = mongoose.Schema(
  {
    title: { type: String },
    description: { type: String },
    questions: {
      type: [
        {
          qstId: String,
          qstTitle: String,
          difficulty: { type: String, enum: ["Easy", "Medium", "Hard"] },
        },
      ],
    },
    difficulty: { type: String, enum: ["Easy", "Medium", "Hard"] },
  },
  {
    versionKey: false,
  }
);

const ContestsModel = mongoose.model("contests", contestSchema);

module.exports = {
  ContestsModel,
};

// {title:"Sum of Two Numbers",
// description: "Find Sum of two Numbers",
// testCases: [
//   {
//     inp: "1 2",
//     oup: "3",
//   },{
//     inp: "4 5",
//     oup: "9",
//   },{
//     inp: "7 9",
//     oup: "16",
//   },{
//     inp: "15 41",
//     oup: "56",
//   },
// ],
// points: 10,
// difficulty:"easy",
// topics: ["sum", "inputs"] }
