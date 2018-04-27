import { BaseTester } from './BaseTester';
import { TestResult } from './Test';
import { SectionTests } from './SectionTests';

class RulesTester extends BaseTester {
  private ruleTesters: any[];

  constructor(ruleTesters: any[]) {
    super();
    this.ruleTesters = ruleTesters;
  }

  /**
   * Run the rule tests.
   *
   * @param topic
   */
  public runTests(topic?: string): TestResult[] {
    const [ runTopic, runGroup, runIndex ] = (topic || '').split(':');
    const results: TestResult[] = [];
    const failedTests: TestResult[] = [];
    let failedCount = 0;
    this.ruleTesters.forEach((topic, _index) => {
      if (runTopic === '' || runTopic === topic.ruleName) {
        this.fire('run-topic', { name: topic.ruleName, topic });
        topic.sections.forEach((section: SectionTests) => {
          if (!runGroup || runGroup === section.sectionName) {
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
  RulesTester,
};
