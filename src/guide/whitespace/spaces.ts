import { ISection, dedent, expecting } from '../../util';

const section: ISection = {
  name: 'Spaces',
  reference: 'spaces',
  rule: dedent`
    Use soft tabs set to 2 spaces.
    `,
  tslint: {
    'ter-indent': 'https://github.com/buzinas/tslint-eslint-rules/blob/master/src/docs/rules/terIndentRule.md',
  },
  examples: [
    {
      code: dedent`
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
        `,
      errors: expecting([
        [3, 0, 'ter-indent', 'Expected indentation of 2 spaces but found 4.'],
        [8, 0, 'ter-indent', 'Expected indentation of 2 spaces but found 1.'],
      ]),
    },
  ],
};

export {
  section,
};
