'use strict'

const Version = require('../../lib/version')
const expect = require('chai').expect

describe('Version', () => {

    let semver = null
    let versionWithBuildMeta = null
    let version = null

    beforeEach(() => {

        semver = '0.0.1'
        version = new Version(semver)
        versionWithBuildMeta = new Version(semver + '+415-beta')
    })

    it('should parse a valid semver string', () => {

        expect(version.toString()).to.equal(semver)
    })

    it('should parse a valid semver string with build metadata', () => {

        expect(versionWithBuildMeta.toString()).to.equal(semver)
    })

    it('should not increment the patch level', () => {

        expect(version.patch(undefined).toString()).to.equal('0.0.1')
    })

    it('should increment the patch level and not append build data', () => {

        expect(versionWithBuildMeta.patch(true).toString()).to.equal('0.0.2')
    })

    it('should call back with correct major, minor patch und meta data values', () => {

        versionWithBuildMeta.meta((version) => {

            expect(version.major).to.equal(0)
            expect(version.minor).to.equal(0)
            expect(version.patch).to.equal(1)
            expect(version.meta).to.equal('415-beta')
        })
    })

    it('should only not update any part of the version string', () => {

        expect(versionWithBuildMeta.meta().toString()).to.equal('0.0.1')
    })

    it('should only update build meta data', () => {

        expect(versionWithBuildMeta.meta(() => {

            return 'beta413'

        }).toString()).to.equal('0.0.1' + '+beta413')
    })

    it('should increment the patch level', () => {

        expect(version.patch(true).toString()).to.equal('0.0.2')
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

    it('should not increment the minor level', () => {

        expect(version.minor(undefined).toString()).to.equal('0.0.1')
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

    it('should not increment the major level', () => {

        expect(version.major(undefined).toString()).to.equal('0.0.1')
    })

    it('should increment the major level', () => {

        expect(version.major(true).toString()).to.equal('1.0.0')
    })

    it('should increment the major level', () => {

        expect(version.patch(false).minor(true).major(true).toString()).to.equal('1.0.0')
    })
})