'use strict'

module.exports = class Version {

    constructor(semanticVersion) {

        const split = semanticVersion.split('+')

        const version = split[0].split('.')
        const meta = split[1]

        this.majorVersion = parseInt(version[0])
        this.minorVersion = parseInt(version[1] || 0)
        this.patchVersion = parseInt(version[2] || 0)

        this.previousBuildMetaData = meta || null
    }

    patch(increment) {

        if (increment) {

            this.patchVersion += 1
        }

        return this
    }

    minor(increment) {

        if (increment) {

            this.minorVersion += 1
            this.patchVersion = 0
        }

        return this
    }

    major(increment) {

        if (increment) {

            this.majorVersion += 1
            this.minorVersion = 0
            this.patchVersion = 0
        }

        return this
    }

    meta(fn) {

        if (typeof fn === 'function') {

            this.buildMetaData = fn.call(null, {
                major: this.majorVersion,
                minor: this.minorVersion,
                patch: this.patchVersion,
                meta: this.previousBuildMetaData
            })

        } else {

            this.buildMetaData = null
        }

        return this
    }

    toString() {

        let semVersion = [this.majorVersion, this.minorVersion, this.patchVersion].join('.')

        if (this.buildMetaData) {

            semVersion += '+' + this.buildMetaData
        }

        return semVersion
    }
}
