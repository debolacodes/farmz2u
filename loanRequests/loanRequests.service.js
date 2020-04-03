const config = require("config.json");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("_helpers/db");
const LoanRequests = db.LoanRequests;

module.exports = {
  create,
  _update,
  delete: _delete,
  getAll,
  getbyId
};

async function create(Param) {
  // console.log(Param);
  const ft = new LoanRequests(Param);

  await ft.save();
}

async function _delete(id) {
  const loanRequests = await LoanRequests.findById(id);
  Object.assign(loanRequests, { isActive: false });
  await loanRequests.save();
}

async function getAll() {
  return await LoanRequests.find({ isActive: true });
}

async function getbyId(id) {
  return await LoanRequests.findById(id);
}
async function _update(id, Param) {
  const loanRequests = await LoanRequests.findById(id);
  if (!loanRequests) throw "Loan Request not found!";
  // copy farmingTypeParam properties to user
  Object.assign(loanRequests, Param);
  await loanRequests.save();
}
