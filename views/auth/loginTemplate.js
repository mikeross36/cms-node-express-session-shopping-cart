"use strict"
const layout = require("../layouts/formLayout")
const { getError } = require("../../utils/getError")

module.exports = ({ errors }) => {
    return layout({
        content: `
            <div class="container py-3 mb-5">
                <br/>
                <div class="d-flex justify-content-center">     
                    <form method="POST" style="width: 20rem;">
                        <h1>Login</h1>
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
                        <button type="submit" class="btn btn-primary">Login</button>
                        <a href="/signup">Do not have aaccount? Signup</a>
                    </form>
                </div>
            </div>
        `
    })
};
