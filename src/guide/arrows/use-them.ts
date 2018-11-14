import { dedent, expecting, ISection } from '../../util';

const section: ISection = {
  name: 'Use Them',
  reference: 'use-them',
  rule: dedent`
    When you must use function expressions (as when passing an anonymous function), use arrow
    function notation.
    `,
  reason: dedent`
    Why? It creates a version of the function that executes in the context of this, which is usually
    what you want, and is a more concise syntax.

    Why not? If you have a fairly complicated function, you might move that logic out into its own
    function declaration.
    `,
  tslint: {
    'ter-prefer-arrow-callback': 'https://github.com/buzinas/tslint-eslint-rules/blob/master/src/docs/rules/terPreferArrowCallbackRule.md',
  },
  examples: [
    {
      code: dedent`
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
        `,
      errors: expecting([
        [2, 14, 'ter-prefer-arrow-callback', 'Unexpected function expression.'],
      ]),
    },
    {
      code: dedent`
        // good
        [0, null, 1, null, 2].filter(x => x !== null);
        `,
      errors: [],
    },
  ],
};

export {
  section,
};
