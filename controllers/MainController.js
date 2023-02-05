"use strict"
const fs = require("fs")
const crypto = require("crypto")

module.exports = class MainController {
    constructor(fileName) {
        if (!fileName) {
            throw new Error("Creating require a file name!")
        }
        this.fileName = fileName;

        try {
            fs.accessSync(this.fileName)
        }
        catch (error) {
            fs.writeFileSync(this.fileName, "[]")
        }
    };

    getRandomId() {
        return crypto.randomBytes(4).toString("hex")
    }

    async getAll() {
        return JSON.parse(await fs.promises.readFile(this.fileName, { encoding: "utf8" }))
    }

    async setAll(records) {
        await fs.promises.writeFile(this.fileName, JSON.stringify(records, null, 2))
    }

    async createOne(record) {
        record.id = this.getRandomId()

        const records = await this.getAll()
        records.push(record)

        await this.setAll(records)

        return record;
    };

    async getOne(id) {
        const records = await this.getAll()
        return records.find(record => record.id === id)
    };

    async deleteOne(id) {
        const records = await this.getAll()
        const remainRecs = records.filter(record => record.id !== id)

        await this.setAll(remainRecs)
    };

    async updateOne(id, props) {
        const records = await this.getAll()
        const record = records.find(item => item.id === id)

        if (!record) {
            throw new Error(`Record with id ${id} not found!`)
        }
        Object.assign(record, props);
        await this.setAll(records)
    };

    async getOneBy(obj) {
        const records = await this.getAll()

        for (let record of records) {
            let found = true;
            for (let key in obj) {
                if (obj[key] !== record[key]) {
                    found = false;
                }
            }
            if (found) return record;
        }
    }
};