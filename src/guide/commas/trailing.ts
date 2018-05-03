import { ISection, dedent, expecting } from '../../util';

const section: ISection = {
  name: 'Trailing Commas',
  reference: 'trailing',
  rule: dedent`
    Additional trailing comma: **Yup**.
    `,
  reason: dedent`
    Why? This leads to cleaner git diffs. Also, the Typescript transpiler will remove the additional
    trailing comma in the transpiled code which means you don’t have to worry about the trailing
    comma problem in legacy browsers.
  `,
  tslint: {
    'trailing-comma': 'https://palantir.github.io/tslint/rules/trailing-comma/',
  },
  examples: [
    {
      code: dedent`
        // bad
        const hero = {
          firstName: 'Dana',
          lastName: 'Scully'
        };
        
        const heroes = [
          'Batman',
          'Superman'
        ];
        
        // good
        const hero = {
          firstName: 'Dana',
          lastName: 'Scully',
        };
        
        const heroes = [
          'Batman',
          'Superman',
        ];
        
        // bad
        function createHero(
          firstName,
          lastName,
          inventorOf
        ) {
          // does nothing
        }
        
        // good
        function createHero(
          firstName,
          lastName,
          inventorOf,
        ) {
          // does nothing
        }
        
        // good (note that a comma must not appear after a "rest" element)
        function createHero(
          firstName,
          lastName,
          inventorOf,
          ...heroArgs
        ) {
          // does nothing
        }
        
        // bad
        createHero(
          firstName,
          lastName,
          inventorOf
        );
        
        // good
        createHero(
          firstName,
          lastName,
          inventorOf,
        );
        
        // good (note that a comma must not appear after a "rest" element)
        createHero(
          firstName,
          lastName,
          inventorOf,
          ...heroArgs
        );
        `,
      errors: expecting([
      ]),
    },
  ],
};

export {
  section,
};
