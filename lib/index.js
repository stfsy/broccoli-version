'use strict'

const BroccoliPlugin = require('broccoli-plugin')

const Incrementer = require('./incrementer')
const Copier = require('./copier')

module.exports = class BroccoliVersion extends BroccoliPlugin {

    constructor(inputNodes, options) {
        super(Array.isArray(inputNodes) ? inputNodes : [inputNodes], options)

        const holders = []

        options.targets && options.targets.npm && holders.push('./package.json')
        options.targets && options.targets.bower && holders.push('./bower.json')

        this._copier = new Copier()
        this._incrementer = new Incrementer(holders)

        this._incrementer.readVersion().then((version) => {

            version.patch(options.patch)
                .minor(options.minor)
                .major(options.major)
                .meta((version) => {

                    if (options.meta) {
                        return options.meta.call(null, { 
                            patch: options.patch, 
                            minor: options.minor, 
                            major: options.major, 
                            meta: version.meta 
                        })
                    }
                })

        }).catch((error) => {

            console.log('Can\'t read version from target. Proceeding anyways.')
        })
    }

    build() {

        return this._copier.copyDirs(this._inputPaths, this._outputPath).then(() => {

            return this._incrementer.persistAll().catch((error) => {

                console.log('Can\'t update version on target. Proceeding anyways.')
            })

        }, (error) => {

            return Promise.reject('Can\'t move inputNodes to outputPath')
        })
    }
}