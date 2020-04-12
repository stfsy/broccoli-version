'use strict'

const Incrementer = require('../../lib/incrementer')

const expect = require('chai').expect
const resolve = require('path').resolve

describe('Incrementer', () => {

    let incrementer = null

    beforeEach(() => {
        incrementer = new Incrementer([resolve('test/test.package.json')], { major: true })
    })

    describe('.handles', () => {
        it('should return true if holder file is passed', () => {
            const handles = incrementer.handles([resolve('test/test.package.json')])
            expect(handles).to.be.true
        })
        it('should return true if holder path does not match', () => {
            const handles = incrementer.handles([resolve('test/test.package.json-suffix123')])
            expect(handles).to.be.false
        })
    })

    describe('incrementVersion', () => {
        it('should increment version and return stringified json', () => {
            const json = incrementer.incrementVersion('{"version": "1.2.3"}')
            expect(JSON.parse(json).version).to.equal('2.0.0')
        })
    })
})
