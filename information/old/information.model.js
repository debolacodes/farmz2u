const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// usertype 1 - user
//usertype 2 - admin

const schema = new Schema({
  valueChain: { type: String, required: true },
  farmingType: { type: String },
  timeRequirement: { type: String },
  region: { type: String },
  avgYield: { type: String },
  incomeEstimate: { type: String, required: true, default: 0 },
  incomeReference: { type: String },
  option: { type: JSON, default: [] },
  optionId: { type: String },
  createdDate: { type: Date, default: Date.now },
});

schema.set("toJSON", { virtuals: true });

module.exports = mongoose.model("Information", schema);
