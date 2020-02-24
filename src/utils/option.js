const path = require('path')
const exec = require('child_process').execSync

// 从 meta.js 中获取配置项
function getMetaData(dir) {
    const metaJs = path.join(dir, 'meta.js')
    const opts = require(metaJs)
    return opts
}

function setDefault(opts, key, val) {
    const { prompts } = opts
    if (!prompts[key] || typeof prompts[key] !== 'object') {
        prompts[key] = {
            type: 'string',
            default: val
        }
    } else {
        prompts[key].default = val
    }
}

function getGitUser() {
    let name
    try {
        name = exec('git config --get user.name')
    } catch (err) {
        console.error(err)
    }
    name = name && JSON.stringify(name.toString().trim()).slice(1, -1)
    return name
}

module.exports = function getOptions(name, dir) {
    const opts = getMetaData(dir)
    setDefault(opts, 'name', name)
    const userName = getGitUser()
    setDefault(opts, 'author', userName)
    return opts
}
