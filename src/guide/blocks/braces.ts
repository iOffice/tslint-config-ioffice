import { dedent, expecting, ISection } from '../../util';

const section: ISection = {
  name: 'Braces',
  reference: 'braces',
  rule: dedent`
    Use braces with all multi-line blocks.
    `,
  tslint: {
  },
  examples: [
    {
      code: dedent`
        // bad
        if (test)
          return false;
        
        // good
        if (test) return false;
        
        // good
        if (test) {
          return false;
        }
        `,
      errors: expecting([
        [2, 0, 'curly', 'if statements must be braced'],
      ]),
    },
    {
      code: dedent`
        // bad
        function foo() { return false; }
        
        // good
        function bar() {
          return false;
        }
      `,
      errors: expecting([
        [2, 17, 'brace-style', 'Statement inside of curly braces should be on next line.'],
        [2, 31, 'brace-style', 'Closing curly brace should be on the same line as opening curly brace or on the line after the previous block.'],
      ]),
    },
  ],
};

export {
  section,
};
