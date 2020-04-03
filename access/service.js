const config = require("config.json");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("_helpers/db");
const Access = db.Access;

module.exports = {
  getAll,
  getPathMethod,
  _update,
  _create,
  _delete
};

async function getAll() {
  return await Access.find({ isActive: true });
}
// req.params.method, req.query.path
async function getPathMethod(method, path) {
  return await Access.find({
    path: path,
    method: method.toUpperCase(),
    isActive: true
  });
}

async function _update(id, accessParam) {
  const access = await Access.findById(id);
  Object.assign(access, accessParam);
  await access.save();
}

async function _delete(id) {
  const access = await Access.findById(id);
  Object.assign(access, { isActive: false });
  await access.save();
}

async function _create(accessParam) {
  const method = accessParam.method;
  const path = accessParam.path;
  const access = Access.find({ path: path, method: method.toUpperCase() });
  if (!access) {
    const newAccess = new Access(accessParam);
    await newAccess.save();
  } else {
    Object.assign(access, accessParam);
    access.save();
  }
}
