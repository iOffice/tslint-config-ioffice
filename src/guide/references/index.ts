import * as preferConst from './prefer-const';
import * as disallowVar from './disallow-var';

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
