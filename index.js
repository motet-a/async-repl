
const repl = require('repl')
const vm = require('vm')

const transformToAsyncFunc = require('./transform-to-async-func')

repl.start({
    eval(code, context, filename, callback) {
        const func = vm.runInContext(
            transformToAsyncFunc(code).codeWithoutSemicolon,
            context,
            {
                filename,
            }
        )

        func()
            .then(result => callback(null, result))
            .catch(error => callback(error))
    },
})
