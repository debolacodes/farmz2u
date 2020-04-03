const config = require("config.json");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("_helpers/db");
const Results = db.RequirementsResults;

module.exports = {
  create,
  getAll,
  getById,
  getByOptionId,
  getByOptionIdResultType,
  _update,
  delete: _delete
};

async function create(Param) {
  const result = new Results(Param);
  await result.save();
}

async function _delete(id) {
  const result = await Results.findById(id);
  Object.assign(result, { isActive: false });
  await result.save();
}

async function getAll() {
  return await Results.find({ isActive: true });
}

async function getById(id) {
  return await Results.findById(id);
}

async function getByOptionId(id) {
  return await Results.find({ optionId: id });
}

async function getByOptionIdResultType(option_id, result_type) {
  return await Results.find({ optionId: option_id, resultType: result_type });
}

async function _update(id, Param) {
  const result = await Results.findById(id);
  if (!result) throw "Result not found!";
  // copy farmingTypeParam properties to user
  Object.assign(result, Param);
  await result.save();
}
