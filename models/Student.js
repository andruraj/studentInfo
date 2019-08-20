const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create new schema
const StudentSchema = new Schema({
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  mobile: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now()
  }
});

module.exports = Student = mongoose.model("students", StudentSchema);
