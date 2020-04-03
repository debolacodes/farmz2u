const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// usertype 1 - user
//usertype 2 - admin

const schema = new Schema({
  valueChain: { type: String, required: true },
  farmingType: { type: String, required: true },
  timeRequirement: { type: String },
  region: { type: String },
  avgYield: { type: String },
  incomeEstimate: { type: String },
  incomeReference: { type: String },
  option: { type: JSON, default: [] },
  optionId: { type: String },
  createdDate: { type: Date, default: Date.now }
});

schema.set("toJSON", { virtuals: true });

module.exports = mongoose.model("Information", schema);
