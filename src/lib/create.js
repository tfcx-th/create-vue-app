const ora = require('ora')
const inquirer = require('inquirer')
const axios = require('axios')
const { promisify } = require('util')
const downloadGit = promisify(require('download-git-repo'))

const { downloadDir } = require('../constant')

const repoListUrl = 'https://api.github.com/orgs/vuejs-templates/repos'

const fetchRepoList = async url => {
    const spinner = ora('fetching template, please wait ...')
    spinner.start()
    let { data } = await axios.get(url)
    data = data.map(item => item.name)
    spinner.succeed('fetch repos list success')
    return data
}

const fetchRepoTags = async repo => {
    const spinner = ora('fetching repo tags, please wait ...')
    spinner.start()
    let { data } = await axios.get(`https://api.github.com/repos/vuejs-templates/${repo}/tags`)
    data = data.map(item => item.name)
    spinner.succeed('fetch repo tags success')
    return data
}

const download = async (repo, tag) => {
    let api = `vuejs-templates/${repo}`
    if (tag) {
        api += `#${tag}`
    }
    const dir = `${downloadDir}/${repo}`
    await downloadGit(api, dir)
    return dir
}

async function create(name, options) {
    const repos = await fetchRepoList(repoListUrl)
    const { repo } = await inquirer.prompt({
        name: 'repo',
        type: 'list',
        message: 'please choose a template to create your project',
        choices: repos
    })
    const tags = await fetchRepoTags(repo)
    const { tag } = await inquirer.prompt({
        name: 'tag',
        type: 'list',
        message: 'please choose a template tag to create your project',
        choices: tags
    })
    const dir = await download(repo, tag)
    console.log(dir)
}

module.exports = (...args) => create(...args)
