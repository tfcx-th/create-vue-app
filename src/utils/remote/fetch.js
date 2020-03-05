const ora = require('ora')
const axios = require('axios')
const inquirer = require('inquirer')

async function fetchRepoList() {
    const repoListUrl = 'https://api.github.com/orgs/vuejs-templates/repos'
    const spinner = ora('fetching official template, please wait ...')
    spinner.start()
    let { data } = await axios.get(repoListUrl)
    data = data.map(item => item.name)
    spinner.succeed('fetch official repos list success')
    const { repo } = await inquirer.prompt({
        name: 'repo',
        type: 'list',
        message: 'please choose a template to create your project',
        choices: data
    })
    return repo
}

async function fetchRepoTags(repo) {
    const repoTagsUrl = `https://api.github.com/repos/vuejs-templates/${repo}/tags`
    const spinner = ora('fetching template tags, please wait ...')
    spinner.start()
    let { data } = await axios.get(repoTagsUrl)
    if (data.length === 0) {
        spinner.succeed('only one version')
        return undefined
    }
    data = data.map(item => item.name)
    spinner.succeed('fetch template tags success')
    const { tag } = await inquirer.prompt({
        name: 'tag',
        type: 'list',
        message: 'please choose a template tag to create your project',
        choices: data
    })
    return tag
}

module.exports = {
    fetchRepoList,
    fetchRepoTags
}
