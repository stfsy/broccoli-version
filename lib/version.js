'use strict'

module.exports = class Version {

    constructor(version) {

        const split = version.split('.')

        this.majorVersion = parseInt(split[0])
        this.minorVersion = parseInt(split[1] || 0)
        this.patchVersion = parseInt(split[2] || 0)
    }

    patch(increment) {

        if (increment === undefined || increment) {

            this.patchVersion += 1
        }

        return this
    }

    minor(increment) {

        if (increment === undefined || increment) {

            this.minorVersion += 1
            this.patchVersion = 0
        }

        return this
    }

    major(increment) {

        if (increment === undefined || increment) {

            this.majorVersion += 1
            this.minorVersion = 0
            this.patchVersion = 0
        }

        return this
    }

    toString() {

        return [this.majorVersion, this.minorVersion, this.patchVersion].join('.')
    }
}
