const mainConfig = require('../../../tailwind.config.cjs')
module.exports = {
    ...mainConfig,
    content: [
        "../**/*.svelte",
    ],
}