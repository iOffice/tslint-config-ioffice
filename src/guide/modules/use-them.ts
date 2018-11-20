import { ISection, dedent, expecting } from '../../util';

const section: ISection = {
  name: 'Use Them',
  reference: 'use-them',
  rule: dedent`
    Always use modules (\`import\`/\`export\`) over a non-standard module system. You can always
    transpile to your preferred module system.
    `,
  reason: dedent`
    Why? Modules are the future
    `,
  tslint: {
  },
  examples: [
    {
      code: dedent`
        // bad
        const iOfficeStyleGuide = require('./iOfficeStyleGuide');
        module.exports = iOfficeStyleGuide.ts;

        // ok
        import * as iOfficeStyleGuide from './iOfficeStyleGuide';
        const ts = iOfficeStyleGuide.ts;
        export {
          ts,
        };

        // best
        import { ts } from './iOfficeStyleGuide';
        export {
          ts,
        };
        `,
      errors: expecting([
      ]),
    },
  ],
};

export {
  section,
};
