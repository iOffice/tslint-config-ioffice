import * as types from './types';
import * as functions from './functions';
import * as arrows from './arrows';
import * as whitespace from './whitespace';
import * as blocks from './blocks';
import * as commas from './commas';
import * as semicolons from './semicolons';
import * as modules from './modules';
import * as classes from './classes';

const topicOrder: any[] = [
  types,
  functions,
  classes,
  arrows,
  blocks,
  whitespace,
  commas,
  semicolons,
  modules,
];

export {
  topicOrder,
};
