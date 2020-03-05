const path = require('path')
const fs = require('fs')
const ncp = require('ncp')
const Metalsmith = require('metalsmith')
const Handlebars = require('handlebars')

const getOptions = require('../utils/option')
const askUserQuestions = require('../utils/ask')
const filterFiles = require('../utils/filter')
const renderTemplate = require('../utils/render')

// register handlebars helper
Handlebars.registerHelper('if_eq', function (a, b, opts) {
    return a === b
        ? opts.fn(this)
        : opts.inverse(this)
})

Handlebars.registerHelper('unless_eq', function (a, b, opts) {
    return a === b
        ? opts.inverse(this)
        : opts.fn(this)
})

/**
 * 用于从下载好的模板渲染出实际文件
 * @param {String} name 项目名
 * @param {String} toDir 目标文件夹位置
 * @param {String} srcDir 模板文件夹位置
 */
module.exports = async function generate(name, toDir, srcDir) {
    // 如果模板不存在 meta.js，则直接复制
    if (!fs.existsSync(path.join(srcDir, 'meta.js'))) {
        await ncp(path.join(srcDir, 'template'), toDir)
        return
    }
    const opts = getOptions(name, srcDir)
    const templateFilesDir = path.join(srcDir, 'template')
    const metalsmith = Metalsmith(templateFilesDir)
    Object.assign(metalsmith.metadata(), {
        destDirName: name,
        inPlace: toDir === process.cwd()
    })
    if (opts.helpers) {
        const helpers = Object.keys(opts.helpers)
        helpers.map(helper => Handlebars.registerHelper(helper, opts.helpers[helper]))
    }
    metalsmith
        .source(templateFilesDir)
        .destination(toDir)
        .use(askUserQuestions(opts.prompts))
        .use(filterFiles(opts.filters))
        .use(renderTemplate())
        .build(err => {
            if (err) console.error(err)
            console.log()
        })
}
