"use strict"
const layout = require("../layouts/formLayout")
const { getError } = require("../../utils/getError")

module.exports = ({ req, errors }) => {
    return layout({
        content: `
            <div class="container py-3 mb-5">
                <br/>
                <div class="d-flex justify-content-center">     
                    <form method="POST" style="width: 20rem;">
                        <h1>Sign up</h1>
                        <div class="mb-3">
                            <label for="email-input" class="form-label">Email</label>
                            <input type="email" class="form-control" name="email">
                            <div id="emailHelp" class="form-text" style="color:red;">${getError(errors, "email")}</div>
                        </div>
                        <div class="mb-3">
                            <label for="password-input" class="form-label">Password</label>
                            <input type="password" class="form-control" name="password">
                            <div id="passwordHelp" class="form-text" style="color:red;">${getError(errors, "password")}</div>
                        </div>
                        <div class="mb-3">
                            <label for="password-input" class="form-label">Password confirm</label>
                            <input type="password" class="form-control" name="passwordConfirm">
                            <div id="passwordConfirmHelp" class="form-text" style="color:red;">${getError(errors, "passwordConfirm")}</div>
                        </div>
                        <button type="submit" class="btn btn-primary">Signup</button>
                        <a href="/login">Have an account? Login</a>
                    </form>
                </div>
            </div>
        `
    })
};