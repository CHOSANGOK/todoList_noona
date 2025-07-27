const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const jwt = require("jsonwebtoken");
require("dotenv").config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const userSchem = Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
userSchem.methods.toJSON = function () {
  const { _id, name, email, createdAt } = this._doc;

  return { _id, name, email, createdAt };
};

userSchem.methods.generateToken = function () {
  const token = jwt.sign({ _id: this._id }, JWT_SECRET_KEY);
  return token;
};

const User = mongoose.model("User", userSchem);

module.exports = User;
