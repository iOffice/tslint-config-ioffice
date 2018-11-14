import { dedent, expecting, ISection } from '../../util';

const section: ISection = {
  name: 'In Braces',
  reference: 'in-braces',
  rule: dedent`
    Add spaces inside curly braces.
    `,
  tslint: {
    'object-curly-spacing': 'https://github.com/buzinas/tslint-eslint-rules/blob/master/src/docs/rules/objectCurlySpacingRule.md',
  },
  examples: [
    {
      code: dedent`
        // bad
        const foo = {clark: 'kent'};
        
        // good
        const foo = { clark: 'kent' };
        `,
      errors: expecting([
        [2, 12, 'object-curly-spacing', 'A space is required after \'{\''],
        [2, 26, 'object-curly-spacing', 'A space is required before \'}\''],
      ]),
    },
  ],
};

export {
  section,
};
