const program = require('commander')
const chalk = require('chalk')

const { version } = require('./constant')

const create = require('./lib/create')

program
    .version(`create-vue-app version-${version}`)

program
    .command('create <app-name>')
    .alias('c')
    .description('create a new vue project powered by create-vue-app')
    .action((name, command) => {
        if (process.argv.slice(3).length > 1) {
            console.log()
            console.log(chalk.yellow('More than one argument. The first one will be used as the app\'s name, the rest are ignored.'))
            console.log()
        }
        create(name, command)
    })

program
    .arguments('<command>')
    .action(command => {
        console.log()
        console.log(`    ${chalk.red(`Unkown command ${command}`)}`)
        console.log()
        program.outputHelp()
    })

program.on('--help', () => {
    console.log()
    console.log(`Run ${chalk.cyan('cvapp <command> --help')} for more detail of given commands`)
    console.log()
})

program.commands.forEach(c => c.on('--help', () => console.log()))

// 解析命令行参数
program.parse(process.argv)
