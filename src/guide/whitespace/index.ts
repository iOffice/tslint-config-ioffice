import * as cconsecutiveBlankLines from './consecutive-blank-lines';
import * as inBraces from './in-braces';
import * as singleSpace from './single-space';
import * as spaces from './spaces';

const name = 'Whitespace';
const reference = 'whitespace';
const order: any[] = [
  spaces,
  singleSpace,
  inBraces,
  cconsecutiveBlankLines,
];

export {
  name,
  reference,
  order,
};
