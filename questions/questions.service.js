const config = require("config.json");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("_helpers/db");
const Questions = db.Questions;
const Options = db.Options;
const Answers = db.Answers;
const Users = db.Users;
const usersService = require("../users/user.service");

module.exports = {
  getAll,
  getById,
  create,
  _update,
  delete: _delete,
  getCurrent,
  start,
};

async function getAll() {
  let allQuestion = await Questions.find({ isActive: true });
  let allQuestionAndOptions = Array();
  let questionJson = Array();
  let options = "";

  for (var i = 0; i < allQuestion.length; i++) {
    options = await Options.find({
      questionId: allQuestion[i]._id,
      isActive: true,
    });
    questionJson = { question: allQuestion[i], options: options };
    allQuestionAndOptions[i] = questionJson;
  }

  return allQuestionAndOptions;
}

async function start() {
  let question = await Questions.find({ head: true, isActive: true });
  let questionJson = undefined;
  var id = question[0]._id;
  if (Object.entries(question).length === 0) {
    console.log("Question does not exist or has been deleted");
  } else {
    let options = await Options.find({ questionId: id, isActive: true });
    questionJson = { question: question, options: options };
  }
  return questionJson;
}

async function getCurrent(id) {
  lastanswer = await Answers.findOne({ userId: id })
    .sort({ field: "asc", _id: -1 })
    .limit(1);

  if (lastanswer === null) {
    var question = await Questions.findOne({ head: true, isActive: true });
  } else {
    var lastoptionId = lastanswer.selectedOption;
    var lastoption = await Options.findById(lastoptionId);
    var nextQuestionId = lastoption.nextQuestion;
    console.log(nextQuestionId);
    if (nextQuestionId == "") {
      // go up
      var previousQuestionId = lastoption.questionId;
      var previousQuestion = await Questions.findById(previousQuestionId);
      var nextQuestionId = previousQuestion.nextQuestion;
      console.log(nextQuestionId);
      if (nextQuestionId == "") {
        return "final result";
      } else {
        var question = await Questions.findById(nextQuestionId);
      }
    } else {
      var question = await Questions.findById(nextQuestionId);
    }
  }
  let questionJson = undefined;
  var id = question._id;
  if (Object.entries(question).length === 0) {
    console.log("Question does not exist or has been deleted");
  } else {
    let options = await Options.find({ questionId: id, isActive: true });
    questionJson = { question: question, options: options };
  }
  return questionJson;
}

async function getById(id) {
  let question = await Questions.find({ _id: id, isActive: true });
  let questionJson = undefined;
  if (Object.entries(question).length === 0) {
    console.log("Question does not exist or has been deleted");
  } else {
    let options = await Options.find({ questionId: id, isActive: true });
    questionJson = { question: question, options: options };
  }

  return questionJson;
}

async function create(QuestionParam) {
  questionText = decodeURI(QuestionParam.questionText);
  const question = new Questions({ questionText: questionText });
  await question.save();
  var newQuestion = await Questions.find({ questionText: questionText })
    .sort({ _id: 1 })
    .limit(1);
  var questionWithOptions = await getById(newQuestion[0]._id);
  return questionWithOptions;
}

async function _update(id, QuestionParam) {
  const question = await Questions.findById(id);
  Object.assign(question, QuestionParam);
  await question.save();
}

async function _delete(id) {
  const question = await Questions.findById(id);
  Object.assign(question, { isActive: false });
  await question.save();
}
