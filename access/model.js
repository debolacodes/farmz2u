const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// usertype 1 - user
//usertype 2 - admin

const schema = new Schema({
  method: { type: String, required: true },
  path: { type: String, required: true },
  isActive: { type: Boolean, default: true },
  curiousUser: { type: Boolean, default: false },
  generalUser: { type: Boolean, default: false },
  dateCreated: { type: Date, default: Date.now },
  dateModified: { type: Date, default: Date.now }
});

schema.set("toJSON", { virtuals: true });

module.exports = mongoose.model("Access", schema);
