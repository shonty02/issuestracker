const mongoose = require("../connection");

const mySchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  username: String,
  team: { type: Boolean, default: false },
  createdAt: { type: Date, default: new Date() },
});

const myModel = mongoose.model("users", mySchema);

module.exports = myModel;
