import * as Lint from 'tslint';
import * as path from 'path';

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

export function writeNewRule(ruleKebabName: string): void {
  const ruleCamelName = toCamelCase(ruleKebabName);
  const ruleTemplate = `/**
 * @license
 * Copyright 2016 Palantir Technologies, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import * as ts from 'typescript';
import * as Lint from 'tslint';

export class Rule extends Lint.Rules.AbstractRule {
    public static FAILURE_STRING = "** ERROR MESSAGE HERE **";

    public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
        const walker = new (sourceFile, this.getOptions());
        return this.applyWithWalker(walker);
    }
}

class RuleWalker extends Lint.RuleWalker {
    // ** RULE IMPLEMENTATION HERE **
}
`;
  console.log('temp:', ruleTemplate);
  const projectDir = path.dirname(__dirname);
  const rulePath = path.join(projectDir, `./src/rules/${ruleCamelName}Rule.ts`);
  console.log('rulePath:', rulePath);
//  fs.writeFileSync(rulePath, ruleTemplate, {flag: 'wx'});
}

export {
  IExample,
  ISection,
  dedent,
  error,
};
