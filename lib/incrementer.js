'use strict'

const fs = require('fs')
const Version = require('./version')

module.exports = class Incrementer {

    constructor(targets, options) {
        this._targets = targets
        this._options = options
    }

    handles(path) {
        return this._targets.find(target => target == path) !== undefined
    }

    incrementVersion(content) {
        const json = JSON.parse(content.toString('utf-8'))
        json.version = this._incrementVersion(json.version)
        return JSON.stringify(json)
    }

    _incrementVersion(versionString) {
        return new Version(versionString)
            .patch(this._options.patch)
            .minor(this._options.minor)
            .major(this._options.major)
            .meta(this._options.meta)
            .toString()
    }
}