"use strict"
const express = require("express")
const {handleErrors} = require("../utils/middlewares")
const signupTemplate = require("../views/auth/signupTemplate")
const loginTemplate = require("../views/auth/loginTemplate")
const User = require("../controllers/UserController")
const {
  validateEmail,
  validatePassword,
  validatePasswordConfirm,
  validateLoginEmail,
  validateLoginPassword,
} = require("../utils/validators");

const router = express.Router()

router.get("/signup", (req, res) => {
    res.send(signupTemplate({ req: req }))
});

router.post("/signup",
    [validateEmail, validatePassword, validatePasswordConfirm],
    handleErrors(signupTemplate),
    async (req, res) => {
        const { email, password } = req.body;
        const user = await User.createOne({ email: email, password: password });
        req.session.userId = user.id;
        res.redirect("/admin/products")
    }
);

router.get("/login", (req, res) => {
    res.send(loginTemplate({}))
});

router.post("/login",
    [validateLoginEmail, validateLoginPassword],
    handleErrors(loginTemplate),
    async (req, res) => {
        const { email } = req.body;
        const user = await User.getOneBy({ email: email })
        req.session.userId = user.id;
        res.redirect("/admin/products")
    }
);

router.get("/logout", (req, res) => {
    req.session = null;
    res.redirect("/")
})

module.exports = router;