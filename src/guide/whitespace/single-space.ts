import { dedent, expecting, ISection } from '../../util';

const section: ISection = {
  name: 'Single Space',
  reference: 'single-space',
  rule: dedent`
    Use no more than a single space. Multiple spaces in a row that are not used for indentation are
    typically mistakes. No other rule should allow multiple spaces.
    `,
  reason: dedent`
    Adding unnecessary spaces for the sake of aligning code typically leads to chaotic git
    differences.
    `,
  tslint: {
  },
  examples: [
    {
      code: dedent`
        // bad
        import { mod          } from 'mod';
        import { someOtherMod } from 'some-other-mod';
        
        // good
        import { mod } from 'mod';
        import { someOtherMod } from 'some-other-mod';
        `,
      errors: expecting([
        [2, 22, 'no-multi-spaces', `Multiple spaces found before '}'.`],
      ]),
    },
    {
      code: dedent`
        // bad
        const someVar      = 'foo';
        const someOtherVar = 'barBaz';
        
        // good
        const someVar = 'foo';
        const someOtherVar = 'barBaz';
        `,
      errors: expecting([
        [2, 19, 'no-multi-spaces', `Multiple spaces found before '='.`],
      ]),
    },
    {
      code: dedent`
        // bad
        const obj = {
          first:      'first',
          secondLine: 'second',
        };
        
        // good
        const obj = {
          first: 'first',
          secondLine: 'second',
        };
        `,
      errors: expecting([
        [3, 14, 'no-multi-spaces', `Multiple spaces found before ''first''.`],
      ]),
    },
  ],
};

export {
  section,
};
