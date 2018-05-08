import { ISection, dedent, expecting } from '../../util';

const section: ISection = {
  name: 'Prefer Const',
  reference: 'prefer-const',
  rule: dedent`
    Use \`const\` for all of your references; avoid using \`var\`.
    `,
  reason: dedent`
    Why? This ensures that you can’t reassign your references, which can lead to bugs and difficult
    to comprehend code.
    `,
  tslint: {
    'prefer-const': 'https://palantir.github.io/tslint/rules/prefer-const/',
  },
  examples: [
    {
      code: dedent`
        // bad
        var a = 1;
        var b = 2;

        // good
        const a = 1;
        const b = 2;
        `,
      errors: expecting([
        [2, 0, 'no-var-keyword', `Forbidden 'var' keyword, use 'let' or 'const' instead`],
        [3, 0, 'no-var-keyword', `Forbidden 'var' keyword, use 'let' or 'const' instead`],
      ]),
    },
    {
      code: dedent`
        // bad
        function printPI() {
          let pi = 3.14;
          console.log(pi);
        }
        
        // good
        function printPI() {
          const pi = 3.14;
          console.log(pi);
        }
        `,
      errors: expecting([
        [3, 6, 'prefer-const', `Identifier 'pi' is never reassigned; use 'const' instead of 'let'.`],
      ]),
    },
  ],
};

export {
  section,
};
