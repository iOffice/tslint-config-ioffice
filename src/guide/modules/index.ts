import * as singleExport from './single-export';
import * as useThem from './use-them';

const name = 'Modules';
const reference = 'modules';
const order: any[] = [
  useThem,
  singleExport,
];

export {
  name,
  reference,
  order,
};
