import { ISection, dedent, expecting } from '../../util';

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
        
        // bad
        function foo() { return false; }
        
        // good
        function bar() {
          return false;
        }
        `,
      errors: expecting([
        // error(3, 4, 'ter-indent', 'temp'), // TODO: flag errors
      ]),
    },
  ],
};

export {
  section,
};
