import * as Lint from 'tslint/lib/lint';

interface IExample {
  code: string;
  errors: string[];
}

interface ISection {
  name: string;
  reference: string;
  rule: string;
  reason?: string;
  tslint: { [ruleName: string]: string };
  examples: IExample[];
}

const dedent = Lint.Utils.dedent;

function error(line: number, character: number, ruleName: string, message: string): string {
  return `[${line}:${character}] ${ruleName}: ${message}`;
}

export {
  IExample,
  ISection,
  dedent,
  error,
};
