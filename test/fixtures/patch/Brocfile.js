const BroccoliVersion = require('../../../lib/index.js')

const versioned = new BroccoliVersion('app', {
    patch: true,
    targets: {
        npm: true
    }
})

module.exports = versioned