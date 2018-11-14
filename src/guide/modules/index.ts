import * as importOrder from './import-order';
import * as multilineImports from './multiline-imports';
import * as singleExport from './single-export';
import * as useThem from './use-them';

const name = 'Modules';
const reference = 'modules';
const order: any[] = [
  useThem,
  singleExport,
  importOrder,
  multilineImports,
];

export {
  name,
  reference,
  order,
};
