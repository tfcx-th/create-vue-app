const inquirer = require('inquirer')

async function createPrompt(data, key, prompt) {
    const answer = await inquirer.prompt({
        name: key,
        type: prompt.type,
        message: prompt.message,
        default: prompt.default,
        choices: prompt.choices || []
    })
    if (Array.isArray(answer[key])) {
        data[key] = {}
        answer[key].forEach(ans => {
            data[key][ans] = true
        })
    } else {
        data[key] = answer[key]
    }
}

async function ask(prompts, data, done) {
    const promptsKeys = Reflect.ownKeys(prompts)
    for (let i = 0; i < promptsKeys.length; i++) {
        await createPrompt(data, promptsKeys[i], prompts[promptsKeys[i]])
    }
    console.log(data)
    done()
}

module.exports = function askUserQuestions(prompts) {
    return (files, metal, done) => {
        ask(prompts, metal.metadata(), done)
    }
}
