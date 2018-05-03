import { ISection, dedent, expecting } from '../../util';

const section: ISection = {
  name: 'Primitives',
  reference: 'primitives',
  rule: dedent`
    When you access a primitive type you work directly on its value.
    
    - \`number\`
    - \`string\`
    - \`boolean\`
    - \`null\`
    - \`undefined\`
    
    These types can be inferred by the typescript compiler and should not explicitly typed.
    `,
  reason: dedent`
    Why? Explicit types where they can be easily inferred by the compiler make code more verbose.
    `,
  tslint: {
    'no-inferrable-types': 'https://palantir.github.io/tslint/rules/no-inferrable-types/',
  },
  examples: [
    {
      code: dedent`
        const foo = 1;
        let bar = foo;
        
        bar = 9;
        
        console.log(foo, bar);  // => 1, 9
        `,
      errors: expecting([
      ]),
    },
    {
      code: dedent`
        // bad
        const foo: number = 1;
        
        // good
        let bar: number = foo;
        
        bar = 9;
        
        console.log(foo, bar);  // => 1, 9
        `,
      errors: expecting([
        [2, 11, 'no-inferrable-types', 'Type number trivially inferred from a number literal, remove type annotation'],
      ]),
    },
  ],
};

export {
  section,
};
