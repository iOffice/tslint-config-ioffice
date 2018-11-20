import { ISection, dedent, expecting } from '../../util';

const section: ISection = {
  name: 'Required',
  reference: 'required',
  rule: dedent`
    **Yup**.
    `,
  reason: dedent`
    Why? When JavaScript encounters a line break without a semicolon, it uses a set of rules
    called [Automatic Semicolon Insertion](https://tc39.github.io/ecma262/#sec-automatic-semicolon-insertion)
    to determine whether or not it should regard that line break as the end of a statement, and 
    (as the name implies) place a semicolon into your code before the line break if it thinks so.
    ASI contains a few eccentric behaviors, though, and your code will break if JavaScript
    misinterprets your line break. These rules will become more complicated as new features become 
    a part of JavaScript. Explicitly terminating your statements and configuring your linter to 
    catch missing semicolons will help prevent you from encountering issues.
    `,
  tslint: {
    semicolon: 'https://palantir.github.io/tslint/rules/semicolon/',
  },
  examples: [
    {
      code: dedent`
        // bad - raises exception
        const luke = {}
        const leia = {}
        [luke, leia].forEach(jedi => jedi.father = 'vader')
        
        // bad - raises exception
        const reaction = "No! That's impossible!"
        (async function meanwhileOnTheFalcon() {
          // handle \`leia\`, \`lando\`, \`chewie\`, \`r2\`, \`c3p0\`
          // ...
        }())
        
        // bad - returns \`undefined\` instead of the value on the next line - always happens when \`return\` is on a line by itself because of ASI!
        function foo() {
          return
            'search your feelings, you know it to be foo'
        }
        
        // good
        const luke = {};
        const leia = {};
        [luke, leia].forEach((jedi) => {
          jedi.father = 'vader';
        });
        
        // good
        const reaction = "No! That's impossible!";
        (async function meanwhileOnTheFalcon() {
          // handle \`leia\`, \`lando\`, \`chewie\`, \`r2\`, \`c3p0\`
          // ...
        }());
        
        // good
        function foo() {
          return 'search your feelings, you know it to be foo';
        }
        `,
      errors: expecting([
        [2, 15, 'semicolon', 'Missing semicolon'],
        [4, 51, 'semicolon', 'Missing semicolon'],
        [11, 4, 'semicolon', 'Missing semicolon'],
        [15, 8, 'semicolon', 'Missing semicolon'],
        [16, 49, 'semicolon', 'Missing semicolon'],
        [16, 0, 'ter-indent', 'Expected indentation of 2 spaces but found 4.'],
      ]),
    },
  ],
};

export {
  section,
};
