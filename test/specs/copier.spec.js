'use strict'

const Copier = require('../../lib/Copier')

const expect = require('chai').expect
const resolve = require('path').resolve

const fileSystem = require('fs-promise')

describe('Copier', () => {

    let copier = null

    console.log(process.cwd())
    console.log(resolve('test'))

    fileSystem.readdir(resolve('test')).then((contents) => {

        console.log(contents)
    })

    beforeEach(() => {

        copier = new Copier()
    })

    it('should copy files to another directory', (done) => {

       let testContentsLength = null

       fileSystem.mkdirs(resolve('.tmp')).then(()=> {

           return fileSystem.readdir(resolve('test'))

       }).then((contents) => {

          testContentsLength = contents.length

       }).then(() => {

         return copier.copy(resolve('test'),resolve('.tmp'))

       }).then(() => {

          return fileSystem.readdir(resolve('.tmp')) 

       }).then((contents) => {

          expect(contents.length).to.equal(testContentsLength)
          done()

       }).catch((error) => {

           done(error)
           
       }).then(() => {

           fileSystem.remove(resolve('.tmp'))
       })
    })
})