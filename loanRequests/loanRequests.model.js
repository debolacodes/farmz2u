const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// usertype 1 - user
//usertype 2 - admin

const schema = new Schema({
  userId: { type: String, required: true },
  amount: { type: String },
  status: { type: String },
  description: { type: String },
  isActive: { type: Boolean, default: true },
  dateModified: { type: Date },
  createdDate: { type: Date, default: Date.now }
});

schema.set("toJSON", { virtuals: true });
module.exports = mongoose.model("loanRequests", schema);
