const path = require('path')
const fs = require('fs')
const ncp = require('ncp')
const Metalsmith = require('metalsmith')
// const { render } = require('consolidate').handlebars

const getOptions = require('../utils/option')
const askUserQuestions = require('../utils/ask')

/**
 * 用于从下载好的模板渲染出实际文件
 * @param {String} name 项目名
 * @param {String} to 目标文件夹位置
 * @param {String} srcDir 模板文件夹位置
 */
module.exports = async function generate(name, toDir, srcDir) {
    // 如果模板不存在 meta.js，则直接复制
    if (!fs.existsSync(path.join(srcDir, 'meta.js'))) {
        await ncp(srcDir, toDir)
    }
    const opts = getOptions(name, srcDir)
    const templateFilesDir = path.join(srcDir, 'template')
    const metalsmith = Metalsmith(templateFilesDir)
    Object.assign(metalsmith.metadata(), {
        destDirName: name,
        inPlace: toDir === process.cwd()
    })
    metalsmith
        .source(srcDir)
        .destination(toDir)
        .use(askUserQuestions(opts.prompts))
        .build(err => {
            if (err) console.error(err)
            console.log()
        })
}
