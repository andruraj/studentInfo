const express = require("express");
const router = express.Router();

const keys = require("../../config/keys");

//input validation
const validateAddInput = require("../../validation/add");

//user model
const Student = require("../../models/Student");

// @route   GET api/students/test
// @desc    Tests users api
// @access  Public
router.get("/test", (req, res) =>
  res.json({
    msg: "students api working"
  })
);

// @route   POST api/students/add
// @desc    Add student
// @access  Public
router.post("/", (req, res) => {
  const { errors, isValid } = validateAddInput(req.body);

  //check valid
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const newStudent = {};
  if (req.body.firstname) newStudent.firstname = req.body.firstname;
  if (req.body.lastname) newStudent.lastname = req.body.lastname;
  if (req.body.mobile) newStudent.mobile = req.body.mobile;
  if (req.body.email) newStudent.email = req.body.email;

  Student.findOne({ email: newStudent.email }).then(student => {
    if (student) {
      Student.findOneAndUpdate(
        { email: req.body.email },
        { $set: newStudent },
        { new: true }
      )
        .then(student => res.json(student))
        .catch(err => console.log(err));
    } else {
      //create
      Student.findOne({ email: newStudent.email })
        .then(student => {
          if (student) {
            errors.email = "Email already exists";
            res.status(400).json(errors);
          } else {
            //save profile
            new Student(newStudent)
              .save()
              .then(student => res.json(student))
              .catch(err => console.log(err));
          }
        })
        .catch(err => console.log(err));
    }
  });
});

// @route   GET api/students
// @desc    get students
// @access  Public
router.get("/", (req, res) => {
  Student.find()
    .sort({ date: -1 })
    .then(student => res.json(student))
    .catch(err => res.status(404).json({ nostudentfound: "No students" }));
});

// @route   DELETE api/students/:id
// @desc    delete student by id
// @access  Private
router.delete("/:id", (req, res) => {
  Student.findById(req.params.id)
    .then(student => {
      //delete
      student.remove().then(() => res.json({ success: true }));
    })
    .catch(err => res.status(404).json({ student: "Student not found" }));
});

module.exports = router;
