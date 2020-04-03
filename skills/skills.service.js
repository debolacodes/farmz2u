const config = require("config.json");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("_helpers/db");
const Skills = db.Skills;
const SkillsResults = db.SkillsResults;
const Options = db.Options;
const Answers = db.Answers;

module.exports = {
  create,
  update,
  delete: _delete,
  getAll,
  getbyId,
  getByUserSkills
};

async function create(Param) {
  const ft = new Skills(Param);
  await ft.save();
}

async function _delete(id) {
  const skills = await Skills.findById(id);
  Object.assign(skills, { isActive: false });
  await skills.save();
}

async function getAll() {
  return await Skills.find({ isActive: true });
}

async function getbyId(id) {
  return await Skills.findById(id);
}
async function update(id, Param) {
  const skill = await Skills.findById(id);

  if (!skill) throw "Skills not found!";

  // copy farmingTypeParam properties to user
  Object.assign(skill, Param);
  await skill.save();
}

async function getByUserSkills(uid) {
  var answers = await Answers.find({ userId: uid, isActive: true });
  var resultArray;
  var optionId;
  var skills = Array();
  var results = Array();

  // Get answers by user

  for (answer in answers) {
    oId = answers[answer]["selectedOption"];
    resultArray = await SkillsResults.find({
      optionId: oId,
      isActive: true
    });

    //Get the id of skills attached to selected options from Results

    if (Array.isArray(resultArray) && resultArray.length) {
      for (eachskill in resultArray) {
        results.push(resultArray[eachskill]);
      }
    } else {
    }
  }

  var skillsId;
  var skilldetail;

  //Get the details of Each skill attached to each Each skill(skill Id) from skills
  for (eachresult in results) {
    skillsId = results[eachresult]["skillsId"];
    skilldetail = await Skills.find({
      _id: skillsId,
      isActive: true
    });
    skills.push(skilldetail[0]);
  }

  return skills;
}
