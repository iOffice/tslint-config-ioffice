<!-- THIS IS AN AUTO-GENERATED FILE - DO NOT MODIFY MANUALLY -->
# iOffice TypeScript Style Guide

## Table of Contents

  1. [Functions](#functions)
      1. [Unused Parameters](#functions--unused-parameters)
  2. [Arrow Functions](#arrows)
      1. [Use Them](#arrows--use-them)
  3. [Blocks](#blocks)
      1. [Braces](#blocks--braces)
      2. [Cuddled Elses](#blocks--cuddled-elses)
  4. [Whitespace](#whitespace)
      1. [Spaces](#whitespace--spaces)
      2. [In Braces](#whitespace--in-braces)
  5. [Commas](#commas)
      1. [Leading Trailing](#commas--leading-trailing)
  6. [Modules](#modules)
      1. [Use Them](#modules--use-them)
      2. [Single Export](#modules--single-export)

## Functions

  <a name="functions--unused-parameters"></a><a name="1.1"></a>
  - [1.1](#functions--unused-parameters) **Unused Parameters**: Remove them. To prevent them make sure to use `noUnusedParameters` in your
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

## Arrow Functions

  <a name="arrows--use-them"></a><a name="2.1"></a>
  - [2.1](#arrows--use-them) **Use Them**: When you must use function expressions (as when passing an anonymous function), use arrow
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

  <a name="blocks--braces"></a><a name="3.1"></a>
  - [3.1](#blocks--braces) **Braces**: Use braces with all multi-line blocks.

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

  <a name="blocks--cuddled-elses"></a><a name="3.2"></a>
  - [3.2](#blocks--cuddled-elses) **Cuddled Elses**: If you're using multi-line blocks with `if` and `else`, put `else` on the same line as
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

  <a name="whitespace--spaces"></a><a name="4.1"></a>
  - [4.1](#whitespace--spaces) **Spaces**: Use soft tabs set to 2 spaces.

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

  <a name="whitespace--in-braces"></a><a name="4.2"></a>
  - [4.2](#whitespace--in-braces) **In Braces**: Add spaces inside curly braces.

    ```ts
    // bad
    const foo = {clark: 'kent'};
    
    // good
    const foo = { clark: 'kent' };
    ```

**[⬆ back to top](#table-of-contents)**

## Commas

  <a name="commas--leading-trailing"></a><a name="5.1"></a>
  - [5.1](#commas--leading-trailing) **Leading Trailing**: Leading commas: **Nope**.

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

## Modules

  <a name="modules--use-them"></a><a name="6.1"></a>
  - [6.1](#modules--use-them) **Use Them**: Always use modules (`import`/`export`) over a non-standard module system. You can always
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

  <a name="modules--single-export"></a><a name="6.2"></a>
  - [6.2](#modules--single-export) **Single Export**: Do not use default exports. Use a single named `export` which  declares all the classes, 
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
