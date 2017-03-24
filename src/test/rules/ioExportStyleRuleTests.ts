import { RuleTester, Failure, Position } from '../testers';

const ruleTester = new RuleTester('io-export-style');

function expecting(errors: [number, number, boolean][]): Failure[] {
  return errors.map((err) => {
    const val = err[2] ? 'Expected' : 'Unexpected';
    const message = `${val} block statement surrounding arrow body.`;
    return {
      ruleName: ruleTester.ruleName,
      failure: message,
      startPosition: new Position(err[0], err[1]),
      endPosition: new Position()
    };
  });
}

ruleTester.addSection('group-name', [
  {
    code: 'var foo = () => 0;',
    output: 'var foo = () => {return 0};',
    options: ['always'],
    errors: expecting([
      [0, 16, true]
    ])
  },
]);

export {
  RuleTester,
  ruleTester,
}