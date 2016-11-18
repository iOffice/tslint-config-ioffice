import { ISection, dedent, error } from '../../util';

const section: ISection = {
  name: 'Spaces',
  reference: 'spaces',
  rule: dedent`
    Use soft tabs set to 2 spaces.
    `,
  tslint: [
    '[ter-indent](https://github.com/buzinas/tslint-eslint-rules/blob/master/src/docs/rules/terIndentRule.md)',
  ],
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
      errors: [
        error(3, 4, 'ter-indent', 'temp'),
        error(8, 1, 'ter-indent', 'temp'),
      ],
    },
  ],
};

export {
  section,
};
