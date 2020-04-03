const config = require("config.json");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("_helpers/db");
const Requirements = db.Requirements;
const RequirementsResults = db.RequirementsResults;
const Options = db.Options;
const Answers = db.Answers;

module.exports = {
  create,
  update,
  delete: _delete,
  getAll,
  getbyId,
  getByUserRequirements
};

async function create(Param) {
  const ft = new Requirements(Param);
  await ft.save();
}

async function _delete(id) {
  const requirement = await Requirements.findById(id);
  Object.assign(requirement, { isActive: false });
  await requirement.save();
}

async function getAll() {
  return await Requirements.find({ isActive: true });
}

async function getbyId(id) {
  return await Requirements.findById(id);
}
async function update(id, Param) {
  const requirements = await Requirements.findById(id);

  if (!requirements) throw "Requirements not found!";

  // copy farmingTypeParam properties to user
  Object.assign(requirements, Param);
  await requirements.save();
}

async function getByUserRequirements(uid) {
  var answers = await Answers.find({ userId: uid, isActive: true });
  var resultArray;
  var oId;
  var requirements = Array();
  var results = Array();

  // Get answers by user

  for (answer in answers) {
    oId = answers[answer]["selectedOption"];
    resultArray = await RequirementsResults.find({
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

  var requirementId;
  var requirementDetail;

  //Get the details of Each skill attached to each Each skill(skill Id) from skills
  for (eachresult in results) {
    requirementId = results[eachresult]["requirementId"];
    requirementDetail = await Requirements.find({
      _id: requirementId,
      isActive: true
    });
    requirements.push(requirementDetail[0]);
  }

  return requirements;
}
