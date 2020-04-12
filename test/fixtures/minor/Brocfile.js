const BroccoliVersion = require('../../../lib/index.js')

const versioned = new BroccoliVersion('app', {
    minor: true,
    targets: {
        npm: true
    }
})

module.exports = versioned