const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// usertype 1 - user
//usertype 2 - admin

const schema = new Schema({
  userId: { type: String, required: true },
  questionId: { type: String, required: true },
  selectedOption: { type: String, required: true },
  isActive: { type: Boolean, default: true },
  createdDate: { type: Date, default: Date.now }
});

schema.set("toJSON", { virtuals: true });

module.exports = mongoose.model("Answers", schema);
