'use strict'

const fileSystem = require('fs-promise')

module.exports = class Copier {

    copyDirs(srcs, dest) {

        const promises = []

        srcs.forEach((src) => {

            promises.push(this.copyDir(src, dest))
        })

        return Promise.all(promises)
    }

    copyDir(src, dest) {

        const promises = []

        return fileSystem.readdir(src).then((dirContents) => {

            dirContents.forEach((dirContent) => {

                promises.push(fileSystem.copy([src, dirContent].join('/'), [dest, dirContent].join('/'), { clobber: true }))
            })

            return Promise.all(promises)
        })
    }
}
