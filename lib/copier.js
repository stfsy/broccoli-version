'use strict'

const fileSystem = require('fs-promise')

module.exports = class Copier {

    copy(src, dest) {

        const promises = []

        return fileSystem.readdir(src).then((dirContents) => {

            dirContents.forEach((dirContent) => {

                promises.push(fileSystem.copy([src, dirContent].join('/'), [dest, dirContent].join('/'), { clobber: true }))
            })

            return Promise.all(promises)
        })
    }
}
