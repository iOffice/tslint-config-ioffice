import { ISection, dedent, expecting } from '../../util';

const section: ISection = {
  name: 'Leading Commas',
  reference: 'leading-commas',
  rule: dedent`
    **Nope**.
    `,
  tslint: {
  },
  examples: [
    {
      code: dedent`
        // bad
        const story = [
          once
          , upon
          , aTime
        ];
        
        // good
        const story = [
          once,
          upon,
          aTime,
        ];
        
        // bad
        const hero = {
          firstName: 'Ada'
          , lastName: 'Lovelace'
          , birthYear: 1815
          , superPower: 'computers'
        };
        
        // good
        const hero = {
          firstName: 'Ada',
          lastName: 'Lovelace',
          birthYear: 1815,
          superPower: 'computers',
        };
        `,
      errors: expecting([
        [5, 9, 'trailing-comma', 'Missing trailing comma'],
        [20, 27, 'trailing-comma', 'Missing trailing comma'],
      ]),
    },
  ],
};

export {
  section,
};
