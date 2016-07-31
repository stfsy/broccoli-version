'use strict'

const fileSystem = require('fs-promise')
const Version = require('./version')

module.exports = class Incrementer {

    constructor(targets) {

        this.targets = targets
    }

    persistAll() {

        const promises = []

        this.targets.forEach((target) => {

            promises.push(fileSystem.readJson(target).then((result) => {

                result.version = this.version.toString()

                return fileSystem.writeJson(target, result)
            }))
        })

        return Promise.all(promises)
    }

    readVersion() {

        return fileSystem.readJson(this.targets[0]).then((result) => {

           return this.version = new Version(result.version)
        })
    }
}