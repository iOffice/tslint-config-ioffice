<!-- THIS IS AN AUTO-GENERATED FILE - DO NOT MODIFY MANUALLY -->
# iOffice TypeScript Style Guide

Disclaimer: This guide is inspired by the [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript).
Most sections we see here will be taken straight from their guide and slowly adapted to the typescript language.
## Table of Contents

  1. [Types](#types)
      1. [Primitives](#types--primitives)
      2. [Complex](#types--complex)
  2. [Functions](#functions)
      1. [Unused Parameters](#functions--unused-parameters)
  3. [Classes](#classes)
  4. [Arrow Functions](#arrows)
      1. [Use Them](#arrows--use-them)
  5. [Blocks](#blocks)
      1. [Braces](#blocks--braces)
      2. [Cuddled Elses](#blocks--cuddled-elses)
  6. [Whitespace](#whitespace)
      1. [Spaces](#whitespace--spaces)
      2. [In Braces](#whitespace--in-braces)
  7. [Commas](#commas)
      1. [Leading Trailing](#commas--leading-trailing)
  8. [Semicolons](#semicolons)
      1. [Required](#semicolons--required)
  9. [Modules](#modules)
      1. [Use Them](#modules--use-them)
      2. [Single Export](#modules--single-export)

## Types

  <a name="types--primitives"></a><a name="1.1"></a>
  - [1.1](#types--primitives) **Primitives**: When you access a primitive type you work directly on its value.
    
    - `number`
    - `string`
    - `boolean`
    - `null`
    - `undefined`
    
    These types can be inferred by the typescript compiler and should not explicitly typed.


    > Why? Explicit types where they can be easily inferred by the compiler make code more verbose.
    > 

    ```ts
    const foo = 1;
    let bar = foo;
    
    bar = 9;
    
    console.log(foo, bar);  // => 1, 9
    ```

    ```ts
    // bad
    const foo: number = 1;
    
    // good
    let bar: number = foo;
    
    bar = 9;
    
    console.log(foo, bar);  // => 1, 9
    ```

  <a name="types--complex"></a><a name="1.2"></a>
  - [1.2](#types--complex) **Complex**: When you access a complex type you work on a reference to its value.
    
    - `object`
    - `array`
    - `function`

    ```ts
    const foo: number[] = [1, 2];
    const bar: number[] = foo;
    
    bar[0] = 9;
    
    console.log(foo[0], bar[0]); // => 9, 9
    ```

**[⬆ back to top](#table-of-contents)**

## Functions

  <a name="functions--unused-parameters"></a><a name="2.1"></a>
  - [2.1](#functions--unused-parameters) **Unused Parameters**: Remove them. To prevent them make sure to use `noUnusedParameters` in your
    `tsconfig.json` file.


    > We may end up with parameters that are not used when we refactor. If we keep them we risk
    > having incorrect documentation and all sort of confusions.
    > 
    > In some cases, when creating listeners a function may require a certain signature which will
    > undoubtedly bring us unused parameters. When this is the case simply name the placeholder
    > variables with a leading underscore.
    > 

    ```ts
    // bad
    function foo(a, b, c) {
      return a + b;
    }
    
    // good
    function foo(a, b) {
      return a + b;
    }
    ```

**[⬆ back to top](#table-of-contents)**

## Classes

**[⬆ back to top](#table-of-contents)**

## Arrow Functions

  <a name="arrows--use-them"></a><a name="4.1"></a>
  - [4.1](#arrows--use-them) **Use Them**: When you must use function expressions (as when passing an anonymous function), use arrow
    function notation.


    > Why? It creates a version of the function that executes in the context of this, which is usually
    > what you want, and is a more concise syntax.
    > 
    > Why not? If you have a fairly complicated function, you might move that logic out into its own
    > function declaration.
    > 

    ```ts
    // bad
    [1, 2, 3].map(function (x) {
      const y = x + 1;
      return x * y;
    });
    
    // good
    [1, 2, 3].map((x) => {
      const y = x + 1;
      return x * y;
    });
    ```

    ```ts
    // good
    [0, null, 1, null, 2].filter(x => x !== null);
    ```

**[⬆ back to top](#table-of-contents)**

## Blocks

  <a name="blocks--braces"></a><a name="5.1"></a>
  - [5.1](#blocks--braces) **Braces**: Use braces with all multi-line blocks.

    ```ts
    // bad
    if (test)
      return false;
    
    // good
    if (test) return false;
    
    // good
    if (test) {
      return false;
    }
    
    // bad
    function foo() { return false; }
    
    // good
    function bar() {
      return false;
    }
    ```

  <a name="blocks--cuddled-elses"></a><a name="5.2"></a>
  - [5.2](#blocks--cuddled-elses) **Cuddled Elses**: If you're using multi-line blocks with `if` and `else`, put `else` on the same line as
    your `if` block's closing brace.

    ```ts
    // bad
    if (test) {
      thing1();
      thing2();
    }
    else {
      thing3();
    }
    
    // good
    if (test) {
      thing1();
      thing2();
    } else {
      thing3();
    }
    ```

**[⬆ back to top](#table-of-contents)**

## Whitespace

  <a name="whitespace--spaces"></a><a name="6.1"></a>
  - [6.1](#whitespace--spaces) **Spaces**: Use soft tabs set to 2 spaces.

    ```ts
    // bad
    function foo() {
        const name;
    }
    
    // bad
    function bar() {
     const name;
    }
    
    // good
    function baz() {
      const name;
    }
    ```

  <a name="whitespace--in-braces"></a><a name="6.2"></a>
  - [6.2](#whitespace--in-braces) **In Braces**: Add spaces inside curly braces.

    ```ts
    // bad
    const foo = {clark: 'kent'};
    
    // good
    const foo = { clark: 'kent' };
    ```

**[⬆ back to top](#table-of-contents)**

## Commas

  <a name="commas--leading-trailing"></a><a name="7.1"></a>
  - [7.1](#commas--leading-trailing) **Leading Trailing**: Leading commas: **Nope**.

    ```ts
    // bad
    const story = [
      once
      , upon
      , aTime
    ];
    
    // good
    const story = [
      once,
      upon,
      aTime,
    ];
    
    // bad
    const hero = {
      firstName: 'Ada'
      , lastName: 'Lovelace'
      , birthYear: 1815
      , superPower: 'computers'
    };
    
    // good
    const hero = {
      firstName: 'Ada',
      lastName: 'Lovelace',
      birthYear: 1815,
      superPower: 'computers',
    };
    ```

**[⬆ back to top](#table-of-contents)**

## Semicolons

  <a name="semicolons--required"></a><a name="8.1"></a>
  - [8.1](#semicolons--required) **Required**: **Yup**.


    > Why? When JavaScript encounters a line break without a semicolon, it uses a set of rules
    > called [Automatic Semicolon Insertion](https://tc39.github.io/ecma262/#sec-automatic-semicolon-insertion)
    > to determine whether or not it should regard that line break as the end of a statement, and 
    > (as the name implies) place a semicolon into your code before the line break if it thinks so.
    > ASI contains a few eccentric behaviors, though, and your code will break if JavaScript
    > misinterprets your line break. These rules will become more complicated as new features become 
    > a part of JavaScript. Explicitly terminating your statements and configuring your linter to 
    > catch missing semicolons will help prevent you from encountering issues.
    > 

    ```ts
    // bad - raises exception
    const luke = {}
    const leia = {}
    [luke, leia].forEach(jedi => jedi.father = 'vader')
    
    // bad - raises exception
    const reaction = "No! That's impossible!"
    (async function meanwhileOnTheFalcon() {
      // handle `leia`, `lando`, `chewie`, `r2`, `c3p0`
      // ...
    }())
    
    // bad - returns `undefined` instead of the value on the next line - always happens when `return` is on a line by itself because of ASI!
    function foo() {
      return
        'search your feelings, you know it to be foo'
    }
    
    // good
    const luke = {};
    const leia = {};
    [luke, leia].forEach((jedi) => {
      jedi.father = 'vader';
    });
    
    // good
    const reaction = "No! That's impossible!";
    (async function meanwhileOnTheFalcon() {
      // handle `leia`, `lando`, `chewie`, `r2`, `c3p0`
      // ...
    }());
    
    // good
    function foo() {
      return 'search your feelings, you know it to be foo';
    }
    ```

**[⬆ back to top](#table-of-contents)**

## Modules

  <a name="modules--use-them"></a><a name="9.1"></a>
  - [9.1](#modules--use-them) **Use Them**: Always use modules (`import`/`export`) over a non-standard module system. You can always
    transpile to your preferred module system.


    > Why? Modules are the future
    > 

    ```ts
    // bad
    const iOfficeStyleGuide = require('./iOfficeStyleGuide');
    module.exports = iOfficeStyleGuide.ts;
    
    // ok
    import * as iOfficeStyleGuide from './iOfficeStyleGuide';
    const ts = iOfficeStyleGuide.ts;
    export {
      ts,
    };
    
    // best
    import { ts } from './iOfficeStyleGuide';
    export {
      ts,
    };
    ```

  <a name="modules--single-export"></a><a name="9.2"></a>
  - [9.2](#modules--single-export) **Single Export**: Do not use default exports. Use a single named `export` which  declares all the classes, 
    functions, objects and interfaces that the module is exporting.


    > Why? Named `imports`/`exports` promote clarity. In addition, current tooling differs on the
    > correct way to handle default `imports`/`exports`. Avoiding them all together can help
    > avoid tooling bugs and conflicts.
    > 
    > Using a single named `export` allows us to see in one place all the objects that we are
    > exporting.
    > 

    ```ts
    // bad
    export class A {}
    export class B {}
    export default A;
    
    // good
    class C {}
    class D {}
    export {
      C,
      D,
    };
    ```

    ```ts
    // bad
    export default function() {
    }
    
    // good
    function A() {
    }
    export { A };
    ```

    ```ts
    // good
    function A() {
    }
    export { A };
    ```

**[⬆ back to top](#table-of-contents)**

## License

(The MIT License)

Copyright (c) 2018 iOFFICE

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and
associated documentation files (the 'Software'), to deal in the Software without restriction, 
including without limitation the rights to use, copy, modify, merge, publish, distribute, 
sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is 
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial
portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT 
NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND 
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, 
DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

## Amendments

Following [Airbnb](https://github.com/airbnb/javascript#amendments)'s advice, we also encourage
you to fork this guide and change the rules to fit your team's style guide.

The code provided should make it easy to make adjustments to the examples since
they are linted with the tslint configuration. If you do not agree with part of the configuration
simply change it, test the guide and make the appropiate changes to it.
