const config = require("config.json");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("_helpers/db");
const User = db.User;
const Answers = db.Answers;
const SkillsResults = db.SkillsResults;
const Options = db.Options;
const Skills = db.Skills;

module.exports = {
  submitAnswer,
  getAll,
  getById,
  getByUser,
  _update,
  quser,
  _delete
};

async function getAll() {
  return await Answers.find({ isActive: true });
}

async function quser(qid, uid) {
  return await Answers.find({ questionId: qid, userId: uid, isActive: true });
}

async function getById(id) {
  return await Answers.findById(id);
}
async function getByUser(uid) {
  console.log(uid);
  return await Answers.find({ userId: uid, isActive: true });
}

async function _update(id, answerParam) {
  const answer = await Answers.findById(id);
  Object.assign(answer, answerParam);
  await answer.save();
}

async function _delete(id, answerParam) {
  const answer = await Answers.findById(id);
  Object.assign(answer, { isActive: false });
  await answer.save();
}

async function submitAnswer(req) {
  var _userId = req.body.userId;
  var optionId = req.body.selectedOption;
  var qid = req.body.questionId;
  // console.log(req.body);
  let option = await Options.findById(optionId);
  // console.log(option);
  if (Object.entries(option).length === 0) {
  } else {
    const ans = await Answers.find({ questionId: qid, userId: _userId });
    if (Object.entries(ans).length === 0) {
      console.log("here");
      const answer = new Answers({
        userId: _userId,
        selectedOption: optionId,
        questionId: qid
      });
      await answer.save();
    } else {
      //Update Answer
      // console.log("Answer Exist");
      if (optionId != ans[0].selectedOption) {
        const answer = await Answers.findById(ans[0].id);
        Object.assign(answer, { selectedOption: optionId });
        console.log(answer);
        await answer.save();
      }
    }
  }
}
