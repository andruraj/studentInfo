const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateAddInput(data) {
  let errors = {};

  data.firstname = !isEmpty(data.firstname) ? data.firstname : "";
  data.lastname = !isEmpty(data.lastname) ? data.lastname : "";
  data.email = !isEmpty(data.email) ? data.email : "";

  if (!Validator.isLength(data.firstname, { min: 2, max: 30 })) {
    errors.name =
      "First Name must be atleast 2 characters and less than 30 characters";
  }

  if (Validator.isEmpty(data.firstname)) {
    errors.name = "First Name field is required";
  }
  if (!Validator.isLength(data.lastname, { min: 2, max: 30 })) {
    errors.name =
      "Last Name must be atleast 2 characters and less than 30 characters";
  }

  if (Validator.isEmpty(data.lastname)) {
    errors.name = "Last Name field is required";
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = "Invalid Email";
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
