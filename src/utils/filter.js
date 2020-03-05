const chalk = require('chalk')
const match = require('minimatch')

function evaluate(exp, data) {
    /* eslint-disable no-new-func */
    const fn = new Function('data', `with (data) { return ${exp}}`)
    try {
        return fn(data)
    } catch (e) {
        console.error(chalk.red(`Error when evaluating filter condition: ${exp}`))
    }
}

module.exports = function filterFile(filters) {
    return (files, metalsmith, done) => {
        const data = metalsmith.metadata()
        const fileNames = Object.keys(files)
        Object.keys(filters).forEach(rule => {
            fileNames.forEach(file => {
                if (match(file, rule, { dot: true })) {
                    const condition = filters[rule]
                    if (!evaluate(condition, data)) {
                        delete files[file]
                    }
                }
            })
        })
        done()
    }
}
