import { dedent, Failure, Position, RuleTester } from '../testers';

const ruleTester = new RuleTester('io-import-style');

const MSG = {
  namedImports: 'Named imports must be alphabetized.',
  importSources: 'Import sources within a group must be alphabetized.',
  groups: 'Import sources of different groups must be sorted by: 3rd-party-libraries, ioffice-libraries, project-modules .',
};
function expecting(errors: [number, number, string][]): Failure[] {
  return errors.map((err) => {
    return {
      ruleName: ruleTester.ruleName,
      failure: MSG[err[2]],
      startPosition: new Position(err[0], err[1]),
      endPosition: new Position(),
    };
  });
}

ruleTester.addSection('default', [
  {
    code: dedent`
      import { B, b, A, a } from 'mod';
      `,
    output: dedent`
      import { A, B, a, b } from 'mod';
      `,
    errors: expecting([
      [1, 12, 'namedImports'],
    ]),
    options: {
      'grouped-imports': true,
      'named-imports-order': "lowercase-last",
      groups: [
        { name: 'ioffice-libraries', "match": "^@ioffice", "order": 20 },
        { name: "project-modules", "match": "^[.\\^]", "order": 40 },
        { name: "3rd-party-libraries", match: ".*", order: 1 },
      ],
    },
  },
  {
    code: dedent`
      import { a } from 'mod';
      import { a } from '@ioffice';
      import { a } from '@angular';
      import { a } from './path';
      import { a } from '../parent';
      import { a } from '../parent/a';
      import { a } from '^/root';
      import { a } from '^/fromTop';
      `,
    output: dedent`
      import { a } from '@angular';
      import { a } from 'mod';

      import { a } from '@ioffice';

      import { a } from '^/fromTop';
      import { a } from '^/root';
      import { a } from '../parent';
      import { a } from '../parent/a';
      import { a } from './path';
      `,
    options: {
      'grouped-imports': true,
      'named-imports-order': "lowercase-last",
      groups: [
        { name: 'ioffice-libraries', "match": "^@ioffice", "order": 20 },
        { name: "project-modules", "match": "^[.\\^]", "order": 40 },
        { name: "3rd-party-libraries", match: ".*", order: 1 },
      ],
    },
    errors: expecting([
      [2, 0, 'importSources'],
      [3, 0, 'importSources'],
      [5, 0, 'importSources'],
      [7, 0, 'importSources'],
      [8, 0, 'importSources'],
      [2, 0, 'groups'],
    ]),
  },
]);

export {
  RuleTester,
  ruleTester,
};
