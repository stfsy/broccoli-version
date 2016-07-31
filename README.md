# Broccoli Version Plugin

[![Build Status](https://travis-ci.org/stfsy/broccoli-version.svg)](https://travis-ci.org/stfsy/broccoli-version)
[![Dependency Status](https://img.shields.io/david/stfsy/broccoli-version.svg)](https://github.com/stfsy/broccoli-version/blob/master/package.json)
[![DevDependency Status](https://img.shields.io/david/dev/stfsy/broccoli-version.svg)](https://github.com/stfsy/broccoli-version/blob/master/package.json)
[![Npm downloads](https://img.shields.io/npm/dm/broccoli-version.svg)](https://www.npmjs.com/package/broccoli-version)
[![Npm Version](https://img.shields.io/npm/v/broccoli-version.svg)](https://www.npmjs.com/package/broccoli-version)
[![Git tag](https://img.shields.io/github/tag/stfsy/broccoli-version.svg)](https://github.com/stfsy/broccoli-version/releases)
[![Github issues](https://img.shields.io/github/issues/stfsy/broccoli-version.svg)](https://github.com/stfsy/broccoli-version/issues)
[![License](https://img.shields.io/npm/l/broccoli-version.svg)](https://github.com/stfsy/broccoli-version/blob/master/LICENSE)

Broccoli plugin for incrementing version numbers in bower.json and package.json files

## Example

```js
const BroccoliVersion = require('broccoli-version')

const versioned = new BroccoliVersion('app', {
    major: false,
    minor: false,
    patch: true,
    meta: (options) => {
        if(!options.major && !options.minor && !options.patch) {
            return options.meta += 1
        } else {
            return 0
        }
    }
    targets: {
        npm: true,
        bower: false
    }
})

module.exports = versioned
```

## Example incrementing daily builds

```js
const BroccoliVersion = require('broccoli-version')

const versioned = new BroccoliVersion('app', {
    meta: (options) => {
        let builds = 0
            
        const now = new Date()
        const string = [now.getFullYear(), now.getMonth() + 1, now.getDay()].join('')

        if (options.meta && options.meta.indexOf(string) > -1) {
            builds = parseInt(options.meta.split('-')[1])
        }

        return [string, ++builds].join('-')
    },
    targets: {
        npm: true,
        bower: false
    }
})

module.exports = versioned
```

## Installation
```js
npm install broccoli-version --save-dev
```

## Documentation

### `new BroccoliVersion(inputNodes, options)`

* `inputNodes`: An array of input nodes, or a string pointing to a folder.

* `options`:

    * `major`, `minor`, `patch`: Boolean flags specifying what parts of the version number should be incremented.

    * `meta`: An optional function returning additional build metadata. The function is called with the three boolean flags mentioned above plus the current value of the build meta data or null. Build meta data is appended to the version with a leading '+'.

    * `targets`: An object specifying what configuration files should be updated. Needs at least npm set to true.

The returned output node contains umodified copies of all files and subfolders of the input nodes.

## License

This project is distributed under the MIT license.