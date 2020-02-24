const fs = require('fs')
const ora = require('ora')
const download = require('download-git-repo')

const downloadDir = `${process.env[process.platform === 'darwin' ? 'HOME' : 'USERPROFILE']}/.cvapp_template`

module.exports = async function downloadTemplate(repo, tag) {
    // 查找本地是否存在，不存在则从远程下载
    const templateDir = `${downloadDir}/${repo}-${tag}`
    if (!fs.existsSync(templateDir)) {
        const spinner = ora('downloading template, please wait ...')
        spinner.start()
        try {
            await download(`vuejs-templates/${repo}#${tag}`, templateDir)
            spinner.succeed('download success')
        } catch (err) {
            spinner.fail('download failed')
            console.error(err)
        }
    } else {
        console.log(`copy from local directory ${templateDir}`)
    }
    return templateDir
}
