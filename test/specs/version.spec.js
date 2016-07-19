'use strict'

const Version = require('../../lib/Version')
const expect = require('chai').expect

describe('Version', () => {

    let semver = null
    let version = null

    beforeEach(() => {

        semver = '0.0.1'
        version = new Version(semver)
    })

    it('should parse a valid semver string', () => {

        expect(version.toString()).to.equal(semver)
    })

    it('should increment the patch level', () => {

        expect(version.patch().toString()).to.equal('0.0.2')
    })

    it('should increment the patch level', () => {

        expect(version.patch(true).toString()).to.equal('0.0.2')
    })

    it('should increment the patch level', () => {

        expect(version.patch(true).minor(false).toString()).to.equal('0.0.2')
    })

    it('should increment the patch level', () => {

        expect(version.patch(true).minor(false).major(false).toString()).to.equal('0.0.2')
    })

    it('should increment the minor level', () => {

        expect(version.minor().toString()).to.equal('0.1.0')
    })

    it('should increment the minor level', () => {

        expect(version.minor(true).toString()).to.equal('0.1.0')
    })

    it('should increment the minor level', () => {

        expect(version.patch(false).minor(true).toString()).to.equal('0.1.0')
    })

    it('should increment the minor level', () => {

        expect(version.patch(false).minor(true).major(false).toString()).to.equal('0.1.0')
    })

    it('should increment the major level', () => {

        expect(version.major().toString()).to.equal('1.0.0')
    })

    it('should increment the major level', () => {

        expect(version.major(true).toString()).to.equal('1.0.0')
    })

    it('should increment the major level', () => {

        expect(version.patch(false).minor(true).major(true).toString()).to.equal('1.0.0')
    })
})