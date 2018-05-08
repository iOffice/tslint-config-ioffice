import * as preferConst from './prefer-const';
import * as disallowVar from './disallow-var';

const name = 'Modules';
const reference = 'modules';
const order: any[] = [
  preferConst,
  disallowVar,
];

export {
  name,
  reference,
  order,
};
