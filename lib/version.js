'use strict'

module.exports = class Version {

    constructor(semanticVersion) {

        const split = semanticVersion.split('+')

        const version = split[0].split('.')
        const meta = split[1]

        this._majorVersion = parseInt(version[0])
        this._minorVersion = parseInt(version[1] || 0)
        this._patchVersion = parseInt(version[2] || 0)

        this._previousBuildMetaData = meta || null
    }

    patch(increment) {
        if (increment) {
            this._patchVersion += 1
        }

        return this
    }

    minor(increment) {
        if (increment) {
            this._minorVersion += 1
            this._patchVersion = 0
        }

        return this
    }

    major(increment) {
        if (increment) {
            this._majorVersion += 1
            this._minorVersion = 0
            this._patchVersion = 0
        }

        return this
    }

    meta(fn) {
        if (typeof fn === 'function') {
            this._buildMetaData = fn.call(null, {
                major: this._majorVersion,
                minor: this._minorVersion,
                patch: this._patchVersion,
                meta: this._previousBuildMetaData
            })
        } else {
            this._buildMetaData = null
        }

        return this
    }

    toString() {
        let semVersion = [this._majorVersion, this._minorVersion, this._patchVersion].join('.')
        if (this._buildMetaData) {
            semVersion += '+' + this._buildMetaData
        }

        return semVersion
    }
}
