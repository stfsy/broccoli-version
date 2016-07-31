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

        fileSystem.writeJson(resolve('test/test.package.json'), {version: '1.2.3'})
    })

    it('should read the version from a given target .json file', (done) => {

        incrementer.readVersion().then((version) => {

            expect(version.toString()).to.equal('1.2.3')

        }).then(done, done)
    })

    it('should persist an increment version number', (done) => {

        incrementer.readVersion().then((version) => {

            version.major(true)

        }).then(incrementer.persistAll.bind(incrementer))
          .then(incrementer.readVersion.bind(incrementer))
          .then((version) => {

            expect(version.toString()).to.equal('2.0.0')

        }).then(done, done)
    })
})
