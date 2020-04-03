const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// usertype 1 - user
//usertype 2 - admin

const schema = new Schema({
  userid: { type: String, required: true },
  address: { type: String, required: true },
  bvn: { type: Boolean, default: false },
  passportUrl: { type: String },
  idUrl: { type: String },
  isActive: { type: Boolean, default: true },
  createdDate: { type: Date, default: Date.now }
});

schema.set("toJSON", { virtuals: true });

module.exports = mongoose.model("Kyc", schema);
