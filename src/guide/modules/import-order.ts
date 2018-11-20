import { ISection, dedent, expecting } from '../../util';

const section: ISection = {
  name: 'Import Order',
  reference: 'import-order',
  rule: dedent`
    Import statements should be alphabetized and sorted. Sources of different groups must be
    sorted by 3rd party libraries, libraries provided by iOFFICE and finally local modules.
    
    Currently this is specified by the \`io-import-style\` since the \`ordered-imports\` rule has
    not merged the change that will allow us to create custom groups.
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
        [2, 9, 'io-import-style', 'Named imports must be alphabetized.'],
        [5, 0, 'io-import-style', 'Import sources of different groups must be sorted by: 3rd-party-libraries, ioffice-libraries, project-modules .'],
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
        [3, 0, 'io-import-style', 'Import sources within a group must be alphabetized.'],
        [3, 0, 'io-import-style', 'Import sources of different groups must be sorted by: 3rd-party-libraries, ioffice-libraries, project-modules .'],
        [3, 9, 'io-import-style', 'Named imports must be alphabetized.'],
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
