import 'ts-helpers';
import { BaseTester } from './BaseTester';
import { SectionTests } from './SectionTests';
import { TestResult } from './Test';

const LINT_CONFIG = require('../../../tslint-config-ioffice.json');

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
            const section = new SectionTests(
              topic.reference,
              module.section.reference,
              module.section.examples,
              LINT_CONFIG,
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
