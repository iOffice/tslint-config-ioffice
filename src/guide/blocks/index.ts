import * as braces from './braces';
import * as cuddledElses from './cuddled-elses';
import * as noElseReturn from './no-else-return';

const name = 'Blocks';
const reference = 'blocks';
const order: any[] = [
  braces,
  cuddledElses,
  noElseReturn,
];

export {
  name,
  reference,
  order,
};
