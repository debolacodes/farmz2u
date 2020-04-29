const config = require("config.json");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("_helpers/db");
const nodemailer = require("nodemailer");
const User = db.User;
const Answers = db.Answers;
const Options = db.Options;
const Questions = db.Questions;

module.exports = {
  submitAnswer,
  getAll,
  getById,
  getByUser,
  _update,
  quser,
  _delete,
  sendCuriousmail,
};

async function sendCuriousmail(body) {
  let email = body.email;

  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "debolacodes@gmail.com",
      pass: "Olumuyiwa4",
    },
  });

  var mailOptions = {
    from: "info@farmz2u.co.uk",
    to: "debolacodes@gmail.com",
    subject: "Curious Need",
    text:
      `Hi There, <br/> 
    My curiosity isn’t satisfied just yet. Can you tell me why?
    From
    Curious Person(` +
      email +
      ")",
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      return { message: "Error submitting Query" };
    } else {
      return { message: "Query sent" };
    }
  });
}

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
  let an = await Answers.find({ userId: uid, isActive: true });
  let qid = "";
  let oid = "";
  let result = Array();
  var all_answers = {};
  for (var i = 0; i < an.length; i++) {
    qid = an[i].questionId;
    oid = an[i].selectedOption;
    let qtext = await Questions.findById(qid);
    let otext = await Options.findById(oid);
    result.push([qtext.questionText, otext.optionText]);
    all_answers[i] = an[i];
  }
  console.log(result);
  return result;
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
  let option = await Options.findById(optionId);
  if (Object.entries(option).length === 0) {
  } else {
    const ans = await Answers.find({ questionId: qid, userId: _userId });
    if (Object.entries(ans).length === 0) {
      const answer = new Answers({
        userId: _userId,
        selectedOption: optionId,
        questionId: qid,
      });
      await answer.save();
    } else {
      if (optionId != ans[0].selectedOption) {
        const answer = await Answers.findById(ans[0].id);
        Object.assign(answer, { selectedOption: optionId });
        await answer.save();
      }
    }
  }
}
