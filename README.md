# Broccoli Version Plugin

Broccoli plugin for incrementing version numbers in bower.json and package.json files

## Example


```js
    const BroccoliVersion = require('broccoli-version')

    const versioned = new BroccoliVersion(js, {
        major: false,
        minor: false,
        patch: true,
        targets: {
            npm: true,
            bower: false
        }
    })

    module.exports = versioned
```

## Documentation

### `new BroccoliVersion(inputNodes, options)`

* `inputNodes`: An array of input nodes.

* `options`:

    * `major`, `minor`, `patch`: Boolean flags specifying what parts of the version number should be incremented.

    * `targets`: An object specifying what configuration files should be updated.

The returned outputNodes are a copy of the supplied inputNodes.

## License

This project is distributed under the MIT license.