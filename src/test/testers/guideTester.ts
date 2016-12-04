import 'ts-helpers';
import { LintFailure } from './failure';
import { Test, TestResult, LintTest, formatTestResult } from './test';

const LINT_CONFIG = require('../../../tslint-config-ioffice.json');

class TestSection {
  public topicName: string;
  public sectionName: string;
  public tests: LintTest[];

  constructor(topicName: string, sectionName: string, tests: (Test | string)[]) {
    this.topicName = topicName;
    this.sectionName = sectionName;
    this.tests = tests.map((test: Test | string, index) => {
      const codeFileName = `${topicName}_${sectionName}_${index}.ts`;
      if (typeof test === 'string') {
        return new LintTest(codeFileName, test, undefined, LINT_CONFIG, []);
      }
      const failures: LintFailure[] = (test.errors || []).map((error) => {
        return new LintFailure(
          codeFileName,
          error.ruleName,
          error.failure,
          error.startPosition,
          error.endPosition
        );
      });
      return new LintTest(codeFileName, test.code, test.output, LINT_CONFIG, failures);
    });
  }
}

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

class GuideTester extends BaseTester {
  private guideName: string;
  private topics: any[];

  constructor(guideName: string, topics: any[]) {
    super();
    this.guideName = guideName;
    this.topics = topics;
  }

  /**
   * Run the guide tests.
   *
   * @param topicOrder
   * @param topic
   */
  public runTests(topic?: string): TestResult[] {
    const [ runTopic, runGroup, runIndex ] = (topic || '').split(':');
    const results: TestResult[] = [];
    const failedTests: TestResult[] = [];
    let failedCount = 0;
    this.topics.forEach((topic, _index) => {
      if (runTopic === '' || runTopic === topic.reference) {
        this.fire('run-topic', { name: topic.reference, topic });
        topic.order.forEach((module: any) => {
          if (!runGroup || runGroup === module.section.reference) {
            const section = new TestSection(
              topic.reference,
              module.section.reference,
              module.section.examples
            )
            const sectionResults: TestResult[] = [];
            section.tests.forEach((x, index) => {
              if (!runIndex || runIndex === index.toString()) {
                sectionResults.push(x.runTest());
              }
            });
            const failed = sectionResults.filter(x => x.status === 'failed');
            failedTests.push(...failed);
            failedCount += failed.length;
            results.push(...sectionResults);
            this.fire('run-section', {
              name: section.sectionName,
              results: sectionResults,
              status: failed.length > 0 ? 'failed' : 'passed',
              failed,
            });
          }
        });
      }
    });
    this.fire('done', {
      passedCount: results.length - failedCount,
      failedCount,
      failedTests,
    });
    return results;
  }
}


export {
  GuideTester,
}
