'use strict'

const BroccoliPlugin = require('broccoli-plugin')

const Incrementer = require('./incrementer')
const Copier = require('./copier')

module.exports = class BroccoliVersion extends BroccoliPlugin {

    constructor(inputNodes, options) {
        super([inputNodes], options)

        const holders = []

        options.targets && options.targets.npm && holders.push('./package.json')
        options.targets && options.targets.bower && holders.push('./bower.json')

        this.copier = new Copier()
        this.incrementer = new Incrementer(holders)

        this.incrementer.readVersion().then((version) => {

            version.patch(options.patch).minor(options.minor).major(options.major)

        }).catch((error) => {

            console.log('Can\'t read version from target. Proceeding anyways.')
        })
    }

    build() {

        return this.copier.copy(this.inputPaths[0], this.outputPath).then(() => {

            return this.incrementer.persistAll().catch((error) => {

                console.log('Can\'t update version on target. Proceeding anyways.')
            })

        }, (error) => {

            return Promise.reject('Can\'t move inputNodes to outputPath')
        })
    }
}