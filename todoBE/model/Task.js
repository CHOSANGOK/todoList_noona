const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskSchem = Schema({
  task: {
    type: String,
    required: true,
  },
  isComplete: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const Task = mongoose.model("Task", taskSchem);

module.exports = Task;
