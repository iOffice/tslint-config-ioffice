import { BaseTester } from './BaseTester';
import { SectionTests } from './SectionTests';
import { TestResult } from './Test';
import { ISection } from '../../util';

// Combining the configurations in order to test the whole guide
const IOFFICE_CONFIG = require('../../../tslint-config-ioffice.json');
const PROJECT_CONFIG = require('../../../tslint.json');
const LINT_CONFIG = Object.assign({}, PROJECT_CONFIG);
Object.assign(LINT_CONFIG['rules'], IOFFICE_CONFIG['rules']);

class GuideTester extends BaseTester {
  public guideName: string;
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
          const moduleSec: ISection = module.section;
          if (!runGroup || runGroup === moduleSec.reference) {
            const section = new SectionTests(
              topic.reference,
              moduleSec.reference,
              moduleSec.examples,
              LINT_CONFIG,
            );
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
};
