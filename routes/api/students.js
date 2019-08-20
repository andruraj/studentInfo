const express = require("express");
const router = express.Router();

const keys = require("../../config/keys");

//input validation
const validateRegisterInput = require("../../validation/add");

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

  User.findOne({ email: req.body.email })
    .then(student => {
      if (student) {
        errors.email = "Email already exists";
        return res.status(400).json(errors);
      }
      const newstudent = new Student({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        mobile: req.body.mobile
      });

      newStudent
        .save()
        .then(student => res.json(student))
        .catch(err => res.status(404).json(err));
    })
    .catch(err => res.status(404).json(err));
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
