'use strict'

const Incrementer = require('../../lib/incrementer')

const expect = require('chai').expect
const resolve = require('path').resolve

const fileSystem = require('fs-promise')

describe('Incrementer', () => {

    let incrementer = null

    beforeEach(() => {

        incrementer = new Incrementer([resolve('test/test.package.json')])
    })

    afterEach(() => {

        fileSystem.writeJsonSync(resolve('test/test.package.json'), { version: '1.2.3' })
        fileSystem.writeJsonSync(resolve('test/test.package.withBuildMeta.json'), { version: '1.4.15+beta14-ABC' })
    })

    it('should read the version from a given target .json file', (done) => {

        incrementer.readVersion().then((version) => {

            expect(version.toString()).to.equal('1.2.3')

        }).then(done, done)
    })

    it('should persist an incremented version number', (done) => {

        incrementer.readVersion().then((version) => {

            version.major(true)

        }).then(incrementer.persistAll.bind(incrementer))
            .then(incrementer.readVersion.bind(incrementer))
            .then((version) => {

                expect(version.toString()).to.equal('2.0.0')

            }).then(done, done)
    })

    it('should persist an incremented version number without build number if no build function was given', (done) => {

        incrementer = new Incrementer([resolve('test/test.package.withBuildMeta.json')])

        incrementer.readVersion().then((version) => {

            version.major(true).meta()

        }).then(incrementer.persistAll.bind(incrementer))
            .then(incrementer.readVersion.bind(incrementer))
            .then((version) => {

                expect(version.toString()).to.equal('2.0.0')

            }).then(done, done)
    })
})
