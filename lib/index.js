'use strict'

const BroccoliPluginAdapter = require('broccoli-plugin-adapter')
const Incrementer = require('./incrementer')

module.exports = class BroccoliVersion extends BroccoliPluginAdapter {

    constructor(inputNodes, options) {
        super(Array.isArray(inputNodes) ? inputNodes : [inputNodes], options)

        const holders = []

        options.targets && options.targets.npm && holders.push('./package.json')
        options.targets && options.targets.bower && holders.push('./bower.json')

        this._incrementer = new Incrementer(holders, options)
    }

    handleContent(path, content) {
        if (this._incrementer.handles(path)) {
            content = this._incrementer.incrementVersion(content)
        }
        return content
    }
}