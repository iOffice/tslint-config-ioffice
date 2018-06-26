import * as spaces from './spaces';
import * as inBraces from './in-braces';
import * as singleSpace from './single-space';

const name = 'Whitespace';
const reference = 'whitespace';
const order: any[] = [
  spaces,
  singleSpace,
  inBraces,
];

export {
  name,
  reference,
  order,
};
