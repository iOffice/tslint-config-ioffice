import { dedent, expecting, ISection } from '../../util';

const section: ISection = {
  name: 'Consecutive Blank Lines',
  reference: 'consecutive-blank-lines',
  rule: dedent`
    Avoid multiple empty lines and only allow one line at the end of the file.
    `,
  tslint: {
    'no-consecutive-blank-lines': 'https://palantir.github.io/tslint/rules/no-consecutive-blank-lines/',
  },
  examples: [
    {
      code: dedent`
        // bad
        const x = 1;
        
        
        
        const y = 2;
        
        // good
        const x = 1;
        
        const y = 2;
        `,
      errors: expecting([
        [4, 0, 'no-consecutive-blank-lines', 'Consecutive blank lines are forbidden'],
      ]),
    },
  ],
};

export {
  section,
};
