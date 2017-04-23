
# async-repl

Say goodbye to `Promise { <pending> }` in REPLs, this one supports
`async` and `await`!.

Example:

```javascript
$ npm start
> 123
123
> await 123
123
> Promise.resolve('a')
'a'
> await Promise.resolve('a')
'a'
> Promise.reject(new Error('oops'))
Error: oops
    at repl:3:25
    at REPLServer.eval (/home/antoine/cs/async-repl/index.js:17:9)
    at bound (domain.js:280:14)
    at REPLServer.runBound [as eval] (domain.js:293:12)
    at REPLServer.onLine (repl.js:536:10)
    at emitOne (events.js:96:13)
    at REPLServer.emit (events.js:191:7)
    at REPLServer.Interface._onLine (readline.js:241:10)
    at REPLServer.Interface._line (readline.js:590:8)
    at REPLServer.Interface._ttyWrite (readline.js:869:14)
> wait = delay => new Promise(resolve => setTimeout(resolve, delay))
[Function: wait]
> waitASecond = () => wait(1000)
[Function: waitASecond]
> log = console.log
[Function: bound log]
> log('a'); await waitASecond(); log('b'); await waitASecond(); log('c')
a
b
c
undefined
```

You can declare `async` function with many `await` statements inside,
use `Promise.all` and `Promise.race` and so on.

*Warning: This is a quick and dirty experiment, not a really usable
program or library.*

## Gotchas

Currently, variable declaration doesn’t works as expected. But global
variable declations are implicit (use `a = 123` instead of `var a =
123` or `const a = 123`). See the next section to understand why.

## How does it works?

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
handle semicolons and add a `return` statement at the end of the async
function)
