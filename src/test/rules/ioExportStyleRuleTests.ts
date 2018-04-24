import { RuleTester, Failure, Position, dedent } from '../testers';

const ruleTester = new RuleTester('io-export-style');

const MSG = {
  noDefault: 'Use of default exports is forbidden.',
  single: 'Only one export per file is allowed.',
  multi: 'Use an export next to each object being exported.',
  missing: 'Missing named exports declaration.',
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

ruleTester.addSection('single-allow-default', [
  {
    code: dedent`
      class A {}
      class B {}

      export { A, B };
      export default A;
      `,
    options: { single: true, allowDefault: true },
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
        B
      };
      `,
    options: { single: true, allowDefault: true },
    errors: expecting([
      [1, 0, 'single'],
      [2, 0, 'single'],
      [5, 0, 'missing'],
    ])
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
        b
      };
      `,
    options: { single: true, allowDefault: true },
    errors: expecting([
      [1, 0, 'single'],
      [2, 0, 'single'],
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
        A
      };
      `,
    options: { single: true, allowDefault: true },
    errors: expecting([
      [1, 0, 'single'],
      [3, 0, 'missing'],
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
        a
      };
      `,
    options: { single: true, allowDefault: true },
    errors: expecting([
      [1, 0, 'single'],
      [2, 0, 'single'],
      [5, 0, 'missing'],
    ])
  },
]);

ruleTester.addSection('no-default', [
  // {
  //   code: dedent`
  //     const a = 5;
  //     export default a;
  //     `,
  //   errors: expecting([
  //     [2, 7, 'noDefault'],
  //   ])
  // },
  // {
  //   code: dedent`
  //     export default class A {}
  //     export class B {}
  //     `,
  //   errors: expecting([
  //     [1, 7, 'noDefault'],
  //   ])
  // },
  // {
  //   code: dedent`
  //     export default function a() {}
  //     export function b() {}
  //     `,
  //   errors: expecting([
  //     [1, 7, 'noDefault'],
  //   ])
  // },
  // {
  //   code: dedent`
  //     export default 3.14;
  //     `,
  //   errors: expecting([
  //     [1, 7, 'noDefault'],
  //   ])
  // }
]);

// ruleTester.addSection('single', [
//   {
//     code: dedent`
//       const a = 5;
//       export { a };
//       `,
//     errors: expecting([
//     ])
//   },
// ])

export {
  RuleTester,
  ruleTester,
}
