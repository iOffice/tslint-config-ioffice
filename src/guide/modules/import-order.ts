import { ISection, dedent, expecting } from '../../util';

const section: ISection = {
  name: 'Import Order',
  reference: 'import-order',
  rule: dedent`
    Import statements should be alphabetized and grouped.
    `,
  reason: dedent`
    Why? It enforces a consistent ordering.
    `,
  tslint: {
    'io-export-style': 'https://github.com/iOffice/tslint-config-ioffice/blob/master/src/rules/ioExportStyleRule.ts',
  },
  examples: [
    {
      code: dedent`
        // bad
        import { B, A } from 'xyz';

        // good
        import { A, B } from 'xyz';
        `,
      errors: expecting([
        [2, 9, 'ordered-imports', 'Named imports must be alphabetized.'],
      ]),
    },
    {
      code: dedent`
        // bad
        import { a } from './local/path';
        import { B, A, D, C } from 'xyz';
        import { b } from '../parent/directory';
        `,
      errors: expecting([
        [3, 0, 'ordered-imports', 'Import sources within a group must be alphabetized.'],
        [3, 0, 'ordered-imports', 'Import sources of different groups must be sorted by: libraries, parent directories, current directory.'],
        [3, 9, 'ordered-imports', 'Named imports must be alphabetized.'],
      ]),
    },
    {
      code: dedent`
        // good
        import { A, B, C, D } from 'xyz';

        import { b } from '../parent/directory';

        import { a } from './local/path';
        `,
      errors: expecting([]),
    },
  ],
};

export {
  section,
};
