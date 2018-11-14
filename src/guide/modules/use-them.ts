import { dedent, expecting, ISection } from '../../util';

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
    'ter-prefer-arrow-callback': 'https://github.com/buzinas/tslint-eslint-rules/blob/master/src/docs/rules/terPreferArrowCallbackRule.md',
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
