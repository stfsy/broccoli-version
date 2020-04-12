'use strict'

const fileSystem = require('fs-promise')
const Version = require('./version')

module.exports = class Incrementer {

    constructor(targets) {

        this._targets = targets
    }

    handles(path) {
        return this._targets.find(target => target == path) !== undefined
    }

    incrementVersion(content) {
        const json = JSON.parse(content.toString('utf-8'))
        json.version = this._version.toString()
        return JSON.stringify(json)
    }

    readVersion() {
        return fileSystem.readJson(this._targets[0]).then((result) => {
           return this._version = new Version(result.version)
        })
    }
}