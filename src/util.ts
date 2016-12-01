import * as Lint from 'tslint';
import * as path from 'path';
import * as fs from 'fs';

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

function toCamelCase(str: string) {
  const words = str.split('-').map((word) => word.charAt(0).toUpperCase() + word.slice(1));
  words[0] = words[0].toLowerCase();
  return words.join('');
}

function writeNewRule(ruleKebabName: string): void {
  const ruleCamelName = toCamelCase(ruleKebabName);
  const ruleTemplate = `/**
 * Copyright 2016 iOffice, Inc.
 */
import * as ts from 'typescript';
import * as Lint from 'tslint';

const RULE_NAME = '${ruleKebabName}';

export class Rule extends Lint.Rules.AbstractRule {
  public static metadata: Lint.IRuleMetadata = {
    ruleName: RULE_NAME,
    description: '',
    rationale: Lint.Utils.dedent\`
      \`,
    optionsDescription: Lint.Utils.dedent\`
      \`,
    options: {
      type: 'array',
      items: [{
        type: 'object',
        properties: {
        },
        additionalProperties: false
      }],
      maxLength: 1
    },
    optionExamples: [
      Lint.Utils.dedent\`
        "\${RULE_NAME}": [true]
        \`,
      Lint.Utils.dedent\`
        "\${RULE_NAME}": [true, {
        }]
        \`
    ],
    typescriptOnly: false,
    type: ''  // one of "functionality" | "maintainability" | "style" | "typescript"
  };

  public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
    const walker = new RuleWalker(sourceFile, this.getOptions());
    return this.applyWithWalker(walker);
  }
}

class RuleWalker extends Lint.RuleWalker {
  // ** RULE IMPLEMENTATION HERE **
}
`;
  const projectDir = path.dirname(__dirname);
  const rulePath = path.join(projectDir, `src/rules/${ruleCamelName}Rule.ts`);
  console.log('Writing: ', rulePath);
  fs.writeFileSync(rulePath, ruleTemplate, { flag: 'wx' });
}

function writeNewRuleTests(ruleKebabName: string): void {
  const ruleCamelName = toCamelCase(ruleKebabName);
  const testTemplate = `import { RuleTester, Failure, Position, dedent } from './ruleTester';

const ruleTester = new RuleTester('${ruleKebabName}');

function expecting(errors: string[]]): Failure[] {
  return errors.map((err) => {
    let message = '';
    return {
      failure: message,
      startPosition: new Position(err[0]),
      endPosition: new Position()
    };
  });
}

ruleTester.addTestGroup('group-name', 'should ...', [
  {
    code: dedent\`
     // code goes here
     \`,
    options: [],
    errors: expecting([
    ])
  }
]);

ruleTester.runTests();
`;
  const projectDir = path.dirname(__dirname);
  const testPath = path.join(projectDir, `src/test/rules/${ruleCamelName}RuleTests.ts`);
  console.log('Writing: ', testPath);
  fs.writeFileSync(testPath, testTemplate, { flag: 'wx' });
}

export {
  IExample,
  ISection,
  dedent,
  error,
  writeNewRule,
  writeNewRuleTests,
};
