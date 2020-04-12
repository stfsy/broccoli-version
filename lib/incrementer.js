'use strict'

const fileSystem = require('fs-promise')
const Version = require('./version')

module.exports = class Incrementer {

    constructor(targets) {

        this._targets = targets
    }

    persistAll() {

        const promises = []

        this._targets.forEach((target) => {

            promises.push(fileSystem.readJson(target).then((result) => {

                result.version = this._version.toString()

                return fileSystem.writeJson(target, result)
            }))
        })

        return Promise.all(promises)
    }

    readVersion() {

        return fileSystem.readJson(this._targets[0]).then((result) => {

           return this._version = new Version(result.version)
        })
    }
}