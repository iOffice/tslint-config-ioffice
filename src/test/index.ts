import topicOrder from '../guide';
import { ISection, error } from '../util';
import * as Lint from 'tslint';
import 'colors';

interface ITestResult {
  topicName: string;
  sectionName: string;
  exampleNumber: number;
  code: string;
  errorsExpected: string[],
  errorsFound: string[],
}

function arrayDiff(source: any[], target: any[]) {
  return source.filter(item => target.indexOf(item) === -1);
}

function pad(n: number, width: number) {
  const numStr: string = n.toString();
  const padding: string = new Array(width - numStr.length + 1).join(' ');
  return numStr.length >= width ? numStr : padding + numStr;
}

function testSection(sec: ISection, topic: string): ITestResult[] {
  const testResults: ITestResult[] = [];
  const options: Lint.ILinterOptions = {
    fix: false,
    formatter: 'json',
    rulesDirectory: [],
    formattersDirectory: '',
  };
  const lintOptions = require('../../tslint-config-ioffice.json');

  sec.examples.forEach((ex, index) => {
    const linter = new Lint.Linter(options);
    linter.lint(`${sec.name}-${index+1}.ts`, ex.code, lintOptions);
    const result = linter.getResult();
    const failures = JSON.parse(result.output);
    testResults.push({
      topicName: topic,
      sectionName: sec.reference,
      exampleNumber: index + 1,
      code: ex.code,
      errorsExpected: ex.errors,
      errorsFound: failures.map((x: any) => {
        const start = x.startPosition;
        return error(start.line, start.character, x.ruleName, x.failure);
      }),
    });
  });

  return testResults;
}

function testGuide(): ITestResult[]  {
  const results: ITestResult[] = [];
  topicOrder.forEach((topic, index) => {
    topic.order.forEach((module: any) => {
      const res = testSection(module.section, topic.reference);
      results.push(...res);
    });
  });
  return results;
}


function formatResults(results: ITestResult[]): string {
  const content: string[] = [];
  const errors: string[] = [];
  let topic: string = '';
  let pass: number = 0;
  let fail: number = 0;
  results.forEach((test) => {
    if (topic !== test.topicName) {
      topic = test.topicName;
      content.push('');
      content.push(`  ${topic}`);
    }
    const expected = arrayDiff(test.errorsExpected, test.errorsFound);
    const found = arrayDiff(test.errorsFound, test.errorsExpected);
    if (expected.length === 0 && found.length === 0) {
      pass += 1;
      content.push(`    ${'✓'.green} ${test.sectionName} - ${test.exampleNumber}`);
    } else {
      fail += 1;
      content.push(`    ${'✗'.red} ${test.sectionName} - ${test.exampleNumber}`);
      if (expected.length) {

      }
      const codeLines = test.code.split('\n');
      const total = codeLines.length.toString().length;
      const codeStr = codeLines.map((x, i) => `    ${pad(i, total).blue}| ${x}`).join('\n');
      const expectedStr = expected.length ? `${'Expected'.red}:\n      ${expected.join('\n      ').blue}` : '';
      const foundStr = found.length ? `${'Found'.red}:\n      ${found.join('\n      ').yellow}` : '';
      errors.push(...[
        `  * ${topic}: ${test.sectionName} - ${test.exampleNumber}`.red,
        codeStr,
        `    ${expectedStr}`,
        `    ${foundStr}`,
        '',
      ]);
    }
  });
  content.push('');
  content.push(`  ${pass} passing`.green);
  content.push(`  ${fail} failing`.red);
  content.push('')
  content.push(...errors);
  return content.join('\n');
}

export {
  ITestResult,
  testGuide,
  formatResults,
};
