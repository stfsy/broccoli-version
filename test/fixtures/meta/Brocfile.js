const BroccoliVersion = require('../../../lib/index.js')

const versioned = new BroccoliVersion('app', {
    patch: true,
    meta: (version) => {
        console.log('Brocfile meta fn called')
        return new Date().toISOString().split('T')[0]
    },
    targets: {
        npm: true
    }
})

module.exports = versioned