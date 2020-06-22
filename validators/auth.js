const { check } = require("express-validator");

exports.userSignupValidator = [
  check("name", "Name is invalid").not().isEmpty(),
  check("email", "Email is invalid").isEmail(),
  check("password", "Password must be at least 6 characters long").isLength({
    min: 6,
  }),
];

exports.userSigninValidator = [
  check("email", "Email is invalid").isEmail(),
  check("password", "Password must be at least 6 characters long").isLength({
    min: 6,
  }),
];

exports.forgotPasswordValidator = [
  check("email", "Must be a valid email address").not().isEmpty().isEmail(),
];

exports.resetPasswordValidator = [
  check("newPassword", "Password must be at least  6 characters long")
    .not()
    .isEmpty()
    .isLength({ min: 6 }),
];
