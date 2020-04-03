const config = require("config.json");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("_helpers/db");
const Steps = db.Steps;
const StepsResults = db.StepsResults;
const Options = db.Options;
const Answers = db.Answers;

module.exports = {
  create,
  update,
  delete: _delete,
  getAll,
  getbyId,
  getByUserSteps
};

async function create(Param) {
  const ft = new Steps(Param);
  await ft.save();
}

async function _delete(id) {
  const steps = await Steps.findById(id);
  Object.assign(steps, { isActive: false });
  await steps.save();
}

async function getAll() {
  return await Steps.find({ isActive: true });
}

async function getbyId(id) {
  return await Steps.findById(id);
}
async function update(id, Param) {
  const step = await Steps.findById(id);

  if (!step) throw "Steps not found!";

  // copy farmingTypeParam properties to user
  Object.assign(step, Param);
  await step.save();
}

async function getByUserSteps(uid) {
  var answers = await Answers.find({ userId: uid, isActive: true });
  var resultArray;
  var optionId;
  var steps = Array();
  var results = Array();

  // Get answers by user

  for (answer in answers) {
    oId = answers[answer]["selectedOption"];
    resultArray = await StepsResults.find({
      optionId: oId,
      isActive: true
    });

    //Get the id of steps attached to selected options from Results

    if (Array.isArray(resultArray) && resultArray.length) {
      for (eachstep in resultArray) {
        results.push(resultArray[eachstep]);
      }
    } else {
    }
  }

  var stepId;
  var stepdetail;

  //Get the details of Each skill attached to each Each skill(skill Id) from skills
  for (eachresult in results) {
    stepId = results[eachresult]["stepId"];
    stepdetail = await Steps.find({
      _id: stepId,
      isActive: true
    });
    steps.push(stepdetail[0]);
  }

  return steps;
}
