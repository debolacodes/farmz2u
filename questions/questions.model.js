const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// usertype 1 - user
//usertype 2 - admin

const schema = new Schema({
  questionText: { type: String, required: true },
  imageUrl: { type: String },
  head: { type: Boolean, default: false },
  type: { type: String, default: 0 },
  nextQuestion: { type: String, default: "" },
  isActive: { type: Boolean, default: true },
  createdDate: { type: Date, default: Date.now }
});

schema.set("toJSON", { virtuals: true });

module.exports = mongoose.model("Questions", schema);
