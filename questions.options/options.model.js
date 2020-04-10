const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// usertype 1 - user
//usertype 2 - admin

const schema = new Schema({
  optionText: { type: String, required: true },
  questionId: { type: String, required: true },
  imageUrl: { type: String, default: "" },
  isActive: { type: Boolean, default: true },
  nextQuestion: { type: String, default: "" },
  optionScore: { type: String },
  createdDate: { type: Date, default: Date.now }
});

schema.set("toJSON", { virtuals: true });

module.exports = mongoose.model("Options", schema);
