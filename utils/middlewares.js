"use strict"
const { validationResult } = require("express-validator")

module.exports = {
    handleErrors(templateFunc, cb) {
        return async (req, res, next) => {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                let data = {};
                if (cb) {
                    data = await cb(req)
                }
                return res.send(templateFunc({errors, ...data}))
            }
            next();
        }
    },

    isUserLoggedIn(req, res, next) {
        if (!req.session.userId) {
            return res.redirect("/login")
        }
        next();
    }
}