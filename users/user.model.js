const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// usertype 1 - user
//usertype 2 - admin

const schema = new Schema({
  username: { type: String, unique: true, required: true },
  hash: { type: String },
  firstName: { type: String },
  lastName: { type: String },
  admin: { type: Boolean, default: false },
  curiousUser: { type: Boolean, default: false },
  generalUser: { type: Boolean, default: false },
  email: {
    type: String,
    match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
  },
  token: "",
  phone: { type: String },
  createdDate: { type: Date, default: Date.now },
});

schema.set("toJSON", { virtuals: true });

module.exports = mongoose.model("User", schema);
