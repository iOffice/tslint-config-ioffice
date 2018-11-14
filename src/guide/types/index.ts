import * as complex from './complex';
import * as primitives from './primitives';
import * as typeAssertion from './type-assertion';

const name = 'Types';
const reference = 'types';
const order: any[] = [
  primitives,
  complex,
  typeAssertion,
];

export {
  name,
  reference,
  order,
};
