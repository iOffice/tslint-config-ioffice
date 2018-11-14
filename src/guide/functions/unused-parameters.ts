import { dedent, expecting, ISection } from '../../util';

const section: ISection = {
  name: 'Unused Parameters',
  reference: 'unused-parameters',
  rule: dedent`
    Remove them. To prevent them make sure to use \`noUnusedParameters\` in your
    \`tsconfig.json\` file. 
    `,
  reason: dedent`
    We may end up with parameters that are not used when we refactor. If we keep them we risk
    having incorrect documentation and all sort of confusions.
    
    In some cases, when creating listeners a function may require a certain signature which will
    undoubtedly bring us unused parameters. When this is the case simply name the placeholder
    variables with a leading underscore.
    `,
  tslint: {
    'ter-prefer-arrow-callback': 'https://github.com/buzinas/tslint-eslint-rules/blob/master/src/docs/rules/terPreferArrowCallbackRule.md',
  },
  examples: [
    {
      code: dedent`
        // bad
        function foo(a, b, c) {
          return a + b;
        }
        
        // good
        function foo(a, b) {
          return a + b;
        }
        `,
      errors: expecting([]),
    },
  ],
};

export {
  section,
};
