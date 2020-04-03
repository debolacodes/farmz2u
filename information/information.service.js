const config = require("config.json");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("_helpers/db");

const Results = db.Results;
const Answers = db.Answers;
const Information = db.Information;
const Questions = db.Questions;
const Options = db.Options;

module.exports = {
  _create,
  _update,
  getAll,
  getbyId,
  getByUserId,
  _delete
};
async function _create(body) {
  const ft = new db.Information(body);
  await ft.save();
}

async function _delete(id) {
  const information = await db.Information.findById(id);
  Object.assign(information, { isActive: false });
  await information.save();
}

async function getAll() {
  return await db.Information.find().select("-createdDate");
}

async function getByUserId(id) {
  let allValueChains = await Information.find();
  let allQuestions = await Questions.find({ isActive: true });
  let valueChainToReturn = [];
  for (var i = 0; i < allValueChains.length; i++) {
    var valueChainOptions = allValueChains[i].option.toString().split(",");
    let foundAllMatch = true;
    for (var k = 0; k < allQuestions.length; k++) {
      let allAnswersWithQuestion = await Answers.find({
        userId: id,
        questionId: allQuestions[k]._id,
        isActive: true
      });
      let foundMatch = false;
      if (allAnswersWithQuestion.hasOwnProperty(0)) {
        if (allAnswersWithQuestion)
          for (let j = 0; j < allAnswersWithQuestion.length; j++) {
            if (
              valueChainOptions.includes(
                allAnswersWithQuestion[j].selectedOption
              )
            ) {
              foundMatch = true;
              break;
            } else {
            }
          }
      } else {
        foundMatch = true;
      }

      if (!foundMatch) {
        foundAllMatch = false;
        break;
      }
    }
    if (foundAllMatch) {
      valueChainToReturn.push(allValueChains[i]);
    }
  }
  console.log(valueChainToReturn);
  return valueChainToReturn;
}

async function getbyId(id) {
  return await db.Information.findById(id);
}

async function _update(id, Param) {
  const information = await db.Information.findById(id);

  if (!information) throw "Requirements not found!";

  // copy farmingTypeParam properties to user
  Object.assign(information, Param);
  await information.save();
}
