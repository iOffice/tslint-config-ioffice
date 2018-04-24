import * as Lint from 'tslint';
import * as jsdiff from 'diff';
import { Position } from './Position';
import { Failure, LintFailure } from './Failure';

interface Test {
  code: string;
  output?: string;
  options?: any;
  errors?: Failure[];
}

interface TestResult {
  fileName: string;
  status: 'passed' | 'failed';
  code: string;
  outputExpected: string,
  outputFound: string,
  errorsExpected: LintFailure[],
  errorsFound: LintFailure[],
}

class LintTest implements Test {
  fileName: string;
  code: string;
  output: string;
  options: Lint.Configuration.IConfigurationFile;
  errors: LintFailure[];

  constructor(
    fName: string,
    code: string,
    output: string,
    options: Lint.Configuration.IConfigurationFile,
    errors: LintFailure[]
  ) {
    this.fileName = fName;
    this.code = code;
    this.output = output;
    this.options = options;
    this.errors = errors;
  }

  public runTest(): TestResult {
    const options: Lint.ILinterOptions = {
      fix: false,
      formatter: 'json',
      formattersDirectory: 'dist/formatters/',
      rulesDirectory: 'build/rules/',
    };

    const linter = new Lint.Linter(options);
    linter.lint(this.fileName, this.code, this.options);
    const failures = JSON.parse(linter.getResult().output);

    const expectedErrors = this.errors || [];
    const foundErrors = failures.map((error: any) => {
      const start = error.startPosition;
      const end = error.endPosition;
      return new LintFailure(
        error.name,
        error.ruleName,
        error.failure,
        new Position(start.line, start.character, start.position),
        new Position(end.line, end.character, end.position)
      );
    });

    return this.getTestResults(expectedErrors, foundErrors, linter);
  }

  private getTestResults(
    expectedErrors: LintFailure[],
    foundErrors: LintFailure[],
    linter: Lint.Linter
  ): TestResult {
    const errorsExpected = this.arrayDiff(expectedErrors, foundErrors);
    const errorsFound = this.arrayDiff(foundErrors, expectedErrors, false);

    let fixedCode = '';
    if (this.output) {
      const fixes = linter.getResult().failures.filter(f => f.hasFix()).map(f => f.getFix());
      fixedCode = Lint.Replacement.applyAll(this.code, fixes as any);
    }

    const testPassed = (
      errorsExpected.length === 0 &&
      errorsFound.length === 0 &&
      fixedCode === this.output
    );
    return {
      fileName: this.fileName,
      status: testPassed ? 'passed' : 'failed',
      code: this.code,
      outputExpected: this.output,
      outputFound: fixedCode || this.output,
      errorsExpected,
      errorsFound,
    };
  }

  private arrayDiff(
    source: LintFailure[],
    target: LintFailure[],
    compareToTarget: boolean = true
  ): LintFailure[] {
    return source.filter(item => {
      return this.findIndex(target, item, compareToTarget) === -1;
    }).map((x) => {
      if (compareToTarget) {
        return x;
      } else {
        return target.length ? target[0].getComparableFailure(x) : x;
      }
    });
  }

  private findIndex(source: LintFailure[], error: LintFailure, compareToError: boolean = true) {
    const len = source.length;
    let k = 0;
    while (k < len) {
      if (compareToError && `${error}` === `${error.getComparableFailure(source[k])}`) {
        return k;
      } else if (`${source[k]}` === `${source[k].getComparableFailure(error)}`) {
        return k;
      }
      k++;
    }
    return -1;
  }
}

function pad(n: number, width: number) {
  const numStr: string = n.toString();
  const padding: string = new Array(width - numStr.length + 1).join(' ');
  return numStr.length >= width ? numStr : padding + numStr;
}

function formatTestResult(test: TestResult): string {

  const content = ['', `  => ${test.fileName}`.red, ''];

  const codeLines = test.code.split('\n');
  const total = codeLines.length.toString().length;
  const codeStr = codeLines.map((x, i) => `    ${pad(i, total).blue}| ${x}`).join('\n');
  content.push(codeStr);
  content.push('');

  if (test.errorsExpected.length) {
    const expected = test.errorsExpected.map(x => x.str());
    content.push(`    ${'Expected'.red}:`);
    content.push(`      ${expected.join('\n      ')}`);
    content.push('');
  }

  if (test.errorsFound.length) {
    const found = test.errorsFound.map(x => x.str());
    content.push(`    ${'Found'.red}:`);
    content.push(`      ${found.join('\n      ')}`);
    content.push('');
  }

  if (test.outputExpected !== test.outputFound) {
    content.push(`    ${'Fixer output mismatch'.red}:`);
    const diff = jsdiff.diffLines(test.outputExpected, test.outputFound);
    diff.forEach(function(part){
      // green for additions, red for deletion, grey for common parts
      const color = part.added ? 'green' : part.removed ? 'red' : 'grey';
      const newParts = part.value[color].split('\n');
      content.push(`${'     |'[color]}${newParts.join('\n     |')}`);
    });
    content.push('');
  }

  return content.join('\n');
}


export {
  Test,
  TestResult,
  LintTest,
  formatTestResult,
  Position,
}
