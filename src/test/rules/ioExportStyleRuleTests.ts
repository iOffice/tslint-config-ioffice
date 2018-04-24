import { RuleTester, Failure, Position, dedent } from '../testers';

const ruleTester = new RuleTester('io-export-style');

const MSG = {
  noDefault: 'Use of default exports is forbidden.',
  single: 'Only one export per file is allowed.',
  missing: 'Missing named exports declaration.',
  all: 'All exports should be declared in the last export declaration.',
};
function expecting(errors: [number, number, string][]): Failure[] {
  return errors.map((err) => {
    return {
      ruleName: ruleTester.ruleName,
      failure: MSG[err[2]],
      startPosition: new Position(err[0], err[1]),
      endPosition: new Position()
    };
  });
}

ruleTester.addSection('no-default-1', [
  {
    code: dedent`
      class A {}
      class B {}

      export { A, B };
      export default A;
      `,
    errors: expecting([
      [5, 7, 'noDefault'],
    ]),
  },
  {
    code: dedent`
      export class A {}
      export class B {}

      export default A;
      `,
    output: dedent`
      class A {}
      class B {}

      export default A;
      export {
        A,
        B,
      };
      `,
    errors: expecting([
      [1, 0, 'single'],
      [2, 0, 'single'],
      [4, 7, 'noDefault'],
      [5, 0, 'missing'],
    ]),
  },
  {
    code: dedent`
      export class A {}
      export function b() {}

      export default A;
      `,
    output: dedent`
      class A {}
      function b() {}

      export default A;
      export {
        A,
        b,
      };
      `,
    errors: expecting([
      [1, 0, 'single'],
      [2, 0, 'single'],
      [4, 7, 'noDefault'],
      [5, 0, 'missing'],
    ])
  },
  {
    code: dedent`
      export class A {}
      export default function b() {}
      `,
    output: dedent`
      class A {}
      export default function b() {}
      export {
        A,
      };
      `,
    errors: expecting([
      [1, 0, 'single'],
      [3, 0, 'missing'],
      [2, 7, 'noDefault'],
    ])
  },
  {
    code: dedent`
      export class A {}
      export class B {}

      export default A;
      const pi = 3.14;
      export { pi };
      const a = 5;
      export { a };
      `,
    output: dedent`
      class A {}
      class B {}

      export default A;
      const pi = 3.14;
      const a = 5;
      export {
        A,
        B,
        pi,
        a,
      };
      `,
    errors: expecting([
      [1, 0, 'single'],
      [2, 0, 'single'],
      [4, 7, 'noDefault'],
      [6, 0, 'single'],
      [8, 0, 'all'],
    ])
  },
]);

ruleTester.addSection('no-default-2', [
  {
    code: dedent`
      const a = 5;
      export default a;
      `,
    errors: expecting([
      [2, 7, 'noDefault'],
    ])
  },
  {
    code: dedent`
      export default class A {}
      export class B {}
      `,
    output: dedent`
      export default class A {}
      class B {}
      export {
        B,
      };
      `,
    errors: expecting([
      [1, 7, 'noDefault'],
      [2, 0, 'single'],
      [3, 0, 'missing'],
    ]),
  },
  {
    code: dedent`
      export default function a() {}
      export function b() {}
      `,
    output: dedent`
      export default function a() {}
      function b() {}
      export {
        b,
      };
      `,
    errors: expecting([
      [1, 7, 'noDefault'],
      [2, 0, 'single'],
      [3, 0, 'missing'],
    ])
  },
  {
    code: dedent`
      export default 3.14;
      `,
    errors: expecting([
      [1, 7, 'noDefault'],
    ])
  }
]);

ruleTester.addSection('single', [
  {
    code: dedent`
      const a = 5;
      export { a };
      `,
    errors: expecting([
    ])
  },
  {
    code: dedent`
      const a = 5;
      export const b = 5;
      export { a };
      `,
    errors: expecting([
      [2, 0, 'single'],
    ])
  },
])

export {
  RuleTester,
  ruleTester,
}
