const config = require("config.json");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("_helpers/db");
const FarmingTypes = db.FarmingTypes;

module.exports = {
  create,
  update,
  delete: _delete,
  getAll,
  getbyId
};

async function create(Param) {
  // validate
  // check username and email address

  if (await FarmingTypes.findOne({ name: Param.name })) {
    throw 'Farming Type ( "' + Param.name + '") exists';
  }
  console.log(Param.name);
  const ft = new FarmingTypes(Param);
  // save user
  await ft.save();
}

async function _delete(id) {
  await FarmingTypes.findByIdAndRemove(id);
}

async function getAll() {
  return await FarmingTypes.find().select("-hash");
}

async function getbyId(id) {
  return await FarmingTypes.findById(id).select("-hash");
}
async function update(id, Param) {
  const farmingType = await FarmingTypes.findById(id);
  // validate
  if (!farmingType) throw "Farming Type not found";
  if (
    farmingType.name !== Param.name &&
    (await FarmingTypes.findOne({ name: Param.name }))
  ) {
    throw 'Farming Type ( "' + userParam.username + '" ) already exists';
  }

  // copy farmingParam properties to user
  Object.assign(farmingType, Param);
  await farmingType.save();
}
