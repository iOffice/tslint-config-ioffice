import * as leadingTrailing from './leading';
import * as dangling from './trailing';

const name = 'Commas';
const reference = 'commas';
const order: any[] = [
  leadingTrailing,
  dangling,
];

export {
  name,
  reference,
  order,
};
