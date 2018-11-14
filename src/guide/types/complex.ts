import { dedent, expecting, ISection } from '../../util';

const section: ISection = {
  name: 'Complex',
  reference: 'complex',
  rule: dedent`
    When you access a complex type you work on a reference to its value.
    
    - \`object\`
    - \`array\`
    - \`function\`
    `,
  tslint: {
  },
  examples: [
    {
      code: dedent`
        const foo: number[] = [1, 2];
        const bar: number[] = foo;
        
        bar[0] = 9;
        
        console.log(foo[0], bar[0]); // => 9, 9
        `,
      errors: expecting([
      ]),
    },
  ],
};

export {
  section,
};
