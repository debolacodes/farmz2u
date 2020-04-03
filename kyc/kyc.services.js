const config = require("config.json");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("_helpers/db");
const Kyc = db.Kyc;

module.exports = {
  create,
  update,
  delete: _delete,
  getAll,
  getbyId
};

async function create(Param) {
  if (await Kyc.findOne({ userid: Param.userid, isActive: true })) {
    throw "KYC of User exists";
  }

  const ft = new Kyc(Param);
  await ft.save();
}

async function _delete(id) {
  const answer = await Kyc.findById(id);
  Object.assign(Kyc, { isActive: false });
  await Kyc.save();
}

async function getAll() {
  return await Kyc.find({ isActive: true });
}

async function getbyId(id) {
  return await Kyc.findById(id);
}
async function update(id, Param) {
  const kyc = await Kyc.findById(id);

  if (!kyc) throw "kyc not found!";

  // copy farmingTypeParam properties to user
  Object.assign(kyc, Param);
  await kyc.save();
}
