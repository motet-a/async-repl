
# async-repl

Say goodbye to `Promise { <pending> }` in REPLs, this one supports
`async` and `await`!.

Example:

```javascript
$ npm start
> await 123
123
> Promise.resolve('a')
'a'
> await Promise.resolve('a')
'a'
> wait = delay => new Promise(resolve => setTimeout(resolve, delay))
[Function: wait]
> log = console.log
[Function: bound log]
> log('a'); await wait(1000); log('b'); await wait(1000); log('c')
a
b
c
undefined
```

You can declare `async` functions with many `await` statements inside,
use `Promise.all` and `Promise.race` and so on.

*Warning: This is a quick and dirty experiment, not a really usable
program or library.*

## Gotchas

Currently, variable declaration doesn’t work as expected. But global
variable declations are implicit (use `a = 123` instead of `var a =
123` or `const a = 123`). See the next section to understand why.

## How does it work?

When you type `await 123` in the REPL, it is transformed to something
like `(async () => await 123)()`. Then, it is evaluated and the value
of the returned promise is displayed.

Since every input line is wrapped inside a function with a local
scope, variables declarations are not shared with other _lines_. I
think the best way to avoid it is to transform variable declarations
into assignements to global variables, by removing the `var`, `let` or
`const` in the _root_ function. `const` variables could be mutated but
it’s not a big deal.

(In fact, things are a bit more complicated with a dirty Babel hack to
handle semicolons and to add a `return` statement at the end of the
async function)
