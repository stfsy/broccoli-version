'use strict'

const Incrementer = require('../../lib/incrementer')

const expect = require('chai').expect
const resolve = require('path').resolve

const fileSystem = require('fs-promise')

describe('Incrementer', () => {

    let incrementer = null

    beforeEach(() => {
        incrementer = new Incrementer([resolve('test/test.package.json')])
        return incrementer.readVersion()
    })

    afterEach(() => {
        fileSystem.writeJsonSync(resolve('test/test.package.json'), { version: '1.2.3' })
        fileSystem.writeJsonSync(resolve('test/test.package.withBuildMeta.json'), { version: '1.4.15+beta14-ABC' })
    })

    describe('.readVersion', () => {
        it('should read the version from a given target .json file', (done) => {
            incrementer.readVersion().then((version) => {
                expect(version.toString()).to.equal('1.2.3')
            }).then(done, done)
        })
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
            const json = incrementer.incrementVersion('{"version": "123"}')
            expect(JSON.parse(json).version).to.equal('1.2.3')
        })
    })
})
