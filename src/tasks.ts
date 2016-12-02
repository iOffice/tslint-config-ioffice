import { updateReadme } from './readme';
import { testGuide, formatResults } from './test';
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
   */
  static testGuide(topic?: string) {
    const results = testGuide(topic);
    process.stdout.write(formatResults(results));
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
