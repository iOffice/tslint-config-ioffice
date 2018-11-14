import * as signatureInvocation from './signature-invocation';
import * as unusedParameters from './unused-parameters';

const name = 'Functions';
const reference = 'functions';
const order: any[] = [
  unusedParameters,
  signatureInvocation,
];

export {
  name,
  reference,
  order,
};
