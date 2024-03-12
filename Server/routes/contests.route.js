const express = require("express");
const { access } = require("../middleware/access.middleware");
const { auth } = require("../middleware/auth.middleware");
const { ContestsModel } = require("../models/contests.model");

const contestsRouter = express.Router();

// Add Question
contestsRouter.post("/add", auth, access(["admin"]), async (req, res) => {
  try {
    const contest = new ContestsModel(req.body);
    await contest.save();
    res.status(200).send({ msg: "New Contest Added." });
  } catch (err) {
    // console.log("Error:", err);
    res.status(400).send({ msg: "Bad Request." });
  }
});

contestsRouter.get("/:contestId", async (req, res) => {
  const { contestId } = req.params;
  // console.log("contestID", contestID);
  try {
    const contest = await ContestsModel.findOne({
      _id: contestId,
    });
    res.status(200).send({ contest });
  } catch (err) {
    // console.log("Error:", err);
    res.status(400).send({ msg: "Bad Request." });
  }
});

contestsRouter.get("/", async (req, res) => {
  try {
    const contests = await ContestsModel.find();
    res.status(200).send({ contests });
  } catch (err) {
    // console.log("Error:", err);
    res.status(400).send({ msg: "Bad Request." });
  }
});

// Update Question
contestsRouter.patch(
  "/:contestId",
  auth,
  access(["admin"]),
  async (req, res) => {
    const { contestId } = req.params;
    try {
      const contest = await ContestsModel.findOne({ _id: contestId });
      if (contest.userID === req.body.userID) {
        await ContestsModel.findByIdAndUpdate({ _id: contestId }, req.body);
        res
          .status(200)
          .send({ msg: `The note with ID:${contestId} has been updated.` });
      } else {
        res.status(400).send({ msg: "You are not authorised." });
      }
    } catch (err) {
      res.status(400).send({ error: err });
    }
  }
);

// Delete Question
contestsRouter.delete(
  "/:contestID",
  auth,
  access(["admin"]),
  async (req, res) => {
    const { contestID } = req.params;
    try {
      const contest = await ContestsModel.findOne({ _id: contestID });
      if (contest.userID === req.body.userID) {
        await ContestsModel.findByIdAndDelete({ _id: contestID }, req.body);
        res
          .status(200)
          .send({ msg: `The note with ID:${contestID} has been deleted.` });
      } else {
        res.status(400).send({ msg: "You are not authorised." });
      }
    } catch (err) {
      res.status(400).send({ error: err });
    }
  }
);

module.exports = {
  contestsRouter,
};

// {
//     "title": "Sample Question",
//     "description": "This is a sample question description.",
//     "testCases": [
//       {
//         "inp": "input_sample_1",
//         "oup": "output_sample_1"
//       },
//       {
//         "inp": "input_sample_2",
//         "oup": "output_sample_2"
//       }
//     ],
//     "points": 10,
//     "difficulty": "medium",
//     "topics": ["topic1", "topic2"],
//     "constraints": [
//       "2 <= nums.length <= 104",
//       "-109 <= nums[i] <= 109",
//       "-109 <= target <= 109"
//     ]
//   }
