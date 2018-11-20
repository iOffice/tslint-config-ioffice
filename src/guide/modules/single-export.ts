import { ISection, dedent, expecting } from '../../util';

const section: ISection = {
  name: 'Single Export',
  reference: 'single-export',
  rule: dedent`
    Do not use default exports. Use a single named \`export\` which  declares all the classes, 
    functions, objects and interfaces that the module is exporting.
    `,
  reason: dedent`
    Why? Named \`imports\`/\`exports\` promote clarity. In addition, current tooling differs on the
    correct way to handle default \`imports\`/\`exports\`. Avoiding them all together can help
    avoid tooling bugs and conflicts.
    
    Using a single named \`export\` allows us to see in one place all the objects that we are
    exporting.
    `,
  tslint: {
    'io-export-style': 'https://github.com/iOffice/tslint-config-ioffice/blob/master/src/rules/ioExportStyleRule.ts',
  },
  examples: [
    {
      code: dedent`
        // bad
        export class A {}
        export class B {}
        export default A;

        // good
        class C {}
        class D {}
        export {
          C,
          D,
        };
        `,
      errors: expecting([
        [2, 0, 'io-export-style', 'Only one export per file is allowed.'],
        [3, 0, 'io-export-style', 'Only one export per file is allowed.'],
        [4, 7, 'io-export-style', 'Use of default exports is forbidden.'],
        [9, 0, 'io-export-style', 'All exports should be declared in the last export declaration.'],
      ]),
    },
    {
      code: dedent`
        // bad
        export default function() {
        }

        // good
        function A() {
        }
        export { A };
        `,
      errors: expecting([
        [2, 7, 'io-export-style', 'Use of default exports is forbidden.'],
      ]),
    },
    {
      code: dedent`
        // good
        function A() {
        }
        export { A };
        `,
      errors: expecting([
      ]),
    },
  ],
};

export {
  section,
};
