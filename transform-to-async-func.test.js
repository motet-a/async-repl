
const { assert } = require('chai')
const transformToAsyncFunc = require('./transform-to-async-func')

const transform = code => transformToAsyncFunc(code).codeWithoutSemicolon

describe('transformToAsyncFunc()', () => {
    it('works', () => {
        assert(
            transform('123') ===
`async () => {
  void 0;
  return 123;
}`
        )

        assert(
            transform('await 123') ===
`async () => {
  void 0;
  return await 123;
}`
        )
    })
})
