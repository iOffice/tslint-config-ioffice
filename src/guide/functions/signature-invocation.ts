import { ISection, dedent, expecting } from '../../util';

const section: ISection = {
  name: 'Signature/Invocation',
  reference: 'signature-invocation',
  rule: dedent`
    Functions with multiline signatures, or invocations, should be indented just like every other
    multiline list in this guide: with each item on a line by itself, with a trailing comma on the
    last item.
    `,
  reason: dedent``,
  tslint: {
  },
  examples: [
    {
      code: dedent`
        // bad
        function foo(bar,
                     baz,
                     quux) {
          // ...
        }
        
        // good
        function foo(
          bar,
          baz,
          quux,
        ) {
          // ...
        }
        `,
      errors: expecting([
        [3, 0, 'ter-indent', 'Expected indentation of 2 spaces but found 13.'],
        [4, 0, 'ter-indent', 'Expected indentation of 2 spaces but found 13.'],
      ]),
    },
    {
      code: dedent`
        // bad
        console.log(foo,
          bar,
          baz);
        
        // good
        console.log(
          foo,
          bar,
          baz,
        );
        `,
      errors: expecting([
        // TODO: Need to use `function-paren-newline` to prevent the bad example
      ]),
    },
  ],
};

export {
  section,
};
