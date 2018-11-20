import { ISection, dedent, expecting } from '../../util';

const section: ISection = {
  name: 'Multiline Imports',
  reference: 'multiline-imports',
  rule: dedent`
    Multiline imports should be indented just like multiline array and object literals.
    `,
  reason: dedent`
    Why? The curly braces follow the same indentation rules as every other curly brace block in the
    style guide, as do the trailing commas.
    `,
  tslint: {
  },
  examples: [
    {
      code: dedent`
        // bad
        import {longNameA, longNameB, longNameC, longNameD, longNameE} from 'path';

        // good
        import {
          longNameA,
          longNameB,
          longNameC,
          longNameD,
          longNameE,
        } from 'path';
        `,
      errors: expecting([
        [2, 7, 'object-curly-spacing', "A space is required after '{'"],
        [2, 61, 'object-curly-spacing', "A space is required before '}'"],
      ]),
    },
  ],
};

export {
  section,
};
