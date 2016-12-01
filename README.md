<!-- THIS IS AN AUTO-GENERATED FILE - DO NOT MODIFY MANUALLY -->
# iOffice TypeScript Style Guide

## Table of Contents

  1. [Arrow Functions](#arrows)
      1. [Use Them](#arrows--use-them)
  2. [Blocks](#blocks)
      1. [Braces](#blocks--braces)
      2. [Cuddled Elses](#blocks--cuddled-elses)
  3. [Whitespace](#whitespace)
      1. [Spaces](#whitespace--spaces)
      2. [In Braces](#whitespace--in-braces)
  4. [Commas](#commas)
      1. [Leading Trailing](#commas--leading-trailing)

## Arrow Functions

  <a name="#arrows--use-them"></a><a name="1.1"></a>
  - [1.1](#arrows--use-them) When you must use function expressions (as when passing an anonymous function), use arrow
    function notation.

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

  <a name="#blocks--braces"></a><a name="2.1"></a>
  - [2.1](#blocks--braces) Use braces with all multi-line blocks.

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

  <a name="#blocks--cuddled-elses"></a><a name="2.2"></a>
  - [2.2](#blocks--cuddled-elses) If you're using multi-line blocks with `if` and `else`, put `else` on the same line as
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

  <a name="#whitespace--spaces"></a><a name="3.1"></a>
  - [3.1](#whitespace--spaces) Use soft tabs set to 2 spaces.

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

  <a name="#whitespace--in-braces"></a><a name="3.2"></a>
  - [3.2](#whitespace--in-braces) Add spaces inside curly braces.

    ```ts
    // bad
    const foo = {clark: 'kent'};
    
    // good
    const foo = { clark: 'kent' };
    ```

**[⬆ back to top](#table-of-contents)**

## Commas

  <a name="#commas--leading-trailing"></a><a name="4.1"></a>
  - [4.1](#commas--leading-trailing) Leading commas: **Nope**.

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
