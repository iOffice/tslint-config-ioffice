import { updateReadme } from './readme';
import { testGuide, formatResults } from './test';
import { writeNewRule } from './util';


const tasks: any = {
  readme() {
    updateReadme();
  },

  test() {
    const results = testGuide();
    process.stdout.write(formatResults(results));
  },

  newRule(ruleName: string) {
    writeNewRule(ruleName);
  }
};

const task = process.argv[2];
tasks[task](...process.argv.slice(3));
