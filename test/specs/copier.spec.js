'use strict'

const Copier = require('../../lib/Copier')

const expect = require('chai').expect
const resolve = require('path').resolve

const fileSystem = require('fs-promise')

describe('Copier', () => {

    let copier = null

    beforeEach(() => {

        copier = new Copier()
    })

    it('should copy files to another directory', (done) => {

        let testContentsLength = null

        fileSystem.mkdirs(resolve('.tmp')).then(() => {

            testContentsLength = fileSystem.readdirSync(resolve('test')).length

            return copier.copyDirs([resolve('test')], resolve('.tmp'))

        }).then(() => {

            const contentsLength = fileSystem.readdirSync(resolve('.tmp')).length

            expect(contentsLength).to.equal(testContentsLength)
            return fileSystem.remove(resolve('.tmp'))

        }).then(done, done)
    })
})