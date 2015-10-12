# Ifx?

ifx is a JavaScript module that provides if-expression to return a value.   
It can be alternative to conditional operator.  

## Example Usage  

Sorry, I had yet to register NPM.
To use it, please cloning this repository and put under node_modules.

- ES6 syntax (recommend)

```js
const If = require('ifx');

// stateless and readable to use ES6 arrow function
const x = If(false)(() => 1).ElseIf(true)(() => 2).Else(() => 3);  
console.log(x);
```

```js
const If = require('ifx');

// can be return value
const fn = value =>
  If(value instanceof Array)(() =>
      value.map(x => If(typeof x === 'number')(() => x * 5).Get())
  ).ElseIf(value instanceof Object)(() =>
      Object.keys(value)
  ).Else(() =>
      []
  ).filter(x => x !== null);

console.log(fn([1,2,null,3,4,5]));    // [ 5, 10, 15, 20, 25 ]
console.log(fn({a: 1, b: 2, c: 3}));  // [ 'a', 'b', 'c' ]
console.log(fn(2));                   // []
```

```js
const If = require('ifx');

function getFib(x) {
  const fn = (n, p, c) => If(n === 1)(() => p).Else(() => fn(--n, c, c + p));
  return If(x > 0)(() => fn(x, 0, 1)).Get();
}

console.log([0,1,2,3,4,5,6,7,8,9,10,11].map(i => getFib(i)));  // [ null, 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55 ]
```

- ES5 syntax

```js
var If = require('ifx');

var x = If(false)(function () { return 1 })
    .ElseIf(true)(function () { return 2 })
    .Else(function () { return 3 });

console.log(x);  // 2
```

## API
### If = condition -> expected function -> object`

- `If` is a curried function.
- returned object has methods `Else/ElseIF/Get`

```js
// every type can be returning value
console.log(If(true)(() => true).Get());  // true
console.log(If(true)(() => 'a').Get());   // a
console.log(If(true)(() => null).Get());  // null
console.log(If(true)(() => {}).Get());      // undefined
console.log(If(true)(() => [1]).Get());   // [ 1 ]
console.log(If(true)(() => ({})).Get());    // {}

// argument cannot be empty
try {If()(() => 1).Get()} catch(e) {console.log(e)}   // [Error: If connot be applied to an empty value]

// returned function apply to function only
try {If(true)(1).Get()} catch(e) {console.log(e)}   // [Error: If() con be applied to a function only]
```

### .Get = () -> value

- if you don't use `Else`, `Get` gets rerutning value.

```js
// If(true)
console.log(If(true)(() => 1).Get());   // 1

// If(false)
console.log(If(false)(() => 1).Get());  // null
```

### .Else = function -> value`

- When use `Else`, `Get` is unnecessary.

```js
// If + Else
console.log(If(false)(() => 1).Else(() => 2));  // 2
```

### .ElseIf = condition -> expected function -> object`

- If you need conditions more than once,  chain `ElseIf` and returned objects.

```js
// If + ElseIf + Get
console.log(If(false)(() => 1).ElseIf(true)(() => 2).Get());                        // 2
console.log(If(false)(() => 1).ElseIf(false)(() => 2).ElseIf(true)(() => 3).Get()); // 3

// If + ElseIf + Else
console.log(If(false)(() => 1).ElseIf(false)(() => 2).ElseIf(false)(() => 3).Else(() => 4));  // 4

// need condition
try {If(true)(() => 1).ElseIf()(() => 2).Get()} catch(e) {console.log(e)}  // [Error: ElseIf connot be applied to an empty value]
```

## about specs

- conditions matched more than once, a returning value is first matched

```js
console.log(If(true)(() => 1).ElseIf(false)(() => 2).ElseIf(false)(() => 3).Else(() => 4)); // 1
console.log(If(false)(() => 1).ElseIf(false)(() => 2).ElseIf(true)(() => 3).Get());         // 3
```

- when no match condition, returning null

```js
console.log(If(false)(() => 1).ElseIf(false)(() => 2).Get());                        // null
console.log(If(false)(() => 1).ElseIf(false)(() => 2).ElseIf(false)(() => 3).Get()); // null
```

## Author
​
**jshosomichi**

[github](https://github.com/jshosomichi)
[twitter](https://twitter.com/jshosomichi)

## License

under the MIT license.