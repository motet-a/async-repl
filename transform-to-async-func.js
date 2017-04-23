
const { transform } = require('babel-core')

const implicitReturnPlugin = require('babel-plugin-transform-implicit-return')

function removeTrailingSemicolon(s) {
    return s.endsWith(';') ? s.slice(0, -1) : s
}

// code: Source code string
// options: Babel options
// Returns { code, codeWithoutSemicolon, map, ast }
function transformToAsyncFunc(code, options = {}) {
    const wrappedCode =
        'async () => {' +
        "'implicitReturn';\n" +
        'void 0;\n' + // If the given code is a literal string,
                      // it must not be considered as a directive
                      // and must be returned.
        code +
        '\n}'

    const plugins = [implicitReturnPlugin].concat(options.plugins || [])
    const newOptions = Object.assign({}, options, {
        plugins,
    })

    const result = transform(wrappedCode, newOptions)
    result.codeWithoutSemicolon = removeTrailingSemicolon(result.code)
    return result
}

module.exports = transformToAsyncFunc
