const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
  name: { type: String, unique: true, required: true },
  description: { type: String },
  createdDate: { type: Date, default: Date.now }
});

schema.set("toJSON", { virtuals: true });
module.exports = mongoose.model("farmingTypes", schema);
