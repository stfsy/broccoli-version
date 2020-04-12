'use strict'

const BroccoliRunner = require('broccoli-test-runner')

const fs = require('fs')
const rimraf = require('rimraf')
const expect = require('chai').expect

const addTestFlowWithExpectation = (folder, expectation) => {
    let runner = null
    before(() => {
        runner = new BroccoliRunner(folder)
        return runner.build()
    })
    after(() => {
        return runner.stop()
    })
    after(() => {
        return new Promise(resolve => {
            rimraf(folder + '/dist', resolve)
        })
    })
    it('increments the ' + folder.split('/')[2] + ' version', () => {
        const json = JSON.parse(fs.readFileSync(folder + '/dist/package.json'))
        expect(json.version).to.equal(expectation)
    })
}

describe('BroccoliVersion', () => {
    describe('.major', () => {
        addTestFlowWithExpectation('test/fixtures/major', '2.0.0')
    })
    describe('.minor', () => {
        addTestFlowWithExpectation('test/fixtures/minor', '1.3.0')
    })
    describe('.patch', () => {
        addTestFlowWithExpectation('test/fixtures/patch', '1.2.4')
    })
    describe('.meta', () => {
        addTestFlowWithExpectation('test/fixtures/meta', '1.2.4+' + new Date().toISOString().split('T')[0])
    })
})
