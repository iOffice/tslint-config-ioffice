import { ISection, dedent, error } from '../../util';

const section: ISection = {
  name: 'Leading Trailing',
  reference: 'leading-trailing',
  rule: dedent`
    Leading commas: **Nope**.
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
      errors: [
      ],
    },
  ],
};

export {
  section,
};
