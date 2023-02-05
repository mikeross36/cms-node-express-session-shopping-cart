"use strict"
const { check } = require("express-validator")
const User = require("../controllers/UserController")

module.exports = {
  // signup
  validateEmail: check("email")
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage("Email is not valid!")
    .custom(async (email) => {
      const user = await User.getOneBy({ email: email });
      if (user) throw new Error("Email in use!");
    }),
  validatePassword: check("password")
    .trim()
    .isLength({ min: 6, max: 20 })
    .withMessage("Length must be between 6 and 20 chars!"),
  validatePasswordConfirm: check("passwordConfirm")
    .trim()
    .isLength({ min: 6, max: 20 })
    .withMessage("Length must be between 6 and 20 chars!")
    .custom((passwordConfirm, { req }) => {
      if (passwordConfirm !== req.body.password) {
        throw new Error("Passwords do not match");
      }
      return true;
    }),
  // login
  validateLoginEmail: check("email")
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage("Email is not valid!")
    .custom(async (email) => {
      const user = await User.getOneBy({ email: email });
      if (!user) throw new Error("No user with this email!");
    }),
  validateLoginPassword: check("password")
    .trim()
    .isLength({ min: 6, max: 20 })
    .withMessage("Length must be between 6 and 20 chars!")
    .custom(async (password, { req }) => {
      const user = await User.getOneBy({ email: req.body.email });
      if (!user) throw new Error("No user with this password!");

      const validPassword = await User.comparePasswords(
        user.password,
        password
      );
      if (!validPassword) throw new Error("Invalid password!");
    }),
  // new product
  validateTitle: check("title")
    .trim()
    .isLength({ min: 1, max: 40 })
    .withMessage("Length must be between 1 and 40 chars!"),
  validatePrice: check("price")
    .trim().toFloat()
    .isFloat({ min: 1 })
    .withMessage("Number must be greater than 1!")
};
