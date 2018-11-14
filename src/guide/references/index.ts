import * as disallowVar from './disallow-var';
import * as preferConst from './prefer-const';

const name = 'References';
const reference = 'references';
const order: any[] = [
  preferConst,
  disallowVar,
];

export {
  name,
  reference,
  order,
};
