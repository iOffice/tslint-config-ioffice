import { dedent, expecting, ISection } from '../../util';

// TODO: Need to add https://eslint.org/docs/rules/no-else-return (not ready for typescript)
const section: ISection = {
  name: 'No Else Return',
  reference: 'no-else-return',
  rule: dedent`
    If an \`if\` block always executes a \`return\` statement, the subsequent \`else\` block is 
    unnecessary. A \`return\` in an \`else if\` block following an \`if\` block that contains a 
    \`return\` can be separated into multiple if blocks.
    `,
  tslint: {
  },
  examples: [
    {
      code: dedent`
        // bad
        function foo() {
          if (x) {
            return x;
          } else {
            return y;
          }
        }

        // good
        function foo() {
          if (x) {
            return x;
          }
        
          return y;
        }
        `,
      errors: expecting([
      ]),
    },
    {
      code: dedent`
        // bad
        function cats() {
          if (x) {
            return x;
          } else if (y) {
            return y;
          }
        }

        // good
        function cats() {
          if (x) {
            return x;
          }
        
          if (y) {
            return y;
          }
        }
        `,
      errors: expecting([
      ]),
    },
    {
      code: dedent`
        // bad
        function dogs() {
          if (x) {
            return x;
          } else {
            if (y) {
              return y;
            }
          }
        }
        
        // good
        function dogs() {
          if (x) {
            if (z) {
              return y;
            }
          } else {
            return z;
          }
        }
        `,
      errors: expecting([
      ]),
    },
  ],
};

export {
  section,
};
