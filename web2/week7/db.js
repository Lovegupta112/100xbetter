const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const todoSchema = new Schema({
  title: String,
  completed: { type: Boolean, default: false },
  userId: ObjectId,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const userSchema = new Schema({
  username: String,
  email: { type: String, unique: true },
  password: String,
});

const TodoModel = mongoose.model("Todo", todoSchema);
const UserModel = mongoose.model("User", userSchema);

module.exports = {
  TodoModel,
  UserModel,
};
