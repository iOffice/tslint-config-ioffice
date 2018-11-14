import { dedent, expecting, ISection } from '../../util';

const section: ISection = {
  name: 'Disallow Var',
  reference: 'disallow-var',
  rule: dedent`
     If you must reassign references, use \`let\` instead of \`var\`/
    `,
  reason: dedent`
    Why? \`let\` is block-scoped rather than function-scoped like \`var\`.
    `,
  tslint: {
  },
  examples: [
    {
      code: dedent`
        // bad
        var count = 1;
        if (true) {
          count += 1;
        }

        // good, use the let.
        let count = 1;
        if (true) {
          count += 1;
        }
        `,
      errors: expecting([
        [2, 0, 'no-var-keyword', `Forbidden 'var' keyword, use 'let' or 'const' instead`],
      ]),
    },
  ],
};

export {
  section,
};
