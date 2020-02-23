// 存放需要的常量

const { version } = require('../package.json')

const downloadDir = `${process.env[process.platform === 'darwin' ? 'HOME' : 'USERPROFILE']}/.cvapp_template`

module.exports = {
    version,
    downloadDir
}
