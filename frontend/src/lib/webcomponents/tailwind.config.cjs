const mainConfig = require('../../../tailwind.config.cjs')
const production = !process.env.ROLLUP_WATCH
module.exports = {
    ...mainConfig,
    content: [
        "../**/*.svelte",
    ],
}