const config = require("config.json");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("_helpers/db");
const Options = db.Options;

module.exports = {
  getAll,
  getById,
  getByQId,
  create,
  _update,
  delete: _delete,
};

async function getAll() {
  return await Options.find({ isActive: true });
}

async function getById(id) {
  return await Options.find({ _id: id, isActive: true });
}

async function getByQId(qid) {
  console.log(qid);
  return await Options.find({ questionId: qid });
}

async function create(OptionsParam) {
  const options = new Options(OptionsParam);
  await options.save();
  var r = Options.find(OptionsParam).sort({ _id: 1 }).limit(1);
  return r;
}

async function _update(id, OptionsParam) {
  const options = await Options.findById(id);
  Object.assign(options, OptionsParam);
  await options.save();
}

async function _delete(id) {
  const options = await Options.findById(id);
  Object.assign(options, { isActive: false });
  await options.save();
}
