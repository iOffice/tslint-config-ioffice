import { TestResult, formatTestResult } from './Test';

class BaseTester {
  protected events: { [ key: string ]: Function } = {
    'run-topic': ({ name }: any) => {
      process.stdout.write(`\n  ${name}\n`)
    },
    'run-section': ({ name, status, failed }: any) => {
      const buffer = [];
      if (status === 'passed') {
        buffer.push(`    ${'✓'.green} ${name}\n`);
      } else {
        buffer.push(`    ${'✗'.red} ${name}: `);
        buffer.push(`${failed.length} failed`.red)
        buffer.push('\n');
      }
      process.stdout.write(buffer.join(''));
    },
    'done': ({ passedCount, failedCount, failedTests }: any) => {
      const buffer = [
        '',
        `  ${passedCount} passing`.green,
        `  ${failedCount} failing`.red,
        ''
      ];
      failedTests.forEach((test: TestResult) => {
        buffer.push(formatTestResult(test));
      });
      process.stdout.write(buffer.join('\n'));
    },
  };

  on(type: string, fn: Function): this {
    this.events[type] = fn
    return this;
  }

  fire(type: string, data?: any): this {
    this.events[type].call(this, data);
    return this;
  }
}

export {
  BaseTester,
}
