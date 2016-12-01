import { updateReadme } from './readme';
import { testGuide, formatResults } from './test';
import { writeNewRule, writeNewRuleTests } from './util';


const tasks: any = {
  readme() {
    updateReadme();
  },

  /**
   * Runs all the tests written in the guide to make sure that all the expected errors are being
   * reported by tslint.
   */
  testGuide(topic?: string) {
    const results = testGuide(topic);
    process.stdout.write(formatResults(results));
  },

  /**
   * Creates template files in `src/rules` and `src/test/rules`.
   *
   * @param ruleName Must be in kebab-case
   */
  newRule(ruleName: string) {
    if (!ruleName) {
      console.error('ERR: provide the rule name');
      return;
    }
    writeNewRule(ruleName);
    writeNewRuleTests(ruleName);
  }
};

const task = process.argv[2];
tasks[task](...process.argv.slice(3));
