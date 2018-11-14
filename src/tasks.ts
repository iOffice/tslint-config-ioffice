import { topicOrder } from './guide';
import { updateReadme } from './readme';
import { GuideTester, RulesTester } from './test';
import { rulesTestOrder } from './test/rules';
import { writeNewRule, writeNewRuleTests } from './util';

class Task {
  /**
   * Generate the readme file from the information in `src/guide`.
   */
  static readme() {
    updateReadme();
  }

  /**
   * Runs all the tests written in the guide to make sure that all the expected errors are being
   * reported by tslint.
   *
   * @param [topic] String in the one of the following forms:
   *            ['topic', 'topic:section', 'topic:section:index']
   *        This will run only the selected tests.
   */
  static testGuide(topic?: string) {
    const tester = new GuideTester('iOffice TypeScript Style Guide', topicOrder);
    tester.runTests(topic);
  }

  /**
   * Runs all the rule tests.
   *
   * @param [ruleName] String in the one of the following forms:
   *            ['ruleName', 'ruleName:group', 'ruleName:group:index']
   *       This will run only the selected tests
   */
  static testRules(ruleName?: string) {
    const tester = new RulesTester(rulesTestOrder);
    tester.runTests(ruleName);
  }

  /**
   * Creates template files in `src/rules` and `src/test/rules`.
   *
   * @param ruleName Must be in kebab-case
   */
  static newRule(ruleName: string) {
    if (!ruleName) {
      console.error('ERR: provide the rule name');
      return;
    }
    writeNewRule(ruleName);
    writeNewRuleTests(ruleName);
  }

}

const taskName: string = process.argv[2];
Task[taskName](...process.argv.slice(3));
