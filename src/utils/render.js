const Handlebars = require('handlebars')
const { render } = require('consolidate').handlebars


module.exports = function renderTemplate() {
    return async (files, metalsmith, done) => {
        const fileNames = Object.keys(files)
        const data = metalsmith.metadata()
        for (let i = 0; i < fileNames.length; i++) {
            let content = files[fileNames[i]].contents.toString()
            if (/{{([^{}]+)}}/g.test(content)) {
                content = await render(content, data)
                // console.error(`[${fileNames[i]}] ${err.message}`)
                files[fileNames[i]].contents = Buffer.from(content)
            }
        }
        done()
    }
}
