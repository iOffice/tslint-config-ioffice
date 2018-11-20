import { ISection, dedent, expecting } from '../../util';

const section: ISection = {
  name: 'Type Assertion',
  reference: 'type-assertion',
  rule: dedent`
    Avoid using the angle bracket type assertion.
    `,
  reason: dedent`
    Although both formats have the same effect our goal is to have a consistent type
    assertion style across our codebase. Using the \`as Type\` syntax can also avoid confusion
    with generic methods and classes that use angle brackets.
    `,
  tslint: {
    'no-angle-bracket-type-assertion': 'https://palantir.github.io/tslint/rules/no-angle-bracket-type-assertion/',
  },
  examples: [
    {
      code: dedent`
        // bad
        processProperty(<Person>user.property);
        
        // good
        processProperty((user as Person).property);
        `,
      errors: expecting([
        [2, 16, 'no-angle-bracket-type-assertion', "Type assertion using the '<>' syntax is forbidden. Use the 'as' syntax instead."],
      ]),
    },
    {
      code: dedent`
        // bad
        someGenericMethod<Person>(<Person>user);
        
        // good
        someGenericMethod<Person>(user as Person);
        `,
      errors: expecting([
        [2, 26, 'no-angle-bracket-type-assertion', "Type assertion using the '<>' syntax is forbidden. Use the 'as' syntax instead."],
      ]),
    },
  ],
};

export {
  section,
};
