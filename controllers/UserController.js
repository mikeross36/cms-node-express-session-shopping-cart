"use strict"
const crypto = require("crypto")
const MainController = require("./mainController");
const util = require("util")
const scryptAsync = util.promisify(crypto.scrypt)

class UserController extends MainController {
    
    async createOne(user) {
        user.id = this.getRandomId();
        
        const salt = crypto.randomBytes(8).toString("hex")
        const hashedPassword = await scryptAsync(user.password, salt, 64)

        const records = await this.getAll()
        const record = {
            ...user,
            password: `${hashedPassword.toString("hex")}.${salt}`
        }
        records.push(record)

        await this.setAll(records)
        return record;
    }

    async comparePasswords(userPassword, loginPassword) {
        const [hashedPassword, salt] = userPassword.split(".");
        const hashedLoginPasseword = await scryptAsync(loginPassword, salt, 64);

        return hashedPassword === hashedLoginPasseword.toString("hex");
    }
};

module.exports = new UserController("users.json")