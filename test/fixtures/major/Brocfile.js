const BroccoliVersion = require('../../../lib/index.js')

const versioned = new BroccoliVersion('app', {
    major: true,
    targets: {
        npm: true
    }
})

module.exports = versioned