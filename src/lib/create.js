const path = require('path')

const { fetchRepoList, fetchRepoTags } = require('../utils/remote/fetch')
const downloadTemplate = require('../utils/remote/download')
const generate = require('../utils/generate')

async function create(name) {
    try {
        const repo = await fetchRepoList()
        const tag = await fetchRepoTags(repo)
        const templateDir = await downloadTemplate(repo, tag)
        await generate(name, path.resolve(name), templateDir)
    } catch (err) {
        console.error(err)
    }
}

module.exports = (...args) => create(...args)
