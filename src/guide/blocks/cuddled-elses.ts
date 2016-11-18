import { ISection, dedent, error } from '../../util';

const section: ISection = {
  name: 'Cuddled Elses',
  reference: 'cuddled-elses',
  rule: dedent`
    If you're using multi-line blocks with \`if\` and \`else\`, put \`else\` on the same line as
    your \`if\` block's closing brace.
    `,
  tslint: [
  ],
  examples: [
    {
      code: dedent`
        // bad
        if (test) {
          thing1();
          thing2();
        }
        else {
          thing3();
        }
        
        // good
        if (test) {
          thing1();
          thing2();
        } else {
          thing3();
        }
        `,
      errors: [
        error(3, 4, 'ter-indent', 'temp'),  // TODO: flag errors
      ],
    },
  ],
};

export {
  section,
};
