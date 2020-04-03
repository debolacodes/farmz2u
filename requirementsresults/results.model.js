const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// usertype 1 - user
//usertype 2 - admin

const schema = new Schema({
  optionId: { type: String, required: true },
  requirementId: { type: String, required: true },
  isActive: { type: Boolean, default: true },
  createdDate: { type: Date, default: Date.now }
});

schema.set("toJSON", { virtuals: true });

module.exports = mongoose.model("RequirementsResults", schema);
