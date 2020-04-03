const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// usertype 1 - user
//usertype 2 - admin

const schema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  imageUrl: { type: String },
  farmingTypeId: { type: String },
  isActive: { type: Boolean, default: true },
  createdDate: { type: Date, default: Date.now }
});

schema.set("toJSON", { virtuals: true });

module.exports = mongoose.model("Steps", schema);
